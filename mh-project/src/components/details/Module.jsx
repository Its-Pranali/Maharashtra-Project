
import Main from "../layout/Main";
import { useState, useEffect } from "react";
import axios from "axios";

function Module() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [product, setProduct] = useState([]);
    const [module, setModule] = useState([]);
    const [formData, setFormData] = useState({
        product: "",
        module: "",
        regional_name: "",
    });

    const validator = () => {
        const newErrors = {};
        if (!formData.product.trim()) newErrors.product = "Product is required";
        if (!formData.module.trim()) newErrors.module = "Module is required";
        if (!formData.regional_name.trim()) newErrors.regional_name = "Regional Name is required";
        return newErrors;
    }

    const handleAddModule = () => {
        setShowModal(true);
    }

    const fetchProduct = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/products");
            setProduct(res.data);
        }
        catch (error) {
            console.error("Failed to fetch data", error);
        }
    }
    const fetchModule = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/module");
            setModule(res.data.message);
        }
        catch (error) {
            console.error("Failed to fetch data", error);
        }
    }

    useEffect(() => {
        fetchProduct();
        fetchModule();
    }, []);


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
            const res = await axios.post("http://127.0.0.1:8000/api/module/save", formData);
            alert("Module saved Successfully");
            console.log(res.data.message);
            fetchModule();
        }
        catch (error) {
            console.error("Error While sabe the data", error);
            alert("failed to add data");
        }

    }

    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="card py-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="card-title fw-bold fs-5">Bank List</div>
                            <button className="btn btn-sm btn-primary" onClick={handleAddModule} >
                                Add Module
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="card py-3">
                        <div className="table-responsive">
                            <table className="table table-bordered table-striped table-hover table-sm">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>Product</th>
                                        <th>Module</th>
                                        <th>Regional Type</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {module.map((test, index) =>
                                        <tr key={index}>
                                            <td>{test.id}</td>
                                            <td>{test.product}</td>
                                            <td>{test.module}</td>
                                            <td>{test.regional_name}</td>
                                            <td></td>
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
                                    <h5 className="modal-title">Add Module</h5>
                                    <button type="button" onClick={() => setShowModal(false)} className="btn-close"></button>
                                </div>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12 form-group my-2">
                                                <label htmlFor="product" className="form-label">Product</label>
                                                <select name="product" id="product" onChange={handleChange} value={formData.product} className={`form-control ${errors.product ? "is-invalid" : ""}`}>
                                                    <option value="">Select Product</option>
                                                    {product.map((test, index) =>
                                                        <option key={index} value={test.product}>{test.product}</option>
                                                    )}
                                                </select>
                                                {errors.product && (
                                                    <div className="text-danger small">{errors.product}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12 form-group my-2">
                                                <label htmlFor="module" className="form-label">Module</label>
                                                <input type="text" name="module" id="module" onChange={handleChange} value={formData.module} className={`form-control ${errors.module ? "is-invalid" : ""}`} />
                                                {errors.module && (
                                                    <div className="text-danger small">{errors.module}</div>
                                                )}
                                            </div>

                                            <div className="col-md-12 form-group my-2">
                                                <label htmlFor="regional_name" className="form-label">Regional Name</label>
                                                <input type="text" name="regional_name" id="regional_name" onChange={handleChange} value={formData.regional_name} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                                                {errors.regional_name && (
                                                    <div className="text-danger small">{errors.regional_name}</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-muted border" onClick={() => setShowModal(false)}>Cancel</button>
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

export default Module;