import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ForgotPasswordModal = ({ show, handleClose }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call your backend API
            // await axios.post("/api/users/forgot-password", { email });

            alert("Password reset link sent to your email.");
            handleClose();
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Forgot Password</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <p className="text-muted">
                        Enter your registered email address.
                    </p>

                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        type="submit"
                    >
                        Send Reset Link
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ForgotPasswordModal;