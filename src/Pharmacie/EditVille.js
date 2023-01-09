import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import SideBar from '../pages/SideBar'

export default function EditVille() {

    let navigate = useNavigate()

    const { id } = useParams()

    const [ville, setVille] = useState({
        nom: ""
    })

    const { nom } = ville

    const onInputChange = (e) => {
        setVille({ ...ville, [e.target.name]: e.target.value })
    };

    useEffect(() => {
        loadVille()
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(process.env.React_App_URL + `villes/updateVille/id=${id}`, ville)

    };

    const loadVille = async () => {
        const result = await axios.get(process.env.React_App_URL + `villes/ville/id=${id}`)
        setVille(result.data)
    }

    const pop = () => {
        Swal.fire(
            'Updated!',
            'The client has been updated successfully.',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                document.location = '/ville';
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
                                            <h5 class="mb-0">Modifier une ville</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>

                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Nom de la ville</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='nom' class="form-control" id="basic-default-name" value={nom} onChange={(e) => onInputChange(e)} />
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
                </div></div>
        </div>
    )
}
