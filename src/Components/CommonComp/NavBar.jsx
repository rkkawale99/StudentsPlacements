import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CompanyNavbar from "../CompanyModule/CompanyNavbar";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    console.log(location.pathname);
    
    const companies = [
        {
            id: 1,
            name: "Google",
            role: "Software Engineer",
            package: "45 LPA",
        },
        {
            id: 2,
            name: "Microsoft",
            role: "SDE",
            package: "42 LPA",
        },
        {
            id: 3,
            name: "TCS",
            role: "Java Full Stack Developer",
            package: "7 LPA",
        },
        {
            id: 4,
            name: "Infosys",
            role: "System Engineer",
            package: "5.5 LPA",
        },
    ];
    const filteredCompanies = companies.filter((company) =>
        company.name.toLowerCase().includes(search.toLowerCase()) ||
        company.role.toLowerCase().includes(search.toLowerCase()) ||
        company.package.toLowerCase().includes(search.toLowerCase())
    );

    let navbarContent;

    switch (location.pathname) {
        case "/":
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

        case "/student/dashboard":
            navbarContent = (
                <>
                    <div className="position-relative mx-auto w-50">

                        <input
                            type="text"
                            className="form-control bg-dark text-light border-secondary"
                            placeholder="Search companies..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />


                        {search.trim() !== "" && filteredCompanies.length >= 0 && (
                            <div
                                className="position-absolute w-100 bg-secondary rounded shadow mt-1"
                                style={{
                                    zIndex: 1050,
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                }}
                            >
                                {filteredCompanies.length === 0 && (<h6 className="p-3 text-info"> No Company Found
                                </h6>)}
                                {filteredCompanies.map((company) => (
                                    <div
                                        key={company.id}
                                        className="p-3 border-bottom company-item"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/student/companylist", { state: company });

                                        }}
                                    >
                                        <h6 className="mb-1 text-light">{company.name}</h6>

                                        <small className="text-muted d-block">
                                            {company.role}
                                        </small>

                                        <small className="text-primary">
                                            {company.package}
                                        </small>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>

                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item me-3">
                            <button className="btn btn-dark position-relative">
                                <i className="bi bi-bell fs-5"></i>

                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    3
                                </span>
                            </button>
                        </li>

                        <li className="nav-item dropdown">
                            <button
                                className="btn nav-link dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <i className="bi bi-person-circle fs-4"></i>
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <Link className="dropdown-item hover-color" to="/student/profile">
                                        My Profile
                                    </Link>
                                </li>

                                <li>
                                    <Link className="dropdown-item hover-color" to="/student/applications">
                                        Applications
                                    </Link>
                                </li>

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>
                                    <button className="dropdown-item text-danger">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </>
            );
            break;
        case '/company/dashboard':
            navbarContent = (
                <CompanyNavbar/>
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