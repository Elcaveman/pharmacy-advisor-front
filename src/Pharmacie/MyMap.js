import L from "leaflet"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMapEvent,useMap } from "react-leaflet";
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SideBar from "../pages/SideBar";
import MapSearch from "./MapSearch";
function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../static/Icons/marker1.png"),
        iconSize: [_iconSize]
    })
}

function MyMap() {

    const [pharmacie, setPharmacie] = useState({
        nom: "",
        lat: 0,
        log: 0
    })
    const MyMapCenterEvent = ()=> {
        const map = useMapEvent('click', () => {
        map.flyTo([pharmacie.lat, pharmacie.log], map.getZoom())
        })
        return null
    }
    const { id } = useParams();

    useEffect(() => {
        loadPharmacie()
    }, []);


    const loadPharmacie = async () => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/id=${id}`)
        const result_garde = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/garde=${id}`)
        console.log(result_garde)
        setPharmacie(result.data)
    }
    const position = [pharmacie.lat, pharmacie.log]
    return (
        <React.StrictMode>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar />
                <div class="layout-page">
                    <div class="content-wrapper">
                        <LeafletMap className="map"
                            center={position}
                            zoom={7}
                            style={{ height: 750, with: 100 }}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={position} icon={GetIcon(40)}>
                                <Popup>
                                    {pharmacie.nom} 
                                </Popup>
                            </Marker>
                        </LeafletMap>
                    </div>
                </div>
            </div>
        </div>
        </React.StrictMode>
    )
}

export default MyMap;