import React, { useEffect, useState } from 'react'
import ReactChart from 'react-apexcharts'
import axios from 'axios'
import SideBar from '../pages/SideBar'

export default function Chart() {

    const [options, setOptions] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: []
        }
    })

    const [series, setSeries] = useState([{
        name: 'series-1',
        data: []
    }])

    const [optionsZ, setOptionsZ] = useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: []
        }
    })

    const [seriesZ, setSeriesZ] = useState([{
        name: 'series-1',
        data: []
    }])

    useEffect(() => {
        loadNbrPharmacieByVille();
        loadVilles();
    }, []);

    const loadNbrPharmacieByVille = async () => {
        const tabV = []
        const tabN = []
        const result = await axios.get(process.env.React_App_URL + "villes/NbrPharmacie");
        const res = result.data;
        res.map((res) => {
            tabV.push(res[0]);
            tabN.push(res[1]);
        })
        setOptions({
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: tabV
            }
        })
        setSeries([{
            name: 'Nombre de pharmacie',
            data: tabN
        }])
    }

    const [villes, setVilles] = useState([]);

    const loadVilles = async () => {
        const result = await axios.get(process.env.React_App_URL + "villes/all");
        setVilles(result.data);
    }

    const loadNbrPharmacieByZone = async (id) => {
        const tabV = []
        const tabN = []
        const result = await axios.get(process.env.React_App_URL + `zones/NbrPharmacieZone/ville=${id}`);
        const res = result.data;
        console.log(res);
        res.map((res) => {
            tabV.push(res[0]);
            tabN.push(res[1]);
        })
        setOptionsZ({
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: tabV
            }
        })
        setSeriesZ([{
            name: 'Nombre de pharmacie',
            data: tabN
        }])
    }

    return (
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <SideBar />
                <div class="layout-page">

                    <div class="content-wrapper">

                        <div class="container-xxl flex-grow-1 container-p-y">
                            <div class="row">

                                <div class="col-lg">
                                    <div class="card mb-4">
                                        <h5 class="card-header">Nombre de pharmacies par ville</h5>
                                        <br />
                                        <ReactChart options={options} series={series} type="bar" width={550} height={500} />
                                    </div>
                                </div>

                                <div class="col-lg">
                                    <div class="card mb-4">
                                        <div class="col-lg">
                                            <h5 class="card-header">Nombre de pharmacies par zone</h5>
                                            <div class="input-group w-25 mx-auto">
                                                <select class="form-select placement-dropdown mx-1" name='zone' onChange={(e) => { loadNbrPharmacieByZone(e.target.value) }}>
                                                    <option value={0} selected></option>
                                                    {
                                                        villes.map((ville, index) => (
                                                            <option value={ville.id} >{ville.nom}</option>
                                                        ))}
                                                </select>
                                            </div>
                                            <ReactChart options={optionsZ} series={seriesZ} type="bar" width={550} height={500} />
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
