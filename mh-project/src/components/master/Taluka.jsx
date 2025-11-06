
import Main from "../layout/Main";
import { useState, useEffect } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Taluka() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        district: "",
        taluka_name: "",
        regional_name: "",
    });
    const [errors, setErrors] = useState({});
    const [taluka, setTaluka] = useState([]);

    const validator = () => {
        const newErrors = {};
        if (!formData.district.trim()) newErrors.district = "district is required";
        if (!formData.taluka_name.trim()) newErrors.taluka_name = "taluka name is required";
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
            const res = await axios.post("http://127.0.0.1:8000/api/taluka/save", formData);
            alert("Taluka added successfully");
            console.log(res.data);
            setShowModal(false);
            handleReset();
            window.location.reload();
        }
        catch (error) {
            console.error("Error while saving data", errors);
            alert("failed to add role");
        }
    }

    const handleTaluka = () => {
        setShowModal(true);
    }
    const [districts, setDistricts] = useState([]);

    const fetchDistrict = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/districts");
            setDistricts(res.data.message);
        }
        catch (error) {
            console.error("error while fetching district", error);
        }
    }

    const fetchTaluka = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/taluka");
            setTaluka(res.data.message);
        }
        catch (error) {
            console.error("error while fetching taluka", error);
        }
    }
    const handleReset = () => {
        setFormData({
            district: "",
            taluka_name: "",
            regional_name: "",
        });
    }

    useEffect(() => {
        fetchDistrict();
        fetchTaluka();
    }, []);

    useEffect(() => {
        if (taluka.length > 0) {
            if ($.fn.DataTable.isDataTable("#talukaTable")) {
                $("#talukaTable").DataTable().destroy();
            }
            $("#talukaTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [taluka]);
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid mx-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Taluka List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleTaluka}>
                                Add Taluka
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="talukaTable" className="table table-bordered table-striped table-small table-hover">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>District</th>
                                        <th>Taluka</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {taluka.length > 0 ? (
                                        taluka.map((test, index) =>
                                            <tr key={index}>
                                                <td>{test.id}</td>
                                                <td>{test.district}</td>
                                                <td>{test.taluka_name}</td>
                                                <td>{test.regional_name}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-sm" type="button">
                                                        <FaEdit />
                                                    </button>
                                                    <button className="btn btn-danger btn-sm" type="button">
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No data found</td>
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
                                        <h5 className="modal-title">Add Taluka</h5>
                                        <button className="btn-close" type="button" onClick={() => setShowModal(false)}></button>
                                    </div>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className="modal-body">
                                            <div className="row">
                                                <div className="col-md-12 form-group my-2">
                                                    <label htmlFor="district" className="form-label">District</label>
                                                    <select name="district" id="district" className={`form-control ${errors.district ? "is-invalid" : ""}`} onChange={handleChange} value={formData.district}>
                                                        <option value="">Select District</option>
                                                        {districts.map((test, index) =>
                                                            <option key={index} value={test.district}>{test.district}</option>
                                                        )}
                                                    </select>
                                                    {errors.district && (
                                                        <div className="text-danger small">{errors.district}</div>
                                                    )}
                                                </div>

                                                <div className="col-md-12 form-group my-2">
                                                    <label htmlFor="taluka_name" className="form-label">Taluka Name</label>
                                                    <input type="text" id="taluka_name" name="taluka_name" onChange={handleChange} value={formData.taluka_name} className={`form-control ${errors.taluka_name ? "is-invalid" : ""}`} />
                                                    {errors.taluka_name && (
                                                        <div className="text-danger small">{errors.taluka_name}</div>
                                                    )}
                                                </div>

                                                <div className="col-md-12 form-group my-2">
                                                    <label htmlFor="regional_name" className="form-label">Regional Name</label>
                                                    <input type="text" id="regional_name" name="regional_name" onChange={handleChange} value={formData.regional_name} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                                                    {errors.regional_name && (
                                                        <div className="text-danger small">{errors.regional_name}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-muted" onClick={() => setShowModal(false)}>Cancel</button>
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

export default Taluka;