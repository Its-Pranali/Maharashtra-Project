import axiosInstance from "../../api/axiosConfig";
import Main from "../layout/Main";
import { useState, useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function Village() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        district: "",
        taluka: "",
        village: "",
        regional_name: "",
    });
    const [errors, setErrors] = useState({});
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [villages, setVillages] = useState([]);
    const [isEdit, setIsEdit] = useState(null);

    useEffect(() => {
        if (villages.length > 0) {
            if ($.fn.DataTable.isDataTable("#villageTable")) {
                $("#villageTable").DataTable().destroy();
            }
            $("#villageTable").DataTable({
                pageLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [villages]);

    const validator = () => {
        const newErrors = {};
        if (!formData.district.trim()) newErrors.district = "District is required";
        if (!formData.taluka.trim()) newErrors.taluka = "Taluka name is required";
        if (!formData.village.trim()) newErrors.village = "Village is required";
        if (!formData.regional_name.trim()) newErrors.regional_name = "Regional name is required";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });

        if (name === "district") {
            setFormData((prev) => ({ ...prev, taluka: "" }));
            fetchTalukas(value);
        }
    };

    const fetchDistrict = async () => {
        try {
            const res = await axiosInstance.get("/districts");
            setDistricts(res.data);
        } catch (error) {
            console.error("Data not found", error);
        }
    };
    const fetchVillage = async () => {
        try {
            const res = await axiosInstance.get("/village");
            setVillages(res.data.message);
        }
        catch (error) {
            console.error("Error while fetching villages", error);
        }
    }


    const fetchTalukas = async (districtId) => {
        if (!districtId) {
            setTalukas([]);
            return;
        }

        try {
            const res = await axiosInstance.get(`/taluka/by-district/${districtId}`);
            const { data } = res;

            if (Array.isArray(data.data) && data.data.length > 0) {
                setTalukas(data.data);
            } else {
                setTalukas([]);
            }
        } catch (error) {
            console.error("Error fetching talukas:", error);
            setTalukas([]);
        }
    };


    useEffect(() => {
        fetchDistrict();
        fetchVillage();

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            if (isEdit) {
                await axiosInstance.put(`/village/${isEdit}`, formData);
                alert("Village updated successfully");
            }
            else {
                await axiosInstance.post('village/save', formData);
                alert("village saved successfully");
            }
            handleCloseModal();
            fetchVillage();
        }
        catch (error) {
            console.error("Error while save/update Village", error);
            alert("Error");
        }
    };
    const handleEdit = (v) => {
        setFormData({
            district: v.district,
            taluka: v.taluka,
            village: v.village,
            regional_name: v.regional_name,
        });
        setIsEdit(v.id);
        setErrors({});
        setShowModal(true);
    }

    const handleAddVillage = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Village List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddVillage}>
                                Add Village
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="villageTable" className="table table-bordered table-striped table-hover table-sm text-center">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>District</th>
                                        <th>Taluka</th>
                                        <th>Village</th>
                                        <th>Regional Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {villages.length > 0 ? (
                                        villages.map((v, index) =>
                                            <tr key={index}>
                                                <td>{v.id}</td>
                                                <td>{v.district}</td>
                                                <td>{v.taluka}</td>
                                                <td>{v.village}</td>
                                                <td>{v.regional_name}</td>
                                                <td>
                                                    <button type="button" className="btn btn-sm btn-primary" onClick={() => handleEdit(v)}><FaEdit /></button>
                                                    <button type="button" className="btn btn-sm btn-danger ms-2"><FaTrash /></button>
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
                <div className="modal fade show" style={{ display: "block", zIndex: 1050 }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Village</h5>
                                <button type="button" onClick={handleCloseModal} className="btn-close"></button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="district" className="form-label"> District Name </label>
                                            <select name="district" id="district" onChange={handleChange} value={formData.district} className={`form-control ${errors.district ? "is-invalid" : ""}`} >
                                                <option value="">Select District</option>
                                                {districts.map((d, index) => (
                                                    <option key={index} value={d.id}>
                                                        {d.district}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.district && (
                                                <div className="text-danger small">{errors.district}</div>
                                            )}
                                        </div>

                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="taluka" className="form-label"> Taluka Name </label>
                                            <select name="taluka" id="taluka" onChange={handleChange} value={formData.taluka} className={`form-control ${errors.taluka ? "is-invalid" : ""}`} >
                                                <option value="">Select Taluka</option>
                                                {talukas.map((t, index) => (
                                                    <option value={t.id} key={index}>
                                                        {t.taluka_name}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.taluka && (
                                                <div className="text-danger small">{errors.taluka}</div>
                                            )}
                                        </div>

                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="village" className="form-label"> Village Name </label>
                                            <input type="text" name="village" id="village" onChange={handleChange} value={formData.village} className={`form-control ${errors.village ? "is-invalid" : ""}`} />
                                            {errors.village && (
                                                <div className="text-danger small">{errors.village}</div>
                                            )}
                                        </div>

                                        <div className="col-md-12 form-group my-2">
                                            <label htmlFor="regional_name" className="form-label"> Regional Name </label>
                                            <input type="text" name="regional_name" id="regional_name" onChange={handleChange} value={formData.regional_name} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                                            {errors.regional_name && (
                                                <div className="text-danger small">{errors.regional_name}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-muted border" onClick={handleCloseModal} >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-sm btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Main>
    );
}

export default Village;
