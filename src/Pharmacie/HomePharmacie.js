import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SideBar from '../pages/SideBar';


export default function HomePharmacie() {
    const [pharmacies, setPharmacies] = useState([]);
    const [pharmaciesAttente, setPharmaciesAttente] = useState([]);
    const [pharmaciesAccepte, setPharmaciesAccepte] = useState([]);
    const [pharmaciesRefus, setPharmaciesRefus] = useState([]);

    const [b, setb] = useState({
        bb: 0
    })

    const { id } = useParams()

    useEffect(() => {
        loadPharmacies();
        loadPharmaciesAccepte();
        loadPharmaciesAttente();
        loadPharmaciesRefus();
        loadVilles();
    }, []);

    const loadPharmacies = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmacies/all");
        console.log("result",result)
        setPharmacies(result.data);

    }

    const loadPharmaciesAttente = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmacies/allEnAttente");
        console.log("loadPharmaciesAttente",result)
        setPharmaciesAttente(result.data);

    }

    const loadPharmaciesAccepte = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmacies/allAccepte");
        console.log("pharmacies/allAccepte",result)
        setPharmaciesAccepte(result.data);

    }

    const loadPharmaciesRefus = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmacies/allRefus");
        console.log("pharmacies/allRefus",result)
        setPharmaciesRefus(result.data);

    }

    const accepterPharmacie = async (id) => {
        await axios.put(process.env.React_App_URL + `pharmacies/acceptePharmacie/id=${id}`)
        loadPharmacies();
        loadPharmaciesAccepte();
        loadPharmaciesAttente();
        loadPharmaciesRefus();
    }

    const refuserPharmacie = async (id) => {
        await axios.put(process.env.React_App_URL + `pharmacies/refusPharmacie/id=${id}`)
        loadPharmacies();
        loadPharmaciesAccepte();
        loadPharmaciesAttente();
        loadPharmaciesRefus();
    }
    const suprimerPharmacie = async (id) => {
        await axios.put(process.env.React_App_URL + `pharmacies/deletePharmacie/id=${id}`)
        loadPharmacies();
        loadPharmaciesAccepte();
        loadPharmaciesAttente();
        loadPharmaciesRefus();
    }
    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const loadAllPharmacieByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/ville=${id}`);
        setPharmaciesAccepte(result.data);
    }

    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const loadAllPharmacieByZone = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/pharmacie/zone=${id}`);
        setPharmaciesAccepte(result.data);
    }

    const etat = (etat) => {
        if (etat == 0) {
            return <span className="badge bg-label-warning me-1">En attente</span>;
        } else if (etat == 1) {
            return <span className="badge bg-label-success me-1">Accepté</span>;
        }
        else if (etat == 2) {
            return <span className="badge bg-label-danger me-1">Refusé</span>;
        }
    }
    var a = 0;
    const check1 = (x) => {
        if (x == 0) {
            return loadPharmaciesAccepte();
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

    const popAccepter = (id) => {
        Swal.fire({
            title: 'Etes-vous sûre?',
            text: "Voulez vous accepter cette pharmacie!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                accepterPharmacie(id)
            }
        })
    }

    const popRefuser = (id) => {
        Swal.fire({
            title: 'Etes-vous sûre?',
            text: "Voulez vous refuser cette pharmacie!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                refuserPharmacie(id)
            }
        })
    }
    const popSupprimer = (id) => {
        Swal.fire({
            title: 'Etes-vous sûre?',
            text: "Voulez vous supprimer cette pharmacie?!",
            icon: 'danger',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: "Annuler"
        }).then((result) => {
            if (result.isConfirmed) {
                suprimerPharmacie(id)
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
                                <div class="col-xl-12">
                                    <div class="nav-align-top mb-4">
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link active"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-home"
                                                    aria-controls="navs-top-home"
                                                    aria-selected="true"
                                                >
                                                    Les pharmacies acceptées
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-profile"
                                                    aria-controls="navs-top-profile"
                                                    aria-selected="false"
                                                >
                                                    Les pharmacies en attente
                                                </button>
                                            </li>
                                            <li class="nav-item">
                                                <button
                                                    type="button"
                                                    class="nav-link"
                                                    role="tab"
                                                    data-bs-toggle="tab"
                                                    data-bs-target="#navs-top-messages"
                                                    aria-controls="navs-top-messages"
                                                    aria-selected="false"
                                                >
                                                    Les pharmacies refusées
                                                </button>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="left-button">
                                            <Link to={`/pharmacie/add`} class="menu-link">
                                                <i class='menu-icon tf-icons bx bxs-plus'></i>
                                                <button class="btn btn-primary">Ajouter une pharmacie</button>
                                            </Link>
                                                
                                            </div>
                                            <div class="tab-pane fade show active" id="navs-top-home" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <div class="input-group w-25 mx-auto">
                                                    </div>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Nom</th>
                                                                <th>Adresse</th>
                                                                <th>Zone</th>
                                                                <th>Ville</th>
                                                                <th>Etat</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                pharmaciesAccepte.map((p, index) => (
                                                                    <tr>
                                                                        <td>{p.nom}</td>
                                                                        <td>{p.adresse}</td>
                                                                        <td>{p.zone?.nom}</td>
                                                                        <td>{p.zone?.ville.nom}</td>
                                                                        <td>{etat(p.etat)}</td>
                                                                        <td>
                                                                            <Link to={`/map/${p.id}`} class="btn btn-outline-primary mx-2" >Afficher dans la catre</Link>
                                                                            <Link to={`/historique/${p.id}`} class="btn btn-outline-dark" >Historique de garde</Link>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="navs-top-profile" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Nom</th>
                                                                <th>Adresse</th>
                                                                <th>Zone</th>
                                                                <th>Ville</th>
                                                                <th>Etat</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                pharmaciesAttente.map((p, index) => (
                                                                    <tr>
                                                                        <td>{p.nom}</td>
                                                                        <td>{p.adresse}</td>
                                                                        <td>{p.zone?.nom}</td>
                                                                        <td>{p.zone?.ville.nom}</td>
                                                                        <td>{etat(p.etat)}</td>
                                                                        <td>
                                                                            <button class="btn btn-outline-success mx-2" onClick={() => popAccepter(p.id)}>Accepter</button>
                                                                            <button class="btn btn-outline-warning mx-2" onClick={() => popRefuser(p.id)}>Refuser</button>
                                                                            <button class="btn btn-danger text-centered" onClick={() => popSupprimer(p.id)}><i 
                                                                            class='menu-icon tf-icons bx bxs-trash m-0'></i></button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="navs-top-messages" role="tabpanel">
                                                <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                                    <table class="table table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th>Nom</th>
                                                                <th>Adresse</th>
                                                                <th>Zone</th>
                                                                <th>Ville</th>
                                                                <th>Etat</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody class="table-border-bottom-0" >
                                                            {
                                                                pharmaciesRefus.map((p, index) => (
                                                                    <tr>
                                                                        <td>{p.nom}</td>
                                                                        <td>{p.adresse}</td>
                                                                        <td>{p.zone?.nom}</td>
                                                                        <td>{p.zone?.ville.nom}</td>
                                                                        <td>{etat(p.etat)}</td>
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
                    </div>
                </div>
            </div>
        </div>

    )
}
