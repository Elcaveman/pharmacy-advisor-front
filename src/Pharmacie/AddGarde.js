import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SideBar from '../pages/SideBar';
import { Link } from 'react-router-dom';

export default function AddGarde() {

    const [test, setTest] = useState();

    console.log("Date", test);

    const [gardePharmacie, setGardePharmacie] = useState({
        dateFin: "2022-12-14",
        pharmacie: {
            id: 17
        },
        garde: {
            idGarde: 2
        },
        pharmacieDeGardePK: {
            pharmaciePK: 17,
            gardePK: 2,
            dateDebut: "2022-12-13"
        }
    })

    useEffect(() => {
        loadGardes();
        loadVilles();
        loadAffectation();
    }, []);

    const { dateFin, pharmacie, garde, pharmacieDeGardePK } = gardePharmacie

    const onSubmit = async (e) => {
        await axios.post(process.env.React_App_URL + `pharmaciesDeGarde/add/${debut}/${fin}`, gardePharmacie)
    };

    const [gardes, setGardes] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [zones, setZones] = useState([]);
    const [villes, setVilles] = useState([]);
    const [debut, setDebut] = React.useState('');
    const [fin, setFin] = React.useState('');
    const [affectations, setAffectations] = useState([]);

    const loadGardes = async () => {
        const result = await axios.get(process.env.React_App_URL + "gardes/all");
        console.log(result.data)
        setGardes(result.data);
    }

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const loadAllPharmacieByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/allDispoByVille/id=${id}`);
        setPharmacies(result.data);
    }

    const loadAllZoneByVille = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `zones/zone/ville=${id}`);
        setZones(result.data);
    }

    const loadAllPharmacieByZone = async (id) => {
        const result = await axios.get(process.env.React_App_URL + `pharmacies/allDispoByZone/id=${id}`);
        setPharmacies(result.data);
    }

    const loadAffectation = async () => {
        const result = await axios.get(process.env.React_App_URL + "pharmaciesDeGarde/all");
        setAffectations(result.data);
    }

    const deleteGarde = async (id) => {
        await axios.delete(process.env.React_App_URL + `gardes/deleteGarde/id=${id}`)
        loadGardes()
    }

    const popDel = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteGarde(id)
                Swal.fire(
                    'Deleted!',
                    'The client has been deleted successfully.',
                    'success'
                )
            }
        })
    }

    const popSuccess = () => {
        Swal.fire({
            title: 'Added!!',
            text: "The client has been added successfully",
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                document.location = '/addGarde'
            }
        })
    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar />
                <div class="layout-page">

                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">
                                <div class="col-md-8 mx-auto">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Gestion des gardes</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Type de garde</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='garde' onChange={(e) => { gardePharmacie.garde.idGarde = e.target.value; gardePharmacie.pharmacieDeGardePK.gardePK = e.target.value }}>
                                                            <option></option>
                                                            {
                                                                gardes.map((garde, index) => (
                                                                    <option value={garde.idGarde} >{garde.type}</option>
                                                                ))}

                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Ville</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown mx-1" name='ville' onChange={(e) => { loadAllPharmacieByVille(e.target.value); loadAllZoneByVille(e.target.value) }} >
                                                            <option></option>
                                                            {
                                                                villes.map((ville, index) => (
                                                                    <option value={ville.id}>{ville.nom}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Zone</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown mx-1" name='zone' onChange={(e) => { loadAllPharmacieByZone(e.target.value) }}>
                                                            <option></option>
                                                            {
                                                                zones.map((zone, index) => (
                                                                    <option value={zone.id}>{zone.nom}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Pharmacies Disponible</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown mx-1" name='pharmacie' onChange={(e) => { gardePharmacie.pharmacie.id = e.target.value; gardePharmacie.pharmacieDeGardePK.pharmaciePK = e.target.value }}>
                                                            <option></option>
                                                            {
                                                                pharmacies.map((pharmacie, index) => (
                                                                    <option value={pharmacie.id}>{pharmacie.nom}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Date de début</label>
                                                    <div class="col-sm-10">
                                                        <input type={"date"} name='prenom' class="form-control" id="basic-default-name" onChange={(e) => { gardePharmacie.pharmacieDeGardePK.dateDebut = e.target.value; setDebut(e.target.value) }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Date de fin</label>
                                                    <div class="col-sm-10">
                                                        <input type={"date"} name='prenom' class="form-control" id="basic-default-name" onChange={(e) => { gardePharmacie.dateFin = e.target.value; setFin(e.target.value) }} />
                                                    </div>
                                                </div>

                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary"><i class='bx bx-save'></i> Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-8 mx-auto">
                                    <div class="card">
                                        <h5 class="card-header">Historique de gardes</h5>
                                        <div class="table-responsive text-nowrap">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Pharmacie</th>
                                                        <th>Type de garde</th>
                                                        <th>Date de début</th>
                                                        <th>Date de fin</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    {
                                                        affectations.map((affectation, index) => (
                                                            <tr>
                                                                <td>{affectation.pharmacie.nom}</td>
                                                                <td>{affectation.garde.type}</td>
                                                                <td>{affectation.pharmacieDeGardePK.dateDebut}</td>
                                                                <td>{affectation.dateFin}</td>
                                                                <td>
                                                                    <Link class="btn btn-outline-warning mx-2" to={`/editaffectation/${affectation.pharmacie.id}/${affectation.garde.idGarde}/${affectation.pharmacieDeGardePK.dateDebut}`}><i class="bx bx-edit-alt me-1"></i>Edit</Link>
                                                                    <a class="btn btn-outline-danger" onClick={() => null}><i class="bx bx-trash me-1"></i> Delete</a>
                                                                </td>
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
                </div >
            </div>
        </div >
    )
}
