import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import SideBar from '../pages/SideBar'

export default function EditZone() {

    let navigate = useNavigate()

    const { id, idGarde, dateDebut } = useParams()



    const [pharmacie_id, setPharmacieId] = React.useState('');
    const [id_Garde, setIdGarde] = React.useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('ville_id', ville_id);
        fetch(process.env.React_App_URL + `zones/updateZone/id=${id}`, {
            method: 'put',
            body: formData
        }).then(res => {
            if (res.ok) {
                console.log(res);
            }
        });
    };

    useEffect(() => {
        loadZone();
        loadVilles();
    }, []);

    const loadZone = async () => {
        const result = await axios.get(process.env.React_App_URL + `zones/zone/id=${id}`)
        setNom(result.data.nom)
        setVilleId(result.data.ville.id)
    }

    const [villes, setVilles] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const pop = () => {
        Swal.fire(
            'Updated!',
            'The client has been updated successfully.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                document.location = '/zone';
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
                                            <h5 class="mb-0">Modifier une zone</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>

                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Nom de la zone</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" value={nom} onChange={(e) => { setNom(e.target.value); }} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-email">Ville</label>
                                                    <div class="col-sm-10">
                                                        <select class="form-select placement-dropdown" name='ville' onChange={(e) => { setVilleId(e.target.value); }}>
                                                            {
                                                                villes.map((ville, index) => (
                                                                    <option value={ville.id} selected={ville_id == ville.id}>{ville.nom}</option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                </div>
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
