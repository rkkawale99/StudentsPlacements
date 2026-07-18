import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyNavbar from "../CompanyModule/CompanyNavbar";
import AdminNavbar from "../AdminModule/AdminNavbar";
import StudentNavbar from "../StudentModule/StudentNavbar";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    let path = location.pathname.split("/")[1];
    console.log(location.pathname.split("/"));
    
 

    let navbarContent;

    switch (path) {
        case "":
            navbarContent = (
                <>
                    <ul className="navbar-nav ms-auto gap-3">
                        <li className="nav-item">
                            <a className={`nav-link ${location.hash === "#home" ? "active" : ""}`} href="#home">
                                Home
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link ${location.hash === "#stats" ? "active" : ""}`} href="#stats">
                                Statistics
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link ${location.hash === "#recruiters" ? "active" : ""}`} href="#recruiters">
                                Companies
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link ${location.hash === "#stories" ? "active" : ""}`} href="#stories">
                                Success Stories
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className={`nav-link ${location.hash === "#features" ? "active" : ""}`} href="#features">
                                Why Us
                            </a>
                        </li>
                    </ul>

                    <Link
                        to="/login"
                        className="btn btn-custom-primary ms-lg-4 px-4"
                    >
                        Login
                    </Link>
                </>
            );
            break;

        case "student":
            navbarContent = (<StudentNavbar
    studentName={"Rushi"}
/>)
            break;
        case 'company':
            navbarContent = (
                <CompanyNavbar/>
            )
            break;
        case 'admin':
            navbarContent = (
                <AdminNavbar/>
            )
            break;

        default:
            navbarContent = <></>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-surface border-bottom border-secondary border-opacity-25 py-3">
            <div className="container">
                <Link
                    className="navbar-brand fw-bold text-primary-custom fs-4"
                    to="/"
                >
                    <i className="bi bi-mortarboard-fill me-2"></i>
                    PLACEMENT PORTAL
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {navbarContent}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;