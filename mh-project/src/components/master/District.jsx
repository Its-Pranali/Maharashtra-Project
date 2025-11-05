import { useState, useEffect } from "react";
import Main from "../layout/Main";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";


function District() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [districts, setDistricts] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        district: "",
        regional_name: "",
    });

    const fetchDistricts = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/districts");
            setDistricts(res.data);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);

    // Initialize DataTable when data changes
    useEffect(() => {
        if (districts.length > 0) {
            // Destroy existing DataTable
            if ($.fn.DataTable.isDataTable("#districtTable")) {
                $("#districtTable").DataTable().destroy();
            }
            // Initialize DataTable
            $("#districtTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [districts]);

    const validator = () => {
        const newErrors = {};
        if (!formData.district.trim())
            newErrors.district = "District name is required";
        if (!formData.regional_name.trim())
            newErrors.regional_name = "Regional name is required";
        return newErrors;
    };

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
            if (editingId) {
                await axios.put(
                    `http://127.0.0.1:8000/api/districts/${editingId}`,
                    formData
                );
                alert("District updated successfully!");
            } else {
                await axios.post("http://127.0.0.1:8000/api/districts", formData);
                alert("District added successfully!");
                window.location.reload();
            }

            setShowModal(false);
            setFormData({ district: "", regional_name: "" });
            setEditingId(null);
            fetchDistricts();
        } catch (error) {
            console.error("Error saving district:", error);
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                alert("Something went wrong while saving data!");
            }
        }
    };

    const handleEdit = (district) => {
        setFormData({
            district: district.district,
            regional_name: district.regional_name,
        });
        setEditingId(district.id);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this district?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/districts/${id}`);
                alert("District deleted successfully!");
                fetchDistricts();
            } catch (error) {
                console.error("Error deleting district:", error);
            }
        }
    };

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">District List</div>
                            <button className="btn btn-sm btn-primary" onClick={() => { setFormData({ district: "", regional_name: "" }); setEditingId(null); setShowModal(true); }} >
                                Add District
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="districtTable" className="table table-bordered table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>District Name</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {districts.length > 0 ? (
                                        districts.map((d, index) => (
                                            <tr key={d.id}>
                                                <td>{index + 1}</td>
                                                <td>{d.district}</td>
                                                <td>{d.regional_name}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(d)} >
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(d.id)} >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" align="center">
                                                No districts found.
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
                        {/* Background Blur */}
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

                        <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} >
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {editingId ? "Edit District" : "Add District"}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="form-group my-2">
                                                <label htmlFor="district" className="form-label">
                                                    District Name *
                                                </label>
                                                <input type="text" name="district" className={`form-control ${errors.district ? "is-invalid" : ""}`} value={formData.district} onChange={handleChange} placeholder="Enter District Name" />
                                                {errors.district && (
                                                    <div className="invalid-feedback"> {errors.district}</div>
                                                )}
                                            </div>

                                            <div className="form-group my-2">
                                                <label htmlFor="regional_name" className="form-label">
                                                    Regional Name *
                                                </label>
                                                <input type="text" name="regional_name" className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} value={formData.regional_name} onChange={handleChange} placeholder="Enter Regional Name" />
                                                {errors.regional_name && (
                                                    <div className="invalid-feedback"> {errors.regional_name} </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} >
                                                Close
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                {editingId ? "Update" : "Submit"}
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

export default District;
