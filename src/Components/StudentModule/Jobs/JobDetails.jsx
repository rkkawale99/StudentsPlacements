import React from "react";
import { Modal, Button, Badge, Row, Col, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useStudent } from "../../Contexts/StudentContext";
import api from "../../../utils/axios";
import Spinner from "../../CommonComp/Spinner";



const JobDetails = () => {
  const { state: job } = useLocation();
  const { student, setLoading, loading } = useStudent();
  const navigate = useNavigate();
  


  if (!job) return null;

  
  

  const cgpa = student?.cgpa ?? 0;
  const backlog = student?.backlog ?? 0;
  const passingYear = student?.passingYear ?? 0;

  const eligible =
    cgpa >= job.minCgpa &&
    backlog <= job.maxBacklogs;
    passingYear >= job.passingYear;

  return (
    loading ? <Spinner/> : 
    <Modal
      show={true}
      size="lg"
      centered
      onHide={() => navigate(-1)}
    >
        
      <Modal.Header closeButton>
        <Modal.Title>
          {job.companyName}
          <div className="text-primary fs-5 mt-1">
            {job.jobRole}
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {eligible ? (
          <Alert variant="success">
            <strong>Congratulations!</strong><br />
            You are eligible for this job.
          </Alert>
        ) : (
          <Alert variant="danger">
            <strong>Sorry!</strong><br />
            You are not eligible.
          </Alert>
        )}

        <Row>

          <Col md={6}>
            <p><strong>Package</strong></p>
            <p>₹ {job.salaryPackage} LPA</p>
          </Col>

          <Col md={6}>
            <p><strong>Location</strong></p>
            <p>{job.location}</p>
          </Col>

          <Col md={6}>
            <p><strong>Vacancies</strong></p>
            <p>{job.vacancies}</p>
          </Col>

          <Col md={6}>
            <p><strong>Status</strong></p>

            <Badge bg={job.status === "OPEN" ? "success" : "secondary"}>
              {job.status}
            </Badge>
          </Col>

          <Col md={6}>
            <p><strong>Minimum CGPA</strong></p>
            <p>{job.minCgpa}</p>
          </Col>

          <Col md={6}>
            <p><strong>Maximum Backlogs</strong></p>
            <p>{job.maxBacklogs}</p>
          </Col>

          <Col md={6}>
            <p><strong>Passing Year</strong></p>
            <p>{job.passingYear}</p>
          </Col>

          <Col md={6}>
            <p><strong>Registration Deadline</strong></p>
            <p>{job.registrationDeadline}</p>
          </Col>

          <Col md={6}>
            <p><strong>Interview Date</strong></p>
            <p>{job.interviewDate || "Not Scheduled"}</p>
          </Col>

        </Row>

        <hr />

        <h5>Job Description</h5>

        <p className="text-muted">
          {job.description}
        </p>

        <hr />

        <h5>Your Eligibility</h5>

        <table className="table table-bordered">

          <thead>
            <tr>
              <th>Criteria</th>
              <th>Required</th>
              <th>Your</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>CGPA</td>
              <td>{job.minCgpa}</td>
              <td>{cgpa}</td>
              <td>
                {cgpa >= job.minCgpa ? (
                  <Badge bg="success">✔</Badge>
                ) : (
                  <Badge bg="danger">✖</Badge>
                )}
              </td>
            </tr>

            <tr>
              <td>Backlogs</td>
              <td>{job.maxBacklogs}</td>
              <td>{backlog}</td>
              <td>
                {backlog <= job.maxBacklogs ? (
                  <Badge bg="success">✔</Badge>
                ) : (
                  <Badge bg="danger">✖</Badge>
                )}
              </td>
            </tr>

            <tr>
              <td>Passing Year</td>
              <td>{job.passingYear}</td>
              <td>{passingYear}</td>
              <td>
                {passingYear === job.passingYear ? (
                  <Badge bg="success">✔</Badge>
                ) : (
                  <Badge bg="danger">✖</Badge>
                )}
              </td>
            </tr>

          </tbody>

        </table>

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
        >
          Close
        </Button>

        <Button
          variant="primary"
          disabled={!eligible || job.status !== "OPEN"}
          onClick={async () => {
            // Apply API here
            try {
                setLoading(true)
                await api.post(`/applications/apply?studentId=${student.id}&jobId=${job.id}`);
                setLoading(false)
                alert("Apply Successfully");
            } catch (error) {
                alert("Error")
                setLoading(false)
            }
          }}
        >
          Apply Now
        </Button>

      </Modal.Footer>

    </Modal>
        
  );
};

export default JobDetails;