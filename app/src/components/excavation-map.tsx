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
import { type AtlasPlace, type Precision } from "@/lib/atlas-types";

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

function makeIcon(precision: Precision, selected: boolean): DivIcon {
  return divIcon({
    className: "dig-marker-wrap",
    html: `<span class="dig-marker precision-${precision}${selected ? " is-selected" : ""}"><span></span></span>`,
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
  const icons = useMemo(
    () => ({
      published: makeIcon("published", false),
      landmark: makeIcon("landmark", false),
      approx: makeIcon("approx", false),
      selected: {
        published: makeIcon("published", true),
        landmark: makeIcon("landmark", true),
        approx: makeIcon("approx", true),
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
        {digs.map((dig) => {
          const isSelected = selected?.id === dig.id;
          return (
            <Marker
              key={dig.id}
              position={[dig.lat, dig.lon]}
              icon={isSelected ? icons.selected[dig.precision] : icons[dig.precision]}
              zIndexOffset={isSelected ? 1000 : dig.precision === "published" ? 200 : 0}
              eventHandlers={{ click: () => onSelect(dig) }}
              title={`${dig.name} — ${dig.precisionLabel}`}
            >
              <Tooltip
                key={isSelected ? "selected" : "hover"}
                direction="top"
                offset={[0, isSelected ? -17 : -12]}
                opacity={1}
                permanent={isSelected}
              >
                <strong>{dig.name}</strong>
                <span>{dig.precisionLabel}</span>
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
