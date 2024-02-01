import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useGeographic } from "ol/proj";

import "ol/ol.css";
import "./application.css";

//Tell it to use geographic coordinate. Longitude and latitude
useGeographic();

const map = new Map({
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({
    center: [11, 59],
    zoom: 10,
  }),
});

export function MapApplication() {
  //To focus on current location
  function handleFocusUser() {}

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  //To display the map
  useEffect(() => map.setTarget(mapRef.current), []);
  return (
    <>
      <header>
        <h1>ER dette riktig kart</h1>
      </header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
      </nav>

      <div ref={mapRef}></div>
    </>
  );
}
