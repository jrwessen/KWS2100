import React,  {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Layer } from "ol/layer";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Feature, Map, MapBrowserEvent, Overlay } from "ol";
import { Polygon } from "ol/geom";

const kommuneLayer = new VectorLayer({
    source: new VectorSource({
        url: "/kommuner.json",
        format: new GeoJSON(),

    }),
});
export function KommuneLayerCheckbox({
    setLayers,
}:{
    setLayers: Dispatch<SetStateAction<Layer[]>>;
}) {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if(checked){
            setLayers((old) => [... old, kommuneLayer]);
        }
        return () => {
            setLayers((old) => old.filter((l) => l !== kommuneLayer ));
        };
    }, [checked]);

    return <>
    <div>
        <label>
            <input type={"checkbox"} checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
            {checked ? "Hide ":"Show "}
            kommune
        </label>
    </div>
        </>

}
