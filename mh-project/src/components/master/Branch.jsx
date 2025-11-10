import { useEffect, useState } from "react";
import Main from "../layout/Main";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Branch() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    const [showModal, setShowModal] = useState(false);
    const [district, setDistrict] = useState([]);
    const [branch, setBranch] = useState([]);
    const [isEdit, setIsEdit] = useState(null);
    const [formData, setFormData] = useState({
        district: "",
        branch_name: "",
    });

    const [errors, setErrors] = useState({});

    const validator = () => {
        const newErrors = {};
        if (!formData.district.trim()) newErrors.district = "district is required";
        if (!formData.branch_name.trim()) newErrors.branch_name = "branch name is required";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if (isEdit) {
                await axios.put(`http://127.0.0.1:8000/api/branch/${isEdit}`, formData);
                alert("Branch updated successfully");
            }
            else {
                await axios.post("http://127.0.0.1:8000/api/branch/save", formData);
                alert("Branch saved Successfully");
            }
            handleCloseModal();
            fetchBranch();
        }
        catch (error) {
            console.error("data not found", error);
            alert("Error while saving/ Updating branch");
        }


    }
    const handleEdit = (branch) => {
        setFormData({
            district: branch.district,
            branch_name: branch.branch_name,
        });
        setIsEdit(branch.id);
        setErrors({});
        setShowModal(true);
    }
    const fetchDistrict = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/districts");
        setDistrict(res.data);
    }

    const fetchBranch = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/branch");
        setBranch(res.data.message);
    }

    useEffect(() => {
        fetchDistrict();
        fetchBranch();
    }, []);
    useEffect(() => {
        if (branch.length > 0) {
            if ($.fn.DataTable.isDataTable("#branchTable")) {
                $("#branchTable").DataTable().destroy();
            }
            $("#branchTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    },[branch]);
    const handleAddBranch = () => {
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
        setIsEdit(null);
        setErrors({});
    }
    const handleReset = () => {
        setFormData({
            district: "",
            branch_name: "",
        });
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this branch?"
        );
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/branch/${id}`);
            alert("Branch deleted successfully");
            fetchBranch();
        } catch (error) {
            console.error("Error deleting branch:", error);
            alert("Error deleting branch");
        }
    };
    return (
        <section>
            <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
                <div className="container-fluid px-3">
                    <div className="row">
                        <div className="card py-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="card-title fw-bold fs-5">Branch List</div>
                                <button className="btn btn-sm btn-primary" onClick={handleAddBranch}>
                                    Add Branch
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2">
                        <div className="card py-3">
                            <div className="table-responsive">
                                <table id="branchTable" className="table table-bordered table-striped table-hover table-sm">
                                    <thead>
                                        <tr>
                                            <th>Sr.No</th>
                                            <th>District</th>
                                            <th>Branch</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {branch.length > 0 ? (
                                            branch.map((test, index) =>
                                                <tr key={index}>
                                                    <td>{test.id}</td>
                                                    <td>{test.district}</td>
                                                    <td>{test.branch_name}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-sm btn-primary" onClick={() => handleEdit(test)}>
                                                            <FaEdit />
                                                        </button>
                                                        <button type="button" className="btn btn-sm mx-2 btn-danger" onClick={()=>handleDelete(test.id)}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="4">Data not found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal && (
                    <>
                        <div className="modal fade show" style={{ display: "block", zIndex: 1050 }}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">{isEdit ? "Edit Branch" : "Add Branch"}</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-12 form-group my-2">
                                                    <label htmlFor="district" className="form-label">District</label>
                                                    <select name="district" id="district" onChange={handleChange} value={formData.district} className={`form-control ${errors.district ? "is-invalid" : ""}`}>
                                                        <option value="">Select District</option>
                                                        {district.map((test, index) =>
                                                            <option key={index} value={test.district}>{test.district}</option>
                                                        )}
                                                    </select>
                                                    {errors.district && (
                                                        <div className="text-danger small">{errors.district}</div>
                                                    )}
                                                </div>

                                                <div className="col-md-12 form-group my-2">
                                                    <label htmlFor="branch_name" className="form-label">Branch</label>
                                                    <input type="text" name="branch_name" id="branch_name" value={formData.branch_name} onChange={handleChange} className={`form-control ${errors.branch_name ? "is-invalid" : ""}`} />
                                                    {errors.branch_name && (
                                                        <div className="text-danger small">{errors.branch_name}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-muted bordered" onClick={handleCloseModal}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">{isEdit ? "Update" : "Save"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Main>
        </section>
    );
}

export default Branch;