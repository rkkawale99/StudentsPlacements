import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Student",
      icon: "bi-mortarboard-fill",
      desc: "Apply for jobs and track placements.",
      path: "/studentsignup",
    },
    {
      title: "Company",
      icon: "bi-buildings-fill",
      desc: "Post jobs and hire students.",
      path: "/companysignup",
    },
    {
      title: "Admin",
      icon: "bi-shield-lock-fill",
      desc: "Manage the placement portal.",
      path: "/adminsignup",
    },
  ];

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center">
      <div className="container">

        <div className="text-center mb-5">
          <h1 className="text-light fw-bold">
            Welcome to Placement Portal
          </h1>

          <p className="text-secondary fs-5">
            Choose how you want to continue
          </p>
        </div>

        <div className="row g-4 justify-content-center">

          {roles.map((role) => (
            <div className="col-md-4" key={role.title}>

              <div
                className="card bg-secondary border-0 shadow-lg rounded-4 h-100 text-center p-4 hover-lift"
                style={{
                  cursor: "pointer",
                  transition: ".3s",
                }}
                onClick={() => navigate(role.path)}
              >

                <div
                  className="bg-primary bg-opacity-25 rounded-circle mx-auto d-flex justify-content-center align-items-center mb-4"
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                >
                  <i className={`${role.icon} fs-1 text-primary`}></i>
                </div>

                <h3 className="text-light">
                  {role.title}
                </h3>

                <p className="text-muted mb-4">
                  {role.desc}
                </p>

                <button className="btn btn-primary btn-press">
                  Continue
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default RoleSelection;