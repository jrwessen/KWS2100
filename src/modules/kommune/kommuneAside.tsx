import React, { useMemo } from "react";
import {Map, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {useGeographic} from "ol/proj";
import {Layer} from "ol/layer";
export function KommuneAside({layers} : {layers: Layer[]}) {
    const kommuneLayer = useMemo(
        () => layers.find((l) => l.getClassName() === "kommune"), [layers],);
    return (
        <aside>
            <div>
                <h2>
                    Kommune
                </h2>
            </div>
        </aside>
    );
}