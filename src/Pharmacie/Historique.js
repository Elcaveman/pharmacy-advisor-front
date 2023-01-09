import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import SideBar from '../pages/SideBar';


export default function Historique() {

    const [historique, setHistorique] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadHistorique()
    }, []);


    const loadHistorique = async () => {
        const result = await axios.get(process.env.React_App_URL + `pharmaciesDeGarde/Historique/id=${id}`)
        setHistorique(result.data)
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
                                    <div class="card">
                                        <h5 class="card-header">Historique de gardes</h5>
                                        <div class="table-responsive text-nowrap">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Type de garde</th>
                                                        <th>Date de début</th>
                                                        <th>Date de fin</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="table-border-bottom-0">
                                                    {
                                                        historique.map((h, index) => (
                                                            <tr><td>{h.garde.type}</td>
                                                                <td>{h.pharmacieDeGardePK.dateDebut}</td>
                                                                <td>{h.dateFin}</td>
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
                </div>  </div>
        </div>
    )
}
