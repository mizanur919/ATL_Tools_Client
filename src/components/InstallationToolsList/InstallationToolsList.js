import axios from "axios";
import { Button, Form, Modal } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import "./InstallationToolsList.css";

const PrizeBondList = () => {
  const [toolsList, setToolsList] = useState([]);
  const url = "https://shielded-wave-70948.herokuapp.com/InstallationToolsList";

  // Edit Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Delete Modal
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  // Data State
  const [toolName, setToolName] = useState("");
  const [version, setVersion] = useState("");
  const [downloadLink, setDownloadLink] = useState("");

  // Fetch Data
  const getToolsList = async () => {
    try {
      const response = await axios.get(url);
      setToolsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Tools Name",
      selector: (row) => row.ToolName,
    },
    {
      name: "Version",
      selector: (row) => row.Version,
    },
    {
      name: "Action",
      cell: (row) => [
        <Button className="btn btn-warning btn-sm me-3" onClick={handleShow}>
          Edit
        </Button>,
        <Button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row?._id)}
        >
          Delete
        </Button>,
      ],
    },
  ];

  // Show Data In Table
  useEffect(() => {
    getToolsList();
  }, []);

  //Delete Tool
  const handleDelete = (id) => {
    const url = `https://shielded-wave-70948.herokuapp.com/deleteTool/${id}`;
    if (window.confirm("Are you sure?")) {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            alert("Deleted");
            // const remainingBrands = brand.filter((brand) => brand._id !== id);
            // setBrand(remainingBrands);
          }
        });
    }
  };

  return (
    <div>
      {/* Edit Modal */}
      <div className="btn-add-modal">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4 className="text-center">Update Tool Information</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Tool Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Tool Name" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Version</Form.Label>
                <Form.Control type="Text" placeholder="Enter version" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Download Link</Form.Label>
                <Form.Control type="Text" placeholder="Enter Download Link" />
              </Form.Group>
              <Button variant="success" type="submit" className="w-100">
                Update
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

      {/* Delete Modal */}
      <Modal show={deleteShow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDeleteClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={toolsList}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        highlightOnHover
        subHeader
        subHeaderComponent={
          <Form.Control
            type="password"
            id="inputPassword5"
            placeholder="Search"
            aria-describedby="passwordHelpBlock"
            className="w-25"
          />
        }
      />
    </div>
  );
};

export default PrizeBondList;
