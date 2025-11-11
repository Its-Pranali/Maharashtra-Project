import { useState, useEffect } from "react";
import Main from "../layout/Main";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import $ from "jquery";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import "datatables.net-dt";
import axiosInstance from "../../api/axiosConfig";

function Organization() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        org_name: "",
        regional_name: "",
    });
    const [errors, setErrors] = useState({});
    const [organizations, setOrganizations] = useState([]);

    //  Fetch all organizations
    const fetchOrganizations = async () => {
        try {
            const res = await axiosInstance.get("/organizations");
            setOrganizations(res.data);
        } catch (error) {
            console.error("Error fetching organizations:", error);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    //  Initialize DataTable
    useEffect(() => {
        if (organizations.length > 0) {
            if ($.fn.DataTable.isDataTable("#organizationTable")) {
                $("#organizationTable").DataTable().destroy();
            }
            $("#organizationTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [organizations]);

    // Validation
    const validator = () => {
        const newErrors = {};
        if (!formData.org_name.trim())
            newErrors.org_name = "Organization name is required";
        if (!formData.regional_name.trim())
            newErrors.regional_name = "Regional name is required";
        return newErrors;
    };

    //  Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            let res;
            if (isEditing && editId) {
                // Update existing record
                res = await axiosInstance.put(
                    `/organizations/${editId}`,
                    formData
                );
            } else {
                // Add new record
                res = await axiosInstance.post(
                    "/organizations",
                    formData
                );
                window.location.reload();
            }

            if (res.status === 200 || res.status === 201) {
                alert(isEditing ? "Organization updated successfully!" : "Organization added successfully!");
                setFormData({ org_name: "", regional_name: "" });
                setShowModal(false);
                setIsEditing(false);
                setEditId(null);
                await fetchOrganizations();
            }
        } catch (error) {
            console.error("Error saving organization:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert("Something went wrong while saving data!");
            }
        }
    };


    const handleEdit = (org) => {
        setFormData({
            org_name: org.org_name,
            regional_name: org.regional_name,
        });
        setEditId(org.id);
        setIsEditing(true);
        setShowModal(true);
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this organization?")) {
            try {
                await axiosInstance.delete(`/organizations/${id}`);
                alert("Organization deleted successfully!");
                fetchOrganizations();
            } catch (error) {
                console.error("Error deleting organization:", error);
                alert("Failed to delete organization.");
            }
        }
    };


    const closeModal = () => {
        setShowModal(false);
        setIsEditing(false);
        setEditId(null);
        setFormData({ org_name: "", regional_name: "" });
        setErrors({});
    };

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Organization List</div>
                            <button className="btn btn-sm btn-primary" onClick={() => { setIsEditing(false); setFormData({ org_name: "", regional_name: "" }); setShowModal(true); }} >
                                Add Organization
                            </button>
                        </div>
                    </div>
                </div>


                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="organizationTable" className="table table-bordered table-striped table-hover table-sm" >
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Organization Name</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {organizations.length > 0 ? (
                                        organizations.map((org, index) => (
                                            <tr key={org.id}>
                                                <td>{index + 1}</td>
                                                <td>{org.org_name}</td>
                                                <td>{org.regional_name}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(org)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(org.id)} >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center text-muted">
                                                No organizations found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {showModal && (
                    <>
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
                        <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {isEditing ? "Edit Organization" : "Add Organization"}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={closeModal} ></button>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="form-group my-2 col-md-12">
                                                <label htmlFor="org_name" className="form-label">
                                                    Organization Name
                                                </label>
                                                <input type="text" name="org_name" id="org_name" value={formData.org_name} onChange={handleChange} className={`form-control ${errors.org_name ? "is-invalid" : ""}`} />
                                                {errors.org_name && (
                                                    <div className="text-danger small">
                                                        {errors.org_name}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="form-group my-2 col-md-12">
                                                <label htmlFor="regional_name" className="form-label">
                                                    Regional Name
                                                </label>
                                                <input type="text" name="regional_name" id="regional_name" value={formData.regional_name} onChange={handleChange} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                                                {errors.regional_name && (
                                                    <div className="text-danger small">
                                                        {errors.regional_name}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={closeModal} > Close </button>
                                            <button type="submit" className="btn btn-primary">
                                                {isEditing ? "Update" : "Submit"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Main>
    );
}

export default Organization;
