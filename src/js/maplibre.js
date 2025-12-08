import maplibregl from "maplibre-gl";

const carte = new maplibregl.Map({
  container: "carte",
  style: "./map-style.json",
  center: [-71.2082, 46.8139],
  zoom: 2,
});