
import { useState, useEffect } from "react";
import Main from "../layout/Main";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

function Designation() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);

    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

    const [designations, setDesignations] = useState([]);

    const fetchDesignation = async () => {
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/designation");
            setDesignations(res.data);
        }
        catch (error) {
            console.error("Error Fetching designation", error);
        }
    }

    useEffect(() => {
        fetchDesignation();
    }, []);

    useEffect(() => {
        if (designations.length > 0) {
            if ($.fn.DataTable.isDataTable("#designationTable")) {
                $("designationTable".DataTable().destroy());
            }

            $("#designationTable").DataTable({
                paheLength: 5,
                lengthChange: false,
                searching: true,
                ordering: true,
                info: true,
            });
        }
    }, [designations]);

    const validator = () => {
        const newErrors = {};

        if (!formData.designation.trim()) newErrors.designation = "designation is required";
        if (!formData.regional_name.trim()) newErrors.regional_name = "regional is required";

        return newErrors;
    }

    const [formData, setFormData] = useState({
        designation: "",
        regional_name: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
            const res = await axios.post(
                "http://127.0.0.1:8000/api/designations/save",
                formData
            );

            if (res.status === 201) {
                alert("Organization added successfully!");
                setFormData({ org_name: "", regional_name: "" });
                setShowModal(false);
                // fetchOrganizations(); // refresh table
            } else {
                alert("Failed to save organization. Try again.");
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

    const handleAddDesignation = () => {
        setShowModal(true);
    }
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Designation List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddDesignation}>Add Designation</button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table id="designationTable" className="table table-bordered table-stripped table-hover table-sm ">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Designation</th>
                                        <th>Regional</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {designations.length>0?(
                                        designations.map((org,index)=>{
                                            <tr>
                                                <th>{index+1}</th>
                                                <th>{org.designation}</th>
                                                <th>{org.regional_name}</th>
                                                <th></th>
                                            </tr>
                                        })
                                    ):(
                                        <tr>

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

                    <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        Add Designation
                                    </h5>

                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
                                </div>

                                <form action="" onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="form-group col-md-12 my-2">
                                            <label htmlFor="designation" className="form-label">Designation</label>
                                            <input type="text" name="designation" id="designation" value={formData.designation} onChange={handleChange} className={`form-control ${errors.designation ? "is-invalid" : ""}`} />
                                            {errors.designation && (
                                                <div className="text-danger small">{errors.designation}</div>
                                            )}
                                        </div>

                                        <div className="form-group col-md-12 my-2">
                                            <label htmlFor="regional_name" className="form-label">Regional Name</label>
                                            <input type="text" name="regional_name" id="regional_name" value={formData.regional_name} onChange={handleChange} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                                            {errors.regional_name && (
                                                <div className="text-danger small">{errors.regional_name}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save</button>
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