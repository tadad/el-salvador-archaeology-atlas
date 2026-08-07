"use client";

import { useEffect, useMemo } from "react";
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
import { precisionMeta, type Dig, type Precision } from "@/data/digs";

type ExcavationMapProps = {
  digs: Dig[];
  selected: Dig | null;
  onSelect: (dig: Dig) => void;
};

function makeIcon(precision: Precision, selected: boolean): DivIcon {
  return divIcon({
    className: "dig-marker-wrap",
    html: `<span class="dig-marker precision-${precision}${selected ? " is-selected" : ""}"><span></span></span>`,
    iconSize: selected ? [34, 34] : [26, 26],
    iconAnchor: selected ? [17, 17] : [13, 13],
  });
}

function SelectedSiteFocus({ selected }: { selected: Dig | null }) {
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

  return (
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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
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
            title={`${dig.name} — ${precisionMeta[dig.precision].label}`}
          >
            <Tooltip
              key={isSelected ? "selected" : "hover"}
              direction="top"
              offset={[0, isSelected ? -17 : -12]}
              opacity={1}
              permanent={isSelected}
            >
              <strong>{dig.name}</strong>
              <span>{precisionMeta[dig.precision].label}</span>
            </Tooltip>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
