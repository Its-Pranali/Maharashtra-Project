import { useState, useEffect } from "react";
import Main from "../layout/Main";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import axiosInstance from "../../api/axiosConfig";

function Designation() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [designations, setDesignations] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        designation: "",
        regional_name: "",
    });

    // === FETCH DESIGNATION ===
    const fetchDesignation = async () => {
        try {
            const res = await axiosInstance.get("/designations");
            setDesignations(res.data);
        } catch (error) {
            console.error("Error fetching designations:", error);
        }
    };

    useEffect(() => {
        fetchDesignation();
    }, []);

    // === DATATABLE INIT ===
    useEffect(() => {
        if (designations.length > 0) {
            if ($.fn.DataTable.isDataTable("#designationTable")) {
                $("#designationTable").DataTable().destroy();
            }
            setTimeout(() => {
                $("#designationTable").DataTable({
                    pageLength: 5,
                    lengthChange: false,
                    searching: true,
                    ordering: true,
                    info: true,
                });
            }, 100);
        }
    }, [designations]);

    // === VALIDATOR ===
    const validator = () => {
        const newErrors = {};
        if (!formData.designation.trim())
            newErrors.designation = "Designation is required";
        if (!formData.regional_name.trim())
            newErrors.regional_name = "Regional name is required";
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // === SUBMIT HANDLER ===
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (isEditing) {
                const res = await axiosInstance.put(
                    `/designations/${editId}`,
                    formData
                );
                if (res.status === 200) {
                    alert("Designation updated successfully!");
                }
            } else {
                const res = await axiosInstance.post(
                    "/designations/save",
                    formData
                );
                if (res.status === 201 || res.status === 200) {
                    alert("Designation added successfully!");
                }
            }

            setFormData({ designation: "", regional_name: "" });
            setShowModal(false);
            setIsEditing(false);
            setEditId(null);
            fetchDesignation();
            window.location.reload();
        } catch (error) {
            console.error("Error saving designation:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert("Something went wrong while saving data!");
            }
        }
    };

    // === DELETE HANDLER ===
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this designation?")) {
            try {
                const res = await axiosInstance.delete(
                    `/designations/${id}`
                );
                if (res.status === 200) {
                    alert("Designation deleted successfully!");
                    fetchDesignation();
                    window.location.reload();
                }
            } catch (error) {
                console.error("Error deleting designation:", error);
                alert("Failed to delete designation!");
            }
        }
    };

    const handleEdit = (item) => {
        setFormData({
            designation: item.designation,
            regional_name: item.regional_name,
        });
        setEditId(item.id);
        setIsEditing(true);
        setShowModal(true);
    };



    const handleAddDesignation = () => {
        setErrors({});
        setFormData({ designation: "", regional_name: "" });
        setIsEditing(false);
        setShowModal(true);
    };

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Designation List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddDesignation} >
                                Add Designation
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="designationTable" className="table table-bordered table-striped table-hover table-sm" >
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Designation</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {designations.length > 0 ? (
                                        designations.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.regional_name}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item)} >
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)} >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
                    <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {isEditing ? "Edit Designation" : "Add Designation"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="form-group col-md-12 my-2">
                                            <label htmlFor="designation" className="form-label">
                                                Designation
                                            </label>
                                            <input type="text" name="designation" id="designation" value={formData.designation} onChange={handleChange} className={`form-control ${errors.designation ? "is-invalid" : ""}`} />
                                            {errors.designation && (
                                                <div className="text-danger small">
                                                    {errors.designation}
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group col-md-12 my-2">
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
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            {isEditing ? "Update" : "Save"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Main>
    );
}

export default Designation;
