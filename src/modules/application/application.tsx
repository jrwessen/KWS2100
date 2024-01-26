import React, {MutableRefObject, useEffect, useRef, useState} from "react";

import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {useGeographic} from "ol/proj";
import { Layer } from "ol/layer";
import "./application.css";
import "ol/ol.css";
import {KommuneLayerCheckbox} from "../kommune/kommuneLayerCheckbox";

useGeographic();

//TO show map
const map = new Map({

    view: new View({center: [10,59], zoom: 8}),
});

export function Application() {

    function handleFocusUser(e : React.MouseEvent){
        e.preventDefault(); //For it not togenerate url
        navigator.geolocation.getCurrentPosition(position => {
            const{latitude, longitude } = position.coords;
            map.getView().animate({
                center: [longitude, latitude], zoom:10,
            });
        });
    }

    const[layers, setLayers] = useState<Layer[]>([
        new TileLayer({ source: new OSM})
    ]);
    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => map.setTarget(mapRef.current) ,[]);
    useEffect(() => map.setLayers(layers), [layers]);
    return (
        <>
        <header>
            <h1>Kommune kart</h1>
        </header>
        <nav>
            <a href={"#"} onClick={handleFocusUser}>Focus on me</a>
            <KommuneLayerCheckbox setLayers = {setLayers}/>
        </nav>
        <div ref={mapRef}></div>;
        </>);

}