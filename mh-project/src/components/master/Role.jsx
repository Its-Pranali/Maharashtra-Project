
import Main from "../layout/Main";
import { useState, useEffect } from "react";
import axios from "axios";
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import { FaEdit, FaTrash } from "react-icons/fa";

function Role() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        role_name: "",
        status: "",
    });
    const [errors, setErrors] = useState({});
    const [options, setOptions] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isEdit, setIsEdit] = useState(null);

    useEffect(() => {
        const statusOptions = ["Active", "Inactive"];
        setOptions(statusOptions);
        fetchRole();
    }, []);
    useEffect(() => {
        if (roles.length > 0) {
            if ($.fn.DataTable.isDataTable("#roleTable")) {
                $("#roleTable").DataTable().destroy()
            }
            $("#roleTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [roles]);

    const validator = () => {
        const newErrors = {};
        if (!formData.role_name.trim()) newErrors.role_name = "role name is required";
        if (!formData.status.trim()) newErrors.status = "status is required";
        return newErrors;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    }

    const handleEdit = (role) => {
        setFormData = ({
            role_name: role.role_name,
            status: role.status,
        });
        setEditId(role.id);
        setShowModal(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (isEdit) {
                await axios.put(`http://localhost:8000/api/roles/${isEdit}`, formData);
                alert("Role updated successfully");
            }
            else {
                await axios.post("http://localhost:8000/api/roles/save", formData);
                alert("Role saved successfully");
            }
            handleCloseModal();
            fetchRole();
        }
        catch (error) {
            console.error("Error:", error);
            alert("Failed to save role!");
        }
    };
 

    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
        setIsEdit(null);
        setErrors({});
    }

    const fetchRole = async (e) => {
        try {
            const res = await axios.get("http://localhost:8000/api/roles");
            setRoles(res.data);
        }
        catch (error) {
            console.error("Error while fetching role", error);
        }

    }
    const handleReset = () => {
        setFormData({
            role_name: "",
            status: "",
        });
    };

    const handleAddRole = () => {
        setShowModal(true);
    }
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="containerfluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Role List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddRole}>
                                Add Role
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-sm table-hover" id="roleTable">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.length > 0 ? (
                                        roles.map((test, index) =>
                                            <tr key={index}>
                                                <td>{test.id}</td>
                                                <td>{test.role_name}</td>
                                                <td>{test.status}</td>
                                                <td>
                                                    <button type="button" onClick={() => handleEdit(test)} className="btn-sm btn-primary btn"><FaEdit /></button>
                                                    <button type="button" className="btn-sm btn-danger mx-2 btn"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="4">
                                                No Data Found
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
                        <div className="modal show fade" style={{ display: "block", zIndex: 1050 }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Role</h5>
                                        <button type="text" onClick={() => setShowModal(false)} className="btn-close"></button>
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="form-group col-md-12 my-2">
                                                    <label htmlFor="role_name" className="form-label">Role</label>
                                                    <input type="text" name="role_name" id="role_name" onChange={handleChange} value={formData.role_name} className={`form-control ${errors.role_name ? "is-invalid" : ""}`} />
                                                    {errors.role_name && (
                                                        <div className="text-danger small">{errors.role_name}</div>
                                                    )}
                                                </div>

                                                <div className="form-group col-md-12 my-2">
                                                    <label htmlFor="status" className="form-label">Status</label>
                                                    <select name="status" id="status" onChange={handleChange} value={formData.status} className={`form-control ${errors.status ? "is-invalid" : ""}`}>
                                                        <option value="">Select status</option>
                                                        {options.map((test, index) =>
                                                            <option key={index} value={test}>{test}</option>
                                                        )}
                                                    </select>
                                                    {errors.status && (
                                                        <div className="text-danger small">{errors.status}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-muted" onClick={handleCloseModal}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
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

export default Role;