"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { divIcon, type DivIcon } from "leaflet";
import {
  MapContainer,
  Marker,
  ScaleControl,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import {
  type AtlasPlace,
  coordinateMethodMeta,
  type LocationStatus,
  locationStatusFor,
  locationStatusMeta,
} from "@/lib/atlas-types";

type ExcavationMapProps = {
  digs: AtlasPlace[];
  selected: AtlasPlace | null;
  onSelect: (dig: AtlasPlace) => void;
};

type Basemap = "lidar" | "map";
type BasemapState = Basemap | "fallback";

const lidarAttribution =
  '<a href="https://d3.snet.gob.sv/modelos_elevacion/consultar_descargar">MARN/DOA · DEM LiDAR 2014 (10 m)</a>';
const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const lidarBounds: [[number, number], [number, number]] = [
  [13.148755033, -90.140741735],
  [14.453935556, -87.673775302],
];

function makeIcon(status: LocationStatus, selected: boolean): DivIcon {
  return divIcon({
    className: "dig-marker-wrap",
    html: `<span class="dig-marker location-${status}${selected ? " is-selected" : ""}"><span></span></span>`,
    iconSize: selected ? [34, 34] : [26, 26],
    iconAnchor: selected ? [17, 17] : [13, 13],
  });
}

function SelectedSiteFocus({ selected }: { selected: AtlasPlace | null }) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;

    map.flyTo([selected.lat, selected.lon], Math.max(map.getZoom(), 12), {
      duration: 0.75,
    });
  }, [map, selected]);

  return null;
}

export default function ExcavationMap({ digs, selected, onSelect }: ExcavationMapProps) {
  const [basemap, setBasemap] = useState<BasemapState>("lidar");
  const lidarErrorCount = useRef(0);
  const markerGroups = useMemo(() => {
    const groups = new Map<string, AtlasPlace[]>();

    for (const dig of digs) {
      const key = `${dig.lat}:${dig.lon}`;
      const group = groups.get(key);

      if (group) {
        group.push(dig);
      } else {
        groups.set(key, [dig]);
      }
    }

    return [...groups.values()];
  }, [digs]);
  const icons = useMemo(
    () => ({
      located: makeIcon("located", false),
      approximate: makeIcon("approximate", false),
      selected: {
        located: makeIcon("located", true),
        approximate: makeIcon("approximate", true),
      },
    }),
    [],
  );

  function selectBasemap(nextBasemap: Basemap) {
    lidarErrorCount.current = 0;
    setBasemap(nextBasemap);
  }

  function handleLidarTileError() {
    lidarErrorCount.current += 1;

    if (lidarErrorCount.current >= 3) {
      setBasemap("fallback");
    }
  }

  return (
    <>
      <MapContainer
        className="leaflet-atlas"
        center={[13.72, -88.9]}
        zoom={8}
        minZoom={7}
        maxZoom={17}
        maxBounds={[
          [12.75, -90.55],
          [14.75, -87.25],
        ]}
        zoomControl={false}
        scrollWheelZoom
      >
        {basemap === "lidar" ? (
          <TileLayer
            key="lidar"
            url="/lidar/dem-2014-elevation-v1/{z}/{x}/{y}.png"
            bounds={lidarBounds}
            minNativeZoom={7}
            maxNativeZoom={14}
            noWrap
            attribution={lidarAttribution}
            className="basemap-lidar"
            eventHandlers={{ tileerror: handleLidarTileError }}
          />
        ) : (
          <TileLayer
            key="map"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution={osmAttribution}
            className="basemap-osm"
          />
        )}
        <ZoomControl position="bottomright" />
        <ScaleControl position="bottomleft" imperial={false} />
        <SelectedSiteFocus selected={selected} />
        {markerGroups.map((colocatedDigs) => {
          const selectedIndex = colocatedDigs.findIndex((dig) => dig.id === selected?.id);
          const isSelected = selectedIndex >= 0;
          const activeDig = isSelected ? colocatedDigs[selectedIndex] : colocatedDigs[0];
          const hasAlternates = colocatedDigs.length > 1;
          const locationStatus = locationStatusFor(activeDig.coordinateMethod);

          function selectNextDig() {
            if (!hasAlternates || selectedIndex < 0) {
              onSelect(activeDig);
              return;
            }

            onSelect(colocatedDigs[(selectedIndex + 1) % colocatedDigs.length]);
          }

          return (
            <Marker
              key={colocatedDigs.map((dig) => dig.id).join(":")}
              position={[activeDig.lat, activeDig.lon]}
              icon={isSelected ? icons.selected[locationStatus] : icons[locationStatus]}
              zIndexOffset={isSelected ? 1000 : locationStatus === "located" ? 200 : 0}
              eventHandlers={{ click: selectNextDig }}
              title={`${colocatedDigs.map((dig) => dig.name).join(", ")} — ${locationStatusMeta[locationStatus].label}`}
            >
              <Tooltip
                key={isSelected ? "selected" : "hover"}
                direction="top"
                offset={[0, isSelected ? -17 : -12]}
                opacity={1}
                permanent={isSelected}
              >
                <strong>
                  {isSelected
                    ? activeDig.name
                    : colocatedDigs.map((dig) => dig.name).join(" / ")}
                </strong>
                <span>
                  {hasAlternates
                    ? `${isSelected ? `${selectedIndex + 1} of ` : ""}${colocatedDigs.length} records at this location · Click to switch`
                    : `${locationStatusMeta[locationStatus].label} · ${coordinateMethodMeta[activeDig.coordinateMethod].label}`}
                </span>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>

      <div className="basemap-control" role="group" aria-label="Map background">
        <div className="basemap-options">
          <button
            type="button"
            aria-pressed={basemap === "lidar"}
            onClick={() => selectBasemap("lidar")}
            title="2014 LiDAR terrain (10 m LiDAR-derived DEM)"
          >
            LiDAR
          </button>
          <button
            type="button"
            aria-pressed={basemap !== "lidar"}
            onClick={() => selectBasemap("map")}
            title="OpenStreetMap streets and place labels"
          >
            Streets
          </button>
        </div>
      </div>

      {basemap === "fallback" ? (
        <div className="basemap-notice" role="status" aria-live="polite">
          <span>2014 LiDAR terrain unavailable. Showing Streets.</span>
          <button type="button" onClick={() => selectBasemap("lidar")}>
            Retry
          </button>
        </div>
      ) : null}
    </>
  );
}
