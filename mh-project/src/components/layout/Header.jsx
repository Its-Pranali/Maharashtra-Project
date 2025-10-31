import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {
    const [langOpen, setLangOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); // redirect to login
    };
    return (
        <header
            className="d-flex align-items-center justify-content-between px-4 shadow-sm top-0 w-100 bg-white"
            style={{ height: "60px", zIndex: 999 }}
        >
            <div className="d-flex align-items-center gap-3">
                <button className="btn btn-link text-dark fs-4 p-0" onClick={toggleSidebar} style={{ border: "none", background: "none",}} >
                    <FaBars />
                </button>

            </div>
            <div className="d-flex align-items-center gap-3">
                {/* Language Dropdown */}
                <div className="dropdown position-relative" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)} >
                    <button className="btn btn-sm dropdown-toggle">Language</button>
                    {langOpen && (
                        <div className="dropdown-menu show position-absolute">
                            <a className="dropdown-item" href="http://tickets.vidyaonlineservices.in/mh/setLanguage/mr">
                                தமிழ்
                            </a>
                            <a className="dropdown-item" href="http://tickets.vidyaonlineservices.in/mh/setLanguage/en" >
                                English
                            </a>
                        </div>
                    )}
                </div>

                {/* Admin Dropdown */}
                <div className="dropdown position-relative" onMouseEnter={() => setAdminOpen(true)} onMouseLeave={() => setAdminOpen(false)} >
                    <button className="btn btn-sm dropdown-toggle">Admin</button>
                    {adminOpen && (
                        <div className="dropdown-menu show position-absolute end-0">
                            <Link className="dropdown-item" to="/profile">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="dropdown-item text-danger">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>


        </header>
    );
}

export default Header;
