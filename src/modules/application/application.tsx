import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

import "./application.css";
import "ol/ol.css";
import { KommuneLayerCheckbox } from "../kommune/kommuneLayerCheckbox";
import { Layer } from "ol/layer";

useGeographic();

const map = new Map({
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({center: [10,59], zoom: 8}),
});

export function Application() {

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        map.setTarget(mapRef.current);
    },[]);

    return <div ref={mapRef}></div>;


}