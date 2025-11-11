import Main from "../layout/Main";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
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
    const [isEdit, setIsEdit] = useState(null);


    const fetchBanks = async () => {
        try {
            const res = await axiosInstance.get("/bank");
            setBanks(res.data.message || []);
        } catch (error) {
            console.error("Error while fetching banks", error);
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
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid py-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Bank List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddBank}>
                                Add Bank
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
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
                                    {banks.length > 0 ? (
                                        banks.map((bank, index) => (
                                            <tr key={bank.id}>
                                                <td>{index + 1}</td>
                                                <td>{bank.district}</td>
                                                <td>{bank.bank_name}</td>
                                                <td>{bank.regional_name}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary btn-sm"
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
                                            <td colSpan="5" align="center">
                                                No banks found.
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
