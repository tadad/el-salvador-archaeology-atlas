"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { digs, precisionMeta, type Dig, type Precision } from "@/data/digs";
import {
  cultureDescriptions,
  cultureOrder,
  investigationYearBounds,
  periodDescriptions,
  periodOrder,
  siteClassifications,
  type Culture,
  type Period,
} from "@/data/site-classifications";
import { siteStories } from "@/data/site-stories";

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

const periodCounts = Object.fromEntries(
  periodOrder.map((period) => [
    period,
    digs.filter((dig) => siteClassifications[dig.id].periods.includes(period)).length,
  ]),
) as Record<Period, number>;

const cultureCounts = Object.fromEntries(
  cultureOrder.map((culture) => [
    culture,
    digs.filter((dig) => siteClassifications[dig.id].cultures.includes(culture)).length,
  ]),
) as Record<Culture, number>;

export function AtlasExplorer() {
  const panelRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activePrecision, setActivePrecision] = useState<Record<Precision, boolean>>({
    published: true,
    landmark: true,
    approx: true,
  });
  const [activePeriods, setActivePeriods] = useState<Period[]>([]);
  const [activeCultures, setActiveCultures] = useState<Culture[]>([]);
  const [yearRange, setYearRange] = useState(investigationYearBounds);
  const [openFacet, setOpenFacet] = useState<"period" | "culture" | "year" | null>(null);

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const isYearFiltered =
    yearRange.min !== investigationYearBounds.min ||
    yearRange.max !== investigationYearBounds.max;
  const visibleDigs = useMemo(
    () =>
      digs.filter((dig) => {
        const classification = siteClassifications[dig.id];
        const matchesPeriod =
          activePeriods.length === 0 ||
          activePeriods.some((period) => classification.periods.includes(period));
        const matchesCulture =
          activeCultures.length === 0 ||
          activeCultures.some((culture) => classification.cultures.includes(culture));
        const matchesYear =
          !isYearFiltered ||
          (classification.lastInvestigatedYear !== null &&
            classification.lastInvestigatedYear >= yearRange.min &&
            classification.lastInvestigatedYear <= yearRange.max);
        const searchableText = `${dig.name} ${dig.kind} ${dig.basis} ${classification.periods.join(" ")} ${classification.cultures.join(" ")} ${classification.lastInvestigatedLabel ?? classification.lastInvestigatedYear ?? ""} ${Object.values(siteStories[dig.id] ?? {}).join(" ")}`;

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
    if (selectedId && !selected) setSelectedId(null);
  }, [selected, selectedId]);

  function togglePrecision(precision: Precision) {
    setActivePrecision((current) => {
      const enabledCount = Object.values(current).filter(Boolean).length;
      if (current[precision] && enabledCount === 1) return current;
      return { ...current, [precision]: !current[precision] };
    });
  }

  function togglePeriod(period: Period) {
    setActivePeriods((current) =>
      current.includes(period)
        ? current.filter((candidate) => candidate !== period)
        : [...current, period],
    );
  }

  function toggleCulture(culture: Culture) {
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
    setYearRange(investigationYearBounds);
    setOpenFacet(null);
  }

  function selectDig(dig: Dig) {
    setSelectedId(dig.id);
    panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="atlas-shell">
      <header className="masthead">
        <h1>Archaeology of El Salvador</h1>
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
                    {periodOrder.map((period) => (
                      <button
                        key={period}
                        type="button"
                        className="facet-option"
                        aria-pressed={activePeriods.includes(period)}
                        onClick={() => togglePeriod(period)}
                        title={periodDescriptions[period]}
                      >
                        <span className="facet-check" aria-hidden="true" />
                        <span>{period}</span>
                        <span>{periodCounts[period]}</span>
                      </button>
                    ))}
                    <p className="facet-note">Sites without a supported period are omitted when this filter is active.</p>
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
                    {cultureOrder.map((culture) => (
                      <button
                        key={culture}
                        type="button"
                        className="facet-option"
                        aria-pressed={activeCultures.includes(culture)}
                        onClick={() => toggleCulture(culture)}
                        title={cultureDescriptions[culture]}
                      >
                        <span className="facet-check" aria-hidden="true" />
                        <span>{culture}</span>
                        <span>{cultureCounts[culture]}</span>
                      </button>
                    ))}
                    <p className="facet-note">These are cautious archaeological affinities, not fixed ethnic identities.</p>
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
                    Last investigated
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
                      min={investigationYearBounds.min}
                      max={investigationYearBounds.max}
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
                      min={investigationYearBounds.min}
                      max={investigationYearBounds.max}
                      value={yearRange.max}
                      onChange={(event) =>
                        setYearRange((current) => ({
                          ...current,
                          max: Math.max(Number(event.target.value), current.min),
                        }))
                      }
                    />
                    <p className="facet-note">Excavation, survey, or formal site recording. Unknown years are omitted when narrowed.</p>
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

          <div className="map-footnote">
            <p>
              Marker positions describe archaeological locations, not guaranteed trench,
              unit, or wreck-survey coordinates. Select a site to see how it was determined.
            </p>
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
                    {siteClassifications[selected.id].periods.length ? (
                      siteClassifications[selected.id].periods.map((period) => (
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
                    {siteClassifications[selected.id].cultures.length ? (
                      siteClassifications[selected.id].cultures.map((culture) => (
                        <span className="classification-tag" key={culture}>{culture}</span>
                      ))
                    ) : (
                      <span className="classification-empty">Not securely assigned</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt>Last investigated</dt>
                  <dd>
                    {siteClassifications[selected.id].lastInvestigatedLabel ??
                      siteClassifications[selected.id].lastInvestigatedYear ??
                      "Not documented in the cited papers"}
                  </dd>
                </div>
              </dl>

              <p className="record-lede">{siteStories[selected.id].overview}</p>

              <div className="story-sections" aria-label={`${selected.name} archaeological story`}>
                <section className="story-section story-when">
                  <p className="story-label">When</p>
                  <p>{siteStories[selected.id].dates}</p>
                </section>
                <section className="story-section">
                  <p className="story-label">How it was investigated</p>
                  <p>{siteStories[selected.id].fieldwork}</p>
                </section>
                <section className="story-section story-discoveries">
                  <p className="story-label">What archaeologists found</p>
                  <p>{siteStories[selected.id].discoveries}</p>
                </section>
              </div>

              <div className="map-evidence">
                <p className="map-evidence-heading">About this marker</p>
                <p className="record-note">{selected.note}</p>

                <dl className="record-facts">
                  <div>
                    <dt>Coordinates</dt>
                    <dd>
                      {selected.lat.toFixed(4)}, {selected.lon.toFixed(4)}
                    </dd>
                  </div>
                  <div>
                    <dt>Placed from</dt>
                    <dd>{selected.basis}</dd>
                  </div>
                </dl>
              </div>

              <div className="source-section">
                <p className="source-heading">
                  Evidence &amp; exact citation{selected.sources.length > 1 ? "s" : ""}
                </p>
                {selected.sources.map((source) => (
                  <div className="source-card" key={`${source.file}-${source.pages}`}>
                    <div>
                      <span className="source-file">{source.file}</span>
                      <span className="source-pages">{source.pages}</span>
                    </div>
                    <div className="source-actions">
                      <a
                        href={source.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${source.file}, ${source.pages}`}
                      >
                        {source.format === "web" ? "Open source" : "Open cited PDF"}{" "}
                        <span aria-hidden="true">↗</span>
                      </a>
                      {source.originalUrl ? (
                        <a
                          className="publisher-link"
                          href={source.originalUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open publisher copy of ${source.file}`}
                        >
                          Publisher copy
                        </a>
                      ) : null}
                    </div>
                    {source.citationNote ? (
                      <p className="source-citation-note">{source.citationNote}</p>
                    ) : null}
                  </div>
                ))}
              </div>
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
