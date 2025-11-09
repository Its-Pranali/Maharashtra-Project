
import Main from "../layout/Main";
import { useState } from "react";

function Modules() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        module_name: "",
        status: "",
    });

    const handleChange =(e)=>{
        setFormData({
            ...formData,
            [e.formData.name]:e.formData.value
        });
    }

    const handleAddModule = () => {
        setShowModal(true);
    }

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Module List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddModule}>
                                Add Module
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <>
                    <div className="modal fade show" style={{ dispaly: "block", zIndex: 1050 }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Module</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <form action="">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12 form-group my-2">
                                                <label htmlFor="module_name">Module</label>
                                                <input type="text" name="module_name" id="module_name" onChange={handleChange} value={formData.module_name} />
                                            </div>

                                            <div className="col-md-12 form-group my-2">
                                                <label htmlFor="status">Status</label>
                                                <select name="status" id="status" onChange={handleChange} value={formData.status}>
                                                    <option value="">Select status</option>
                                                </select>
                                            </div>
                                        </div>
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

export default Modules;