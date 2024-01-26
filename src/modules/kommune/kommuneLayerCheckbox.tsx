import React, {
    Dispatch, MouseEvent,
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


type KommuneProperties = {
    kommunenummer: string;
    navn: {
        sprak: string;
        navn: string;
    }[];
};

type KommuneFeature = Feature<Polygon> & {
    getProperties(): KommuneProperties;
};


const kommuneSource = new VectorSource<KommuneFeature>({
    url: "/kommuner.json",
    format: new GeoJSON(),
});

const kommuneLayer = new VectorLayer({
    source: kommuneSource,
});
export function KommuneLayerCheckbox({
    map,
    setLayers,
}:{
    map: Map;
    setLayers: Dispatch<SetStateAction<Layer[]>>;
}) {
    const [checked, setChecked] = useState(false);
    const overlay = useMemo(() => new Overlay({}), []);
    const [selectedKommune, setSelectedKommune] = useState<
        KommuneFeature | undefined
    >();
    // @ts-ignore
    function handleClick(e: MapBrowserEvent<MouseEvent>) {

        const clickedKommune = kommuneSource.getFeaturesAtCoordinate(
            e.coordinate,
        ) as KommuneFeature[];

        if (clickedKommune.length === 1) {
            const properties = clickedKommune[0].getProperties() as KommuneProperties;
            alert(properties.navn.find( (n) => n.sprak === "nor")!.navn);
            setSelectedKommune(clickedKommune[0]);
            overlay.setPosition(e.coordinate);
        } else {
            setSelectedKommune(undefined);
            overlay.setPosition(undefined);
        }

    }

    useEffect(() => {
        if(checked){
            setLayers((old) => [... old, kommuneLayer]);
            map.on("click", handleClick);
        }
        return () => {
            map.un("click", handleClick);
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
