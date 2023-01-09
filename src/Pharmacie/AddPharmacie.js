import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer as LeafletMap, TileLayer,useMap } from "react-leaflet";
import Swal from 'sweetalert2'
import SideBar from '../pages/SideBar'
import MapSearch from './MapSearch'
import { SearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

const searchControl = new SearchControl({
    provider: new OpenStreetMapProvider(),
    style: 'button',
});

export default function AddPharmacie() {
    let navigate = useNavigate()
    
    
    const [nom, setNom] = React.useState('');
    const [zone_id, setZoneId] = React.useState('');
    const [adresse, setAdresse] = React.useState('');
    const [telephone, setTelephone] = React.useState('');
    const [lat, setLat] = React.useState(.0);
    const [log, setLog] = React.useState(.0);

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = {};
        formData['nom'] = nom;
        formData['zone_id'] = zone_id;
        formData['adresse'] = adresse;
        formData['telephone'] = telephone;
        formData['lat'] = lat;
        formData['log'] = log;
        formData['user_id'] = 1;
        console.log("searchControl",searchControl)
        console.log("formData",formData)
        fetch(process.env.React_App_URL + `pharmacies/add`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res => {
            if (res.ok) {
                console.log(res);
            }
        });
    };
    const [zones, setZones] = useState([]);

    useEffect(() => {
        loadZones();
    }, []);

    const loadZones = async () => {
        const result = await axios.get(process.env.React_App_URL + `zones/all`)
        console.log("zones",result)
        setZones(result.data)
    }



    const pop = () => {
        Swal.fire(
            'Succés!',
            'La pharmacie à été ajouté avec succés.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                document.location = '/pharmacie';
            }
        })
    }
    return (
        <div class="layout-wrapper layout-content-navbar">
            <SideBar />
            <div class="layout-container">
                <div class="layout-page">
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-xxl">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Ajouter une pharmacie</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                            <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Nom</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" value={nom} onChange={(e) => { setNom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-Zone">Zone</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='zone' id="basic-default-Zone" onChange={(e) => { setZoneId(e.target.value); }}>
                                                                <option></option>
                                                                {
                                                                    zones.map((zone, index) => (
                                                                        <option value={zone.id}>
                                                                            {zone.ville.nom} - {zone.nom}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-Adresse">Adresse</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='adresse' class="form-control" id="basic-default-Adresse" value={adresse} onChange={(e) => { setAdresse(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Telephone</label>
                                                    <div class="col-sm-10">
                                                        <input type={"tel"} name='telephone' class="form-control" id="basic-default-name" value={telephone} onChange={(e) => { setTelephone(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <LeafletMap className="map"
                                                    center={[0,0]}
                                                    zoom={7}
                                                    style={{ height: 750, with: 100 }}>
                                                    <TileLayer
                                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                    />
                                                    <MapSearch searchControl={searchControl} setLog={setLog} setLat={setLat}></MapSearch>
                                                </LeafletMap>
                                                {/* <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-Lat">Lat</label>
                                                    <div class="col-sm-10">
                                                        <input type={"number"} name='nom' class="form-control" id="basic-default-Lat" value={lat} onChange={(e) => { setLat(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-Log">Log</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='Log' class="form-control" id="basic-default-Log" value={log} onChange={(e) => { setLog(e.target.value); }} />
                                                    </div>
                                                </div> */}
                                                
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary" onClick={() => pop()}><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}