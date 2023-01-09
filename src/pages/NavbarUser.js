import React from 'react'

function NavbarUser() {
    return (


        <nav
            className="layout-navbar navbar navbar-expand-xl navbar-atached align-items-center bg-navbar-theme bg-dark p-4"
            id="layout-navbar"
        >
            <a className="navbar-brand" href="/"><b className="display-6">T A S H I L A T</b></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-nav-right d-flex align-items-center ms-5" id="navbar-collapse">

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active me-2">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="#">Water & Electricity</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="#">Insurance</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="/phone-internet">Phone & Internet</a>
                        </li>
                        <li className="nav-item me-2">
                            <a className="nav-link" href="#">University</a>
                        </li>
                    </ul>
                </div>


                <ul className="navbar-nav flex-row align-items-center ms-auto">

                    <li className="nav-item lh-1 me-3">
                        <a
                            className="button"
                            href="#"
                        ></a>
                    </li>

                    <li className="nav-item navbar-dropdown dropdown-user dropdown">
                        <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                            <div className="avatar avatar-online">
                                <img src="../assets/img/avatars/1.png" alt="true" className="w-px-40 h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    <div className="d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <div className="avatar avatar-online">
                                                <img src="../assets/img/avatars/1.png" alt="true" className="w-px-40 h-auto rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <span className="fw-semibold d-block"></span>
                                            <small className="text-muted"></small>
                                        </div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-user me-2"></i>
                                    <span className="align-middle">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <i className="bx bx-cog me-2"></i>
                                    <span className="align-middle">Settings</span>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    <span className="d-flex align-items-center align-middle">
                                        <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                                        <span className="flex-grow-1 align-middle">Billing</span>
                                        <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                                    </span>
                                </a>
                            </li>
                            <li>
                                <div className="dropdown-divider"></div>
                            </li>
                            <li>
                                <button className="dropdown-item" >
                                    <i className="bx bx-power-off me-2"></i>
                                    <span className="align-middle">Log Out</span>
                                </button>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </nav>

    )
}

export default NavbarUser