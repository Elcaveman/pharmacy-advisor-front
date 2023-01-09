import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SideBar from '../pages/SideBar'

export default function HomeGarde() {
    let navigate = useNavigate()

    const [garde, setGarde] = useState({
        type: ""
    })

    const { type } = garde

    const onInputChange = (e) => {
        setGarde({ ...garde, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(process.env.React_App_URL + "gardes/add", garde)
        navigate("/garde");
    };

    const [gardes, setGardes] = useState([]);

    const { id } = useParams()

    useEffect(() => {
        loadGardes();
    }, []);

    const loadGardes = async () => {
        const result = await axios.get(process.env.React_App_URL + "gardes/all");
        console.log(result.data)
        setGardes(result.data);
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
                document.location = '/garde'
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
                                <div class="col-md-8 mx-auto">
                                    <div class="card mb-4">
                                        <div class="card-header d-flex align-items-center justify-content-between">
                                            <h5 class="mb-0">Ajouter une nouvelle garde</h5>
                                        </div>
                                        <div class="card-body">
                                            <form onSubmit={(e) => onSubmit(e)}>
                                                <div class="row mb-3">
                                                    <label class="col-sm-2 col-form-label" for="basic-default-name">Type de la garde</label>
                                                    <div class="col-sm-10">
                                                        <input type={"text"} name='type' class="form-control" id="basic-default-name" value={type} onChange={(e) => onInputChange(e)} />
                                                    </div>
                                                </div>
                                                <div class="row justify-content-end">
                                                    <div class="col-sm-10">
                                                        <button type="submit" class="btn btn-primary" onClick={() => { popSuccess() }}><i class='bx bx-save'></i> Save</button>
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
                                        <h5 class="card-header">Liste des gardes</h5>
                                        <div class="table-responsive text-nowrap" style={{ "overflow": "visible" }}>
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Nom de la ville</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0" >
                                                    {
                                                        gardes.map((garde, index) => (
                                                            <tr>
                                                                <td>{garde.idGarde}</td>
                                                                <td>{garde.type}</td>
                                                                <td>
                                                                    <Link class="btn btn-outline-warning mx-2" to={`/garde/${garde.idGarde}`}><i class="bx bx-edit-alt me-1"></i>Edit</Link>
                                                                    <a class="btn btn-outline-danger" onClick={() => popDel(garde.idGarde)}><i class="bx bx-trash me-1"></i> Delete</a>
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
        </div>
    )
}
