import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    const validator = () => {
        const newErrors = {};
        if (!formData.email.trim())
            newErrors.email = "email is required";
        if (!formData.password.trim())
            newErrors.password = "password is required";
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
        setServerError("");
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validator();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://127.0.0.1:8000/api/login", formData);

            console.log("Login API Response:", response.data);

            if (response.data?.token) {
                localStorage.setItem("token", response.data.token);
                alert("Login Successful");
                navigate("/dashboard", { replace: true });
            } else {
                setServerError("Invalid response from server.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setServerError(
                error.response?.data?.message || "Something went wrong. Try again."
            );
        }
    };


    return (
        <div className="body-class" style={{ backgroundImage: "url('./paralex-bg.png')" }} >
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper h-100">
                    <div className="content-wrapper d-flex auth p-0 h-100">
                        <div className="row w-100 mx-0">
                            <div className="col-lg-6 m-auto">
                                <div className="row h-100 align-items-center">
                                    <div className="col-lg-8 mx-auto py-5">
                                        <div className="auth-form-light text-left py-2 px-3 px-sm-5" style={{ backgroundImage: "linear-gradient(to top, #7dbae9d9 0%, #3569911a 65%, #88b9df 100%)", borderRadius: "15px", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", }} >
                                            <div className="brand-logo text-center mb-3">
                                                <img src="./logo2-removebg-preview.png" alt="logo" style={{ maxWidth: "150px" }} />
                                            </div>

                                            <h6 className="text-center">Enter login details</h6>

                                            {serverError && (
                                                <div className="text-danger text-center small mb-2">
                                                    {serverError}
                                                </div>
                                            )}

                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-12 form-group my-2">
                                                        <input type="email" name="email" id="email" onChange={handleChange} value={formData.email} placeholder="Username" className={`form-control ${errors.email ? "is-invalid" : ""}`} />
                                                        {errors.email && (
                                                            <div className="text-danger small">
                                                                {errors.email}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="col-md-12 form-group my-2">
                                                        <input type="password" name="password" id="password" onChange={handleChange} value={formData.password} placeholder="Password" className={`form-control ${errors.password ? "is-invalid" : ""}`} />
                                                        {errors.password && (
                                                            <div className="text-danger small">
                                                                {errors.password}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="col-md-12 form-group my-2">
                                                        <button type="submit" className="btn w-100 rounded-pill signin-btn text-light py-2" >
                                                            SIGN IN
                                                        </button>
                                                    </div>

                                                    <div className="col-md-12 form-group my-2">
                                                        <div className="my-2 d-flex justify-content-between align-items-center">
                                                            <label className="form-check-label text-black">
                                                                Toll free number<br />
                                                                <a href="tel:+91 18008895351">+91 18008895351</a>
                                                            </label>
                                                            <label className="form-check-label text-black">
                                                                टोल फ्री क्रमांक<br />
                                                                <a href="tel:+91 18008895351">
                                                                    +९१ १८००८८९५३५१
                                                                </a>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
