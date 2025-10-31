import { Link } from "react-router-dom";
import {
    FaTachometerAlt,
    FaDatabase,
    FaTicketAlt,
    FaChartBar,
    FaChevronRight,
    FaChevronDown,
} from "react-icons/fa";
import { useState } from "react";

function Sidebar({ isCollapsed }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

    return (
        <aside
            className="bg-white border-end vh-100 position-fixed top-0 start-0 d-flex flex-column"
            style={{
                width: isCollapsed ? "80px" : "250px",
                transition: "width 0.3s ease",
                zIndex: 998,
            }}
        >
            {/* Sidebar Header */}
            <h6 className="text-center mt-4">Admin</h6>

            {/* Menu List */}
            <ul className="list-unstyled mt-3 px-2">
                {/* Dashboard */}
                <li className="mb-2">
                    <Link
                        to="/dashboard"
                        className="d-flex align-items-center text-dark text-decoration-none p-2 rounded"
                        style={{ backgroundColor: "#eaf0ff" }}
                    >
                        <FaTachometerAlt className="fs-5" />
                        {!isCollapsed && <span className="ms-2">Dashboard</span>}
                    </Link>
                </li>

                {/* Master Data with Dropdown */}
                <li className="mb-2">
                    <div
                        className={`d-flex align-items-center p-2 rounded sidebar-item ${isDropdownOpen ? "bg-primary text-white" : "text-dark"
                            }`}
                        style={{
                            cursor: "pointer",
                            transition: "background-color 0.3s, color 0.3s",
                        }}
                        onClick={toggleDropdown}
                    >
                        <FaDatabase className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                                Master Data{" "}
                                {isDropdownOpen ? (
                                    <FaChevronDown className="small" />
                                ) : (
                                    <FaChevronRight className="small" />
                                )}
                            </span>
                        )}
                    </div>

                    {/* Dropdown Menu */}
                    {!isCollapsed && isDropdownOpen && (
                        <ul className="list-unstyled mt-1 rounded py-1" style={{
                            backgroundColor: isDropdownOpen ? "#0d6efd3d" : "transparent"
                        }}>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/district" className="text-decoration-none text-dark">
                                    District
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/states" className="text-decoration-none text-dark">
                                    Taluka
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/states" className="text-decoration-none text-dark">
                                    Village
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/states" className="text-decoration-none text-dark">
                                    Bank
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/states" className="text-decoration-none text-dark">
                                    Branch
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/organization" className="text-decoration-none text-dark">
                                    Organization
                                </Link>
                            </li>
                            <li className="py-2 ps-4 m-1 rounded hover-bg">
                                <Link to="/designation" className="text-decoration-none text-dark">
                                    Designation
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>

                {/* Ticket Details */}
                <li className="mb-2">
                    <div className="d-flex align-items-center text-dark p-2 rounded">
                        <FaTicketAlt className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                                Ticket Details <FaChevronRight className="small" />
                            </span>
                        )}
                    </div>
                </li>

                {/* Ticket Reports */}
                <li className="mb-2">
                    <div className="d-flex align-items-center text-dark p-2 rounded">
                        <FaChartBar className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                                Ticket Reports <FaChevronRight className="small" />
                            </span>
                        )}
                    </div>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;
