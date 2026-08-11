"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { VaultMarkdown } from "@/components/vault-markdown";
import { type AtlasData, type AtlasPlace, type Precision } from "@/lib/atlas-types";

const ExcavationMap = dynamic(() => import("./excavation-map"), {
  ssr: false,
  loading: () => (
    <div className="map-loading" role="status">
      <span className="loading-mark" aria-hidden="true" />
      Loading map…
    </div>
  ),
});

const precisionOrder: Precision[] = ["published", "landmark", "approx"];
const siteQueryParam = "site";
const unknownFacetValue = "Unknown" as const;

function matchesFacet(values: readonly string[], filter: string) {
  return filter === unknownFacetValue ? values.length === 0 : values.includes(filter);
}

function siteIdFromUrl(places: AtlasPlace[]) {
  const siteId = new URL(window.location.href).searchParams.get(siteQueryParam);
  return siteId && places.some((place) => place.id === siteId) ? siteId : null;
}

function updateSiteInUrl(siteId: string | null, mode: "push" | "replace" = "push") {
  const url = new URL(window.location.href);

  if (siteId) url.searchParams.set(siteQueryParam, siteId);
  else url.searchParams.delete(siteQueryParam);

  window.history[`${mode}State`](null, "", url);
}

function studyYearFor(place: AtlasPlace) {
  return place.latestStudyYear ?? place.lastFieldworkYear;
}

export function AtlasExplorer({ data }: { data: AtlasData }) {
  const digs = data.places;
  const precisionMeta = Object.fromEntries(
    precisionOrder.map((precision) => {
      const place = digs.find((candidate) => candidate.precision === precision);
      if (!place) throw new Error(`No Place defines ${precision} coordinate precision metadata`);
      return [
        precision,
        {
          label: place.precisionLabel,
          shortLabel: place.precisionShortLabel,
          description: place.precisionDescription,
        },
      ];
    }),
  ) as Record<Precision, { label: string; shortLabel: string; description: string }>;
  const periodOptions = [...data.periods.map((period) => period.name), unknownFacetValue];
  const cultureOptions = [...data.cultures.map((culture) => culture.name), unknownFacetValue];
  const periodDescriptions = Object.fromEntries(
    data.periods.map((period) => [period.name, period.description]),
  );
  const cultureDescriptions = Object.fromEntries(
    data.cultures.map((culture) => [culture.name, culture.description]),
  );
  const periodCounts = Object.fromEntries(
    periodOptions.map((period) => [
      period,
      digs.filter((dig) => matchesFacet(dig.periods, period)).length,
    ]),
  );
  const cultureCounts = Object.fromEntries(
    cultureOptions.map((culture) => [
      culture,
      digs.filter((dig) => matchesFacet(dig.cultures, culture)).length,
    ]),
  );
  const knownStudyYears = digs
    .map(studyYearFor)
    .filter((year): year is number => year !== null);
  const studyYearBounds = {
    min: Math.min(...knownStudyYears),
    max: Math.max(...knownStudyYears),
  };
  const panelRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activePrecision, setActivePrecision] = useState<Record<Precision, boolean>>({
    published: true,
    landmark: true,
    approx: true,
  });
  const [activePeriods, setActivePeriods] = useState<string[]>([]);
  const [activeCultures, setActiveCultures] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState(studyYearBounds);
  const [openFacet, setOpenFacet] = useState<"period" | "culture" | "year" | null>(null);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const isYearFiltered =
    yearRange.min !== studyYearBounds.min ||
    yearRange.max !== studyYearBounds.max;
  const visibleDigs = useMemo(
    () =>
      digs.filter((dig) => {
        const studyYear = studyYearFor(dig);
        const matchesPeriod =
          activePeriods.length === 0 ||
          activePeriods.some((period) => matchesFacet(dig.periods, period));
        const matchesCulture =
          activeCultures.length === 0 ||
          activeCultures.some((culture) => matchesFacet(dig.cultures, culture));
        const matchesYear =
          !isYearFiltered ||
          (studyYear !== null &&
            studyYear >= yearRange.min &&
            studyYear <= yearRange.max);
        const searchableText = `${dig.name} ${dig.kind} ${dig.basis} ${dig.periods.join(" ")} ${dig.cultures.join(" ")} ${dig.lastFieldworkLabel ?? ""} ${dig.body}`;

        return (
          activePrecision[dig.precision] &&
          matchesPeriod &&
          matchesCulture &&
          matchesYear &&
          (!normalizedQuery || searchableText.toLocaleLowerCase().includes(normalizedQuery))
        );
      }),
    [
      activeCultures,
      activePeriods,
      activePrecision,
      isYearFiltered,
      normalizedQuery,
      yearRange.max,
      yearRange.min,
    ],
  );

  const hasActiveFilters =
    Object.values(activePrecision).some((isActive) => !isActive) ||
    activePeriods.length > 0 ||
    activeCultures.length > 0 ||
    isYearFiltered;
  const selected = selectedId
    ? visibleDigs.find((dig) => dig.id === selectedId) ?? null
    : null;

  useEffect(() => {
    function restoreSelectionFromUrl() {
      setSelectedId(siteIdFromUrl(digs));
    }

    restoreSelectionFromUrl();
    window.addEventListener("popstate", restoreSelectionFromUrl);

    return () => window.removeEventListener("popstate", restoreSelectionFromUrl);
  }, []);

  useEffect(() => {
    if (selectedId && !selected) {
      setSelectedId(null);
      updateSiteInUrl(null, "replace");
    }
  }, [selected, selectedId]);

  function togglePrecision(precision: Precision) {
    setActivePrecision((current) => {
      const enabledCount = Object.values(current).filter(Boolean).length;
      if (current[precision] && enabledCount === 1) return current;
      return { ...current, [precision]: !current[precision] };
    });
  }

  function togglePeriod(period: string) {
    setActivePeriods((current) =>
      current.includes(period)
        ? current.filter((candidate) => candidate !== period)
        : [...current, period],
    );
  }

  function toggleCulture(culture: string) {
    setActiveCultures((current) =>
      current.includes(culture)
        ? current.filter((candidate) => candidate !== culture)
        : [...current, culture],
    );
  }

  function resetFilters() {
    setActivePrecision({ published: true, landmark: true, approx: true });
    setActivePeriods([]);
    setActiveCultures([]);
    setYearRange(studyYearBounds);
    setOpenFacet(null);
  }

  function selectDig(dig: AtlasPlace) {
    setSelectedId(dig.id);
    if (siteIdFromUrl(digs) !== dig.id) updateSiteInUrl(dig.id);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="atlas-shell">
      <header className="masthead">
        <h1>Archaeology of El Salvador</h1>
        <nav className="masthead-nav" aria-label="Primary navigation">
          <span aria-current="page">Atlas</span>
          <Link href="/sources/places">Wiki</Link>
          <Link href="/about">About</Link>
        </nav>
      </header>

      <section className="atlas-workspace" aria-label="Salvadoran archaeology atlas">
        <div className="map-column">
          <div className="map-toolbar">
            <div className="toolbar-controls">
              <div className="precision-filters" aria-label="Filter by location precision">
                {precisionOrder.map((precision) => {
                  const count = digs.filter((dig) => dig.precision === precision).length;
                  return (
                    <button
                      className={`precision-filter precision-${precision}`}
                      type="button"
                      key={precision}
                      aria-pressed={activePrecision[precision]}
                      aria-label={`${precisionMeta[precision].label}: ${count} sites`}
                      onClick={() => togglePrecision(precision)}
                      title={precisionMeta[precision].description}
                    >
                      <span className="precision-symbol" aria-hidden="true" />
                      <span>{precisionMeta[precision].shortLabel}</span>
                      <span className="filter-count">{count}</span>
                    </button>
                  );
                })}
              </div>

              <div className="facet-filters" aria-label="Filter archaeological sites">
                <details
                  className="facet-filter"
                  open={openFacet === "period"}
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenFacet("period");
                    else if (openFacet === "period") setOpenFacet(null);
                  }}
                >
                  <summary>
                    Period
                    <span>{activePeriods.length || "All"}</span>
                  </summary>
                  <div className="facet-popover">
                    <button
                      className="facet-close"
                      type="button"
                      aria-label="Close period filter"
                      onClick={() => setOpenFacet(null)}
                    >
                      ×
                    </button>
                    <p className="facet-instruction">Match any selected period</p>
                    {periodOptions.map((period) => (
                      <button
                        key={period}
                        type="button"
                        className="facet-option"
                        aria-pressed={activePeriods.includes(period)}
                        onClick={() => togglePeriod(period)}
                        title={
                          period === unknownFacetValue
                            ? "No period is responsibly supported by the cited sources."
                            : periodDescriptions[period]
                        }
                      >
                        <span className="facet-check" aria-hidden="true" />
                        <span>{period}</span>
                        <span>{periodCounts[period]}</span>
                      </button>
                    ))}
                    <p className="facet-note">
                      Unknown includes sites without a supported period.
                    </p>
                  </div>
                </details>

                <details
                  className="facet-filter"
                  open={openFacet === "culture"}
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenFacet("culture");
                    else if (openFacet === "culture") setOpenFacet(null);
                  }}
                >
                  <summary>
                    Culture
                    <span>{activeCultures.length || "All"}</span>
                  </summary>
                  <div className="facet-popover facet-popover-wide">
                    <button
                      className="facet-close"
                      type="button"
                      aria-label="Close culture filter"
                      onClick={() => setOpenFacet(null)}
                    >
                      ×
                    </button>
                    <p className="facet-instruction">Match any selected cultural affinity</p>
                    {cultureOptions.map((culture) => (
                      <button
                        key={culture}
                        type="button"
                        className="facet-option"
                        aria-pressed={activeCultures.includes(culture)}
                        onClick={() => toggleCulture(culture)}
                        title={
                          culture === unknownFacetValue
                            ? "No cultural affinity is responsibly supported by the cited sources."
                            : cultureDescriptions[culture]
                        }
                      >
                        <span className="facet-check" aria-hidden="true" />
                        <span>{culture}</span>
                        <span>{cultureCounts[culture]}</span>
                      </button>
                    ))}
                    <p className="facet-note">
                      Unknown includes sites without a supported affinity. These are
                      cautious archaeological affinities, not fixed ethnic identities.
                    </p>
                  </div>
                </details>

                <details
                  className="facet-filter"
                  open={openFacet === "year"}
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenFacet("year");
                    else if (openFacet === "year") setOpenFacet(null);
                  }}
                >
                  <summary>
                    Latest study
                    <span>{isYearFiltered ? `${yearRange.min}–${yearRange.max}` : "All"}</span>
                  </summary>
                  <div className="facet-popover year-popover">
                    <button
                      className="facet-close"
                      type="button"
                      aria-label="Close excavation-date filter"
                      onClick={() => setOpenFacet(null)}
                    >
                      ×
                    </button>
                    <div className="year-readout">
                      <span>{yearRange.min}</span>
                      <span>through</span>
                      <span>{yearRange.max}</span>
                    </div>
                    <label htmlFor="investigation-year-min">Earliest year</label>
                    <input
                      id="investigation-year-min"
                      type="range"
                      min={studyYearBounds.min}
                      max={studyYearBounds.max}
                      value={yearRange.min}
                      onChange={(event) =>
                        setYearRange((current) => ({
                          ...current,
                          min: Math.min(Number(event.target.value), current.max),
                        }))
                      }
                    />
                    <label htmlFor="investigation-year-max">Latest year</label>
                    <input
                      id="investigation-year-max"
                      type="range"
                      min={studyYearBounds.min}
                      max={studyYearBounds.max}
                      value={yearRange.max}
                      onChange={(event) =>
                        setYearRange((current) => ({
                          ...current,
                          max: Math.max(Number(event.target.value), current.min),
                        }))
                      }
                    />
                    <p className="facet-note">Unknown years are omitted when narrowed.</p>
                  </div>
                </details>

                {hasActiveFilters ? (
                  <button className="reset-filters" type="button" onClick={resetFilters}>
                    Reset
                  </button>
                ) : null}
              </div>
            </div>
            <p className="visible-count" aria-live="polite">
              {visibleDigs.length} visible
            </p>
          </div>

          <div className="map-frame">
            <ExcavationMap
              digs={visibleDigs}
              selected={selected}
              onSelect={selectDig}
            />
          </div>

        </div>

        <aside
          ref={panelRef}
          className="research-panel"
          aria-label="Selected site details"
        >
          <div className="panel-search">
            <label htmlFor="site-search">Find a site</label>
            <div className="search-field">
              <span aria-hidden="true">⌕</span>
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Site, period, or place…"
              />
            </div>
          </div>

          {selected ? (
            <article className="site-record" key={selected.id}>
              <p className="record-kind">{selected.kind}</p>
              <h2>{selected.name}</h2>
              <div className={`precision-badge precision-${selected.precision}`}>
                <span className="precision-symbol" aria-hidden="true" />
                {precisionMeta[selected.precision].label}
              </div>

              <dl className="record-classification">
                <div>
                  <dt>Period</dt>
                  <dd>
                    {selected.periods.length ? (
                      selected.periods.map((period) => (
                        <span className="classification-tag" key={period}>{period}</span>
                      ))
                    ) : (
                      <span className="classification-empty">Not securely assigned</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Culture</dt>
                  <dd>
                    {selected.cultures.length ? (
                      selected.cultures.map((culture) => (
                        <span className="classification-tag" key={culture}>{culture}</span>
                      ))
                    ) : (
                      <span className="classification-empty">Not securely assigned</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Latest study</dt>
                  <dd>
                    {selected.latestStudyLabel ? (
                      selected.latestStudyLabel
                    ) : (
                      selected.lastFieldworkLabel ??
                      "Not documented in the cited papers"
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Last field investigation</dt>
                  <dd>
                    {selected.lastFieldworkLabel ??
                      "Not documented in the cited papers"}
                  </dd>
                </div>
              </dl>

              <div className="place-document">
                <VaultMarkdown>{selected.body}</VaultMarkdown>
              </div>
              <p className="place-record-link">
                <Link href={`/sources/places/${encodeURIComponent(selected.id)}`}>Open wiki record →</Link>
              </p>
            </article>
          ) : (
            <div className="no-site-selected">
              <span aria-hidden="true">◎</span>
              <p>Select a marker or choose a site below to read its archaeological story.</p>
            </div>
          )}

          <div className="site-index">
            <div className="index-heading">
              <span>Site index</span>
              <span>{visibleDigs.length.toString().padStart(2, "0")}</span>
            </div>
            <div className="site-list">
              {visibleDigs.length ? (
                visibleDigs.map((dig) => (
                  <button
                    key={dig.id}
                    type="button"
                    className={`site-list-item ${dig.id === selected?.id ? "is-selected" : ""}`}
                    onClick={() => selectDig(dig)}
                    aria-current={dig.id === selected?.id ? "true" : undefined}
                  >
                    <span className={`list-symbol precision-${dig.precision}`} aria-hidden="true" />
                    <span>{dig.name}</span>
                    <span aria-hidden="true">→</span>
                  </button>
                ))
              ) : (
                <p className="no-results">No site matches that search.</p>
              )}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
