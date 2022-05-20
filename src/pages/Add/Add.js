import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./Add.css";
import { AiFillPlusSquare } from "react-icons/ai";
import InstallationToolsList from "../../components/InstallationToolsList/InstallationToolsList";
import axios from "axios";

const Add = () => {
  // Model States Start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Model States End

  // Add Service
  const toolNameRef = useRef();
  const versionRef = useRef();
  const downloadLinkRef = useRef();

  const handleAddUser = (e) => {
    e.preventDefault();
    const ToolName = toolNameRef.current.value;
    const Version = versionRef.current.value;
    const DownloadLink = downloadLinkRef.current.value;

    const newUser = { ToolName, Version, DownloadLink };
    const postURL = "https://shielded-wave-70948.herokuapp.com/tool";
    fetch(postURL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Data added");
          setShow(false);
        }
      });
  };

  return (
    <div className="data-add-info">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12 mb-4">
            <h4>Add Software Installation Tools</h4>
            <div className="btn-add-modal mt-4">
              <Button variant="primary" onClick={handleShow}>
                <AiFillPlusSquare className="add-prize-bond" /> Add Tool
              </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h4 className="text-center">
                      Add Software Installation Tool
                    </h4>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Tool Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Tool Name"
                        ref={toolNameRef}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Version</Form.Label>
                      <Form.Control
                        type="Text"
                        placeholder="Enter version"
                        ref={versionRef}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Download Link</Form.Label>
                      <Form.Control
                        type="Text"
                        placeholder="Enter Download Link"
                        ref={downloadLinkRef}
                      />
                    </Form.Group>
                    <Button
                      variant="success"
                      type="submit"
                      onClick={handleAddUser}
                      className="w-100"
                    >
                      Add
                    </Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>

        {/* Prize Bond List */}
        <div className="">
          <InstallationToolsList />
        </div>
      </div>
    </div>
  );
};

export default Add;
