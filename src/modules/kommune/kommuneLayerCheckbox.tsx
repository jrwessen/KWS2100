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
export function KommuneLayerCheckbox() {

    const [checked, setChecked] = useState(false);

    return <>
    <div>
        <label>
            <input type={"checkbox"} checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
            {checked ? "Hide":"show"}
            Toggle kommune layer
        </label>
    </div>
        </>

}
