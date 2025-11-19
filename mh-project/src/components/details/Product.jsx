import { useState, useEffect } from "react";
import Main from "../layout/Main";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // for Action buttons
import axiosInstance from "../../api/axiosConfig";

function Product() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    regional_name: "",
    priority: "",
  });

  const [errors, setErrors] = useState({});
  const [options, setOptions] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(null);

  useEffect(() => {
    const productOptions = ["Critical", "High", "Medium", "Low"];
    setOptions(productOptions);
    fetchProducts();
  }, []);



  //  Validate form before submit
  const validator = () => {
    const newErrors = {};
    if (!formData.product.trim()) newErrors.product = "Product is required";
    if (!formData.regional_name.trim())
      newErrors.regional_name = "Regional Name is required";
    if (!formData.priority.trim()) newErrors.priority = "Priority is required";
    return newErrors;
  };

  //  Open Add Modal
  const handleAddProduct = () => {
    setErrors({});
    setFormData({ product: "", regional_name: "", priority: "" });
    setShowModal(true);
  };

  //  Handle input changes
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


  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products", {
        headers: { "Content-Type": "application/json" },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validator();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEdit) {
        await axiosInstance.put(`/products/${isEdit}`, formData);
        alert("product updated successfully");
      }
      else {
        await axiosInstance.post("/products/save", formData);
        alert("product saved successfully");
      }
      handleCloseModal();
      fetchProducts();
    }
    catch (error) {
      console.error("Error while save/update Product", error);
      alert("Error");
    }
  };
  const handleEdit = (product) => {
    setFormData({
      product: product.product,
      regional_name: product.regional_name,
      priority: product.priority,
    });
    setIsEdit(product.id);
    setErrors({});
    setShowModal(true);
  }

  const handleReset = () => {
    setFormData({
      product: "",
      regional_name: "",
      priority: "",
    });
  }

  const handleCloseModal = () => {
    setShowModal(false);
    handleReset();
    setIsEdit(null);
    setErrors({});
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete product");
    if (!confirmDelete) return;
    try {
      await axiosInstance.delete(`products/${id}`);
      alert("product deleted successfully");
      fetchProducts();
    }
    catch (error) {
      console.error("Error while delete the product", error);
      alert("Error while delete the product");
    }
  }


  return (
    <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
      <div className="container-fluid px-3">
        {/* Header */}
        <div className="row">
          <div className="card py-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-title fw-bold fs-5">Product List</div>
              <button className="btn btn-sm btn-primary" onClick={handleAddProduct} >
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="row mt-2">
          <div className="card my-3">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover table-sm">
                <thead>
                  <tr className="text-center">
                    <th>Sr.No</th>
                    <th>Product</th>
                    <th>Regional Name</th>
                    <th>Priority</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((item, index) => (
                      <tr key={item.id} className="text-center">
                        <td className="text-center">{index + 1}</td>
                        <td>{item.product}</td>
                        <td>{item.regional_name}</td>
                        <td>{item.priority}</td>
                        <td className="text-center">
                          <button className="btn btn-sm btn-primary me-2" title="Edit" onClick={() => handleEdit(item)}>
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-danger" title="Delete" onClick={() => handleDelete(item.id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/*  Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm"></div>
          <div className="modal fade show" style={{ display: "block", zIndex: 1050 }} >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)} ></button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {/* Product */}
                    <div className="form-group col-md-12 my-2">
                      <label htmlFor="product" className="form-label">
                        Product
                      </label>
                      <input type="text" name="product" id="product" value={formData.product} onChange={handleChange} className={`form-control ${errors.product ? "is-invalid" : ""}`} />
                      {errors.product && (
                        <div className="invalid-feedback d-block">{errors.product}</div>
                      )}
                    </div>

                    {/* Regional Name */}
                    <div className="form-group col-md-12 my-2">
                      <label htmlFor="regional_name" className="form-label">
                        Regional Name
                      </label>
                      <input type="text" name="regional_name" id="regional_name" value={formData.regional_name} onChange={handleChange} className={`form-control ${errors.regional_name ? "is-invalid" : ""}`} />
                      {errors.regional_name && (
                        <div className="invalid-feedback d-block"> {errors.regional_name} </div>
                      )}
                    </div>

                    {/* Priority */}
                    <div className="form-group col-md-12 my-2">
                      <label htmlFor="priority" className="form-label">
                        Priority
                      </label>
                      <select name="priority" id="priority" value={formData.priority} onChange={handleChange} className={`form-control ${errors.priority ? "is-invalid" : ""}`} >
                        <option value="">Select Priority</option>
                        {options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.priority && (
                        <div className="invalid-feedback d-block">  {errors.priority} </div>
                      )}
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
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

export default Product;
