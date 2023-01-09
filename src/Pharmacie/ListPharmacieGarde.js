import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import SideBar from '../pages/SideBar'

export default function ListPharmacieGarde() {

    const [b, setb] = useState({
        bb: 0
    })

    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        loadPharmacies();
        loadVilles();
    }, []);

    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const loadPharmacies = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmaciesDeGarde/allEnGarde");
        console.log(result.data)
        setPharmacies(result.data);
    }

    const loadAllPharmacieByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmaciesDeGarde/EnGarde/ville=${id}`);
        setPharmacies(result.data);
    }

    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const loadAllPharmacieByZone = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmaciesDeGarde/EnGarde/zone=${id}`);
        setPharmacies(result.data);
    }

    const check1 = (x) => {
        if (x == 0) {
            return loadPharmacies();
        } else {
            return loadAllPharmacieByVille(x);
        }

    }

    const check2 = (x) => {
        if (x == 0) {
            console.log(b)
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
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="card">
                                <h5 class="card-header">Pharmacie en cours de garde</h5>
                                <div class="table-responsive text-nowrap">
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
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Nom</th>
                                                <th>Adresse</th>
                                                <th>Zone</th>
                                                <th>Ville</th>
                                                <th>Type de garde</th>
                                                <th>Date de début</th>
                                                <th>Date de fin</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody class="table-border-bottom-0">
                                            {
                                                pharmacies.map((pharmacie, index) => (
                                                    <tr>
                                                        <td>
                                                            <strong>{pharmacie.pharmacie.nom}</strong>
                                                        </td>
                                                        <td>{pharmacie.pharmacie.adresse}</td>
                                                        <td>{pharmacie.pharmacie.zone.nom}</td>
                                                        <td>{pharmacie.pharmacie.zone.ville.nom}</td>
                                                        <td>{pharmacie.garde.type}</td>
                                                        <td>{pharmacie.pharmacieDeGardePK.dateDebut}</td>
                                                        <td>{pharmacie.dateFin}</td>
                                                        <td><Link to={`/map/${pharmacie.pharmacie.id}`} class="btn btn-outline-primary" >Afficher dans la catre</Link></td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
