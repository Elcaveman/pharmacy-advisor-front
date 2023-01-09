import L from "leaflet"
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SideBar from "../pages/SideBar";
import { LocationMarker } from './LocationMarker';
function GetIcon(_iconSize) {
    return L.icon({
        iconUrl: require("../static/Icons/marker1.png"),
        iconSize: [_iconSize]
    })
}

function Home() {

    const [pharmacies, setPharmacies] = useState([]);

    const [b, setb] = useState({
        bb: 0
    })

    const { id } = useParams();

    useEffect(() => {
        loadPharmacies()
        loadVilles()
    }, []);

    const loadPharmacies = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmacies/allAccepte");
        setPharmacies(result.data);

    }
    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const loadAllPharmacieByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/ville=${id}`);
        setPharmacies(result.data);
    }

    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const loadAllPharmacieByZone = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/zone=${id}`);
        setPharmacies(result.data);
    }

    const check1 = (x) => {
        if (x === 0) {
            // x===0 on affiche tout
            return loadPharmacies();
        } else {
            // x!=0 on filtre par ville
            return loadAllPharmacieByVille(x);
        }
    }

    const check2 = (x) => {
        // x===0 on affiche tout
        if (x === 0) {
            console.log("this is b",b)
            return loadAllPharmacieByVille(b);
        } else {
            return loadAllPharmacieByZone(x);
        }

    }

    
    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar />
                <div class="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl  align-items-center bg-navbar-theme"
                        id="layout-navbar">
                        <div class="input-group w-25 mx-auto">
                            <select class="form-select placement-dropdown mx-1" name='ville' onChange={(e) => { check1(e.target.value); loadAllZoneByVille(e.target.value); setb(e.target.value) }} >
                                <option value={0} selected>Afficher tous</option>
                                {
                                    villes.map((ville, index) => (
                                        <option value={ville.id}>{ville.nom}</option>
                                    ))
                                }
                            </select>
                            <select class="form-select placement-dropdown mx-1" name='zone' onChange={(e) => { check2(e.target.value) }}>
                                <option value={0} selected>Afficher tous</option>
                                {
                                    zones.map((zone, index) => (
                                        <option value={zone.id}>{zone.nom}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </nav>
                    <div class="content-wrapper">
                        <LeafletMap className="map"
                            center={[ 33.5731, 7.5898 ]}
                            zoom={9}
                            scrollWheelZoom={true}
                            style={{ height: 750, with: 100 }}>

                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {
                                pharmacies.map((pharmacie, index) => (

                                    <Marker position={[pharmacie.lat, pharmacie.log]} icon={GetIcon(40)}>
                                        <Popup>
                                            {pharmacie.nom}
                                        </Popup>
                                    </Marker>
                                ))
                            }
                            <LocationMarker />
                        </LeafletMap>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;