import {Map, View} from "ol";
import './App.css'
import "ol/ol.css";
import {MutableRefObject, useEffect, useMemo, useRef} from "react";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {useGeographic} from "ol/proj";
import * as React from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Stroke, Style, Text} from "ol/style";
import {FeatureLike} from "ol/Feature";

//hvilke projeksjon det har
//geografiske grader
// eslint-disable-next-line react-hooks/rules-of-hooks
useGeographic();

const defaultView = {
  center: [10.5, 60],
  zoom: 12,
}


function App() {
  const map = useMemo(() => new Map({
    //openLayers har rammeverk som legge kart oppå hverandre
    layers: [
        //om det lagres/vise kart som rektangle bilde eller som frittfrom puslespill
      new TileLayer({source: new OSM()}),
        new VectorLayer({
          source: new VectorSource({
            url: "/kommuner.json",
            format: new GeoJSON(),
          }),
          style: (feature: FeatureLike) =>
              new Style({
                stroke: new Stroke({color: "red"}),
                text: new Text({
                  text:getKommuneNavn(feature),
                })
              })
        })
    ],
    //hvor er kartet det vi ser. Jo høyere zoom det er, lengere unna blir det
    view: new View({
      center: [10.5, 59.8], zoom: 11
    })
  }), []);

  function handleZoomToUser(e: React.MouseEvent) {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords);
      const {longitude, latitude} = pos.coords;
      const center = [longitude, latitude];
      map.getView().animate({center, zoom:14});
      })
  }
  function handleZoomToNorway(e: React.MouseEvent) {
    e.preventDefault();
    map.getView().animate({
      center: [15,65], zoom: 5
    })
  }
  function getKommuneNavn(feature: FeatureLike){
    const properties = feature.getProperties() as {
      navn: {sprak: string; navn: string }[];
    };
    return properties.navn.find((n) => n.sprak === "nor")!.navn;
  }
  function handleResetView(e: React.MouseEvent){
    e.preventDefault();
    map.getView().animate(defaultView);
  }


  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    //koble openLayers sitt map til react forståelse av div-en
    map.setTarget(mapRef.current)
  }, []);

  return (
      <>
        <header> <h1> Kristiania mapping application </h1></header>
        <nav>
          <a href={"#"} onClick={handleZoomToUser}>Zoom to my location</a>
          <a href={"#"} onClick={handleZoomToNorway}>Show all of Norway</a>
          <a href={"#"} onClick={handleResetView}>Reset view</a>

        </nav>
        <div className={"map"} ref= {mapRef}></div>
      </>

  )
}

export default App
