import Main from "../layout/Main";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    FaTrash,
    FaEdit,
    FaPlus,
    FaSync,
    FaUniversity,
    FaMapMarkerAlt,
    FaRegClock,
} from "react-icons/fa";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import axiosInstance from "../../api/axiosConfig";

function Bank() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        district: "",
        bank_name: "",
        regional_name: "",
    });
    const [errors, setErrors] = useState({});
    const [districts, setDistricts] = useState([]);
    const [banks, setBanks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSync, setLastSync] = useState(null);
    const [isEdit, setIsEdit] = useState(null);


    const fetchBanks = async () => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get("/bank");
            setBanks(res.data.message || []);
            setLastSync(new Date());
        } catch (error) {
            console.error("Error while fetching banks", error);
        } finally {
            setIsLoading(false);
        }
    };


    const fetchDistricts = async () => {
        try {
            const res = await axiosInstance.get("/districts");
            setDistricts(res.data || []);
        } catch (error) {
            console.error("Error while fetching districts", error);
        }
    };

    useEffect(() => {
        fetchDistricts();
        fetchBanks();
    }, []);


    useEffect(() => {
        if (banks.length > 0) {
            if ($.fn.DataTable.isDataTable("#bankTable")) {
                $("#bankTable").DataTable().destroy();
            }
            $("#bankTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [banks]);


    const validate = () => {
        const newErrors = {};
        if (!formData.district.trim()) newErrors.district = "District is required";
        if (!formData.bank_name.trim())
            newErrors.bank_name = "Bank name is required";
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
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (isEdit) {
                await axiosInstance.put(`/bank/${isEdit}`, formData);
                alert("Bank updated successfully");
            } else {
                await axiosInstance.post("/bank/save", formData);
                alert("Bank saved successfully");
            }
            handleCloseModal();
            fetchBanks();
        } catch (error) {
            console.error("Error while saving bank", error);
            alert("Failed to save bank");
        }
    };


    const handleAddBank = () => {
        handleReset();
        setErrors({});
        setIsEdit(null);
        setShowModal(true);
    };


    const handleEdit = (bank) => {
        setFormData({
            district: bank.district,
            bank_name: bank.bank_name,
            regional_name: bank.regional_name,
        });
        setIsEdit(bank.id);
        setErrors({});
        setShowModal(true);
    };


    const handleCloseModal = () => {
        setShowModal(false);
        handleReset();
        setIsEdit(null);
        setErrors({});
    };
    const handleReset = () => {
        setFormData({
            district: "",
            bank_name: "",
            regional_name: "",
        });
    }
    const handleDelete = async(id) => {
        const confirmDelete=window.confirm("Are you sure you want to delete the bank?");
        if(!confirmDelete) return;
        try{
            await axiosInstance.delete(`/bank/${id}`);
            alert ("Bank deleted successfully");
            fetchBanks();
        }
        catch(error){
            console.error("Error while delete the bank",error);
            alert("Error while Delete the bank");
        }
    }
    const totalBanks = banks.length;
    const totalDistricts = [...new Set(banks.map((bank) => bank.district))].length;

    const formattedSyncTime = lastSync
        ? lastSync.toLocaleString("en-IN", {
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
          })
        : "Not synced yet";

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="card border-0 shadow-sm bg-primary text-white">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                            <div>
                                <p className="text-uppercase small mb-1 opacity-75">
                                    Master Management
                                </p>
                                <div className="card-title fw-bold fs-4 mb-0">Bank Directory</div>
                                <p className="mb-0 opacity-75">
                                    Maintain bank masters, districts, and regional mappings from a
                                    single dashboard.
                                </p>
                            </div>
                            <div className="d-flex mt-3 mt-md-0 gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light text-primary d-flex align-items-center gap-2"
                                    onClick={fetchBanks}
                                    disabled={isLoading}
                                >
                                    <FaSync className={isLoading ? "fa-spin" : ""} />
                                    {isLoading ? "Refreshing..." : "Refresh"}
                                </button>
                                <button
                                    className="btn btn-dark d-flex align-items-center gap-2"
                                    onClick={handleAddBank}
                                >
                                    <FaPlus /> Add Bank
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3 gy-3">
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex gap-3 align-items-center">
                                <div className="rounded-circle bg-primary-subtle text-primary p-3">
                                    <FaUniversity size={24} />
                                </div>
                                <div>
                                    <p className="text-muted text-uppercase small mb-1">Total Banks</p>
                                    <div className="fs-4 fw-bold">{totalBanks}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex gap-3 align-items-center">
                                <div className="rounded-circle bg-success-subtle text-success p-3">
                                    <FaMapMarkerAlt size={24} />
                                </div>
                                <div>
                                    <p className="text-muted text-uppercase small mb-1">
                                        District Coverage
                                    </p>
                                    <div className="fs-4 fw-bold">{totalDistricts}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body d-flex gap-3 align-items-center">
                                <div className="rounded-circle bg-warning-subtle text-warning p-3">
                                    <FaRegClock size={24} />
                                </div>
                                <div>
                                    <p className="text-muted text-uppercase small mb-1">
                                        Last Synced
                                    </p>
                                    <div className="fw-bold">{formattedSyncTime}</div>
                                    {isLoading && (
                                        <small className="text-muted">Fetching latest records…</small>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="card py-3 border-0 shadow-sm">
                        <div className="d-flex justify-content-between align-items-center px-3 pb-2 border-bottom">
                            <div>
                                <h6 className="mb-0 fw-bold">Bank Master Table</h6>
                                <small className="text-muted">
                                    Search, edit or delete banks within the table below
                                </small>
                            </div>
                            <button
                                className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
                                onClick={handleAddBank}
                            >
                                <FaPlus size={12} /> Add Bank
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table
                                id="bankTable"
                                className="table table-bordered table-striped table-hover table-sm"
                            >
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>District Name</th>
                                        <th>Bank Name</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-4">
                                                Fetching banks...
                                            </td>
                                        </tr>
                                    ) : banks.length > 0 ? (
                                        banks.map((bank, index) => (
                                            <tr key={bank.id}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <span className="badge text-bg-light px-3 py-2">
                                                        {bank.district}
                                                    </span>
                                                </td>
                                                <td className="fw-semibold text-dark">
                                                    {bank.bank_name}
                                                </td>
                                                <td>
                                                    <span className="badge text-bg-primary px-3 py-2">
                                                        {bank.regional_name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary btn-sm"
                                                        onClick={() => handleEdit(bank)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm mx-2" onClick={()=>handleDelete(bank.id)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" align="center" className="py-4">
                                                <div className="text-muted">
                                                    No banks found. Try adding a new bank to get started.
                                                </div>
                                            </td>
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
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>

                    <div
                        className="modal fade show"
                        style={{ display: "block", zIndex: 1050 }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {isEdit ? "Edit Bank" : "Add Bank"}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleCloseModal}
                                    ></button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="district" className="form-label">
                                                District
                                            </label>
                                            <select
                                                name="district"
                                                id="district"
                                                onChange={handleChange}
                                                value={formData.district}
                                                className={`form-control ${errors.district ? "is-invalid" : ""
                                                    }`}
                                            >
                                                <option value="">Select district</option>
                                                {districts.map((d, index) => (
                                                    <option key={index} value={d.district}>
                                                        {d.district}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.district && (
                                                <div className="text-danger small">
                                                    {errors.district}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="bank_name" className="form-label">
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                id="bank_name"
                                                name="bank_name"
                                                onChange={handleChange}
                                                value={formData.bank_name}
                                                className={`form-control ${errors.bank_name ? "is-invalid" : ""
                                                    }`}
                                            />
                                            {errors.bank_name && (
                                                <div className="text-danger small">
                                                    {errors.bank_name}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="regional_name" className="form-label">
                                                Regional Name
                                            </label>
                                            <input
                                                type="text"
                                                id="regional_name"
                                                name="regional_name"
                                                onChange={handleChange}
                                                value={formData.regional_name}
                                                className={`form-control ${errors.regional_name ? "is-invalid" : ""
                                                    }`}
                                            />
                                            {errors.regional_name && (
                                                <div className="text-danger small">
                                                    {errors.regional_name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-muted border"
                                            onClick={handleCloseModal}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            {isEdit ? "Update" : "Save"}
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

export default Bank;
