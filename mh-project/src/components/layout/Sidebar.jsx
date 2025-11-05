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
  const [openDropdown, setOpenDropdown] = useState(null); // tracks which dropdown is open

  const handleToggle = (menu) => {
    setOpenDropdown((prev) => (prev === menu ? null : menu)); // toggle open/close
  };

  return (
    <aside
      className="bg-white border-end vh-100 position-fixed top-0 start-0 d-flex flex-column overflow-y-scroll"
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

        {/* Master Data */}
        <li className="mb-2">
          <div
            className={`d-flex align-items-center p-2 rounded sidebar-item ${
              openDropdown === "master" ? "bg-primary text-white" : "text-dark"
            }`}
            style={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onClick={() => handleToggle("master")}
          >
            <FaDatabase className="fs-5" />
            {!isCollapsed && (
              <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                Master Data
                {openDropdown === "master" ? (
                  <FaChevronDown className="small" />
                ) : (
                  <FaChevronRight className="small" />
                )}
              </span>
            )}
          </div>

          {!isCollapsed && openDropdown === "master" && (
            <ul
              className="list-unstyled mt-1 rounded py-1"
              style={{ backgroundColor: "#0d6efd3d" }}
            >
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/district" className="text-decoration-none text-dark">
                  District
                </Link>
              </li>
               <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/role" className="text-decoration-none text-dark">
                  Role
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/taluka" className="text-decoration-none text-dark">
                  Taluka
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/village" className="text-decoration-none text-dark">
                  Village
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/bank" className="text-decoration-none text-dark">
                  Bank
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/branch" className="text-decoration-none text-dark">
                  Branch
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/organization"
                  className="text-decoration-none text-dark"
                >
                  Organization
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/designation"
                  className="text-decoration-none text-dark"
                >
                  Designation
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Ticket Details */}
        <li className="mb-2">
          <div
            className={`d-flex align-items-center p-2 rounded sidebar-item ${
              openDropdown === "ticket" ? "bg-primary text-white" : "text-dark"
            }`}
            style={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onClick={() => handleToggle("ticket")}
          >
            <FaTicketAlt className="fs-5" />
            {!isCollapsed && (
              <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                Ticket Details
                {openDropdown === "ticket" ? (
                  <FaChevronDown className="small" />
                ) : (
                  <FaChevronRight className="small" />
                )}
              </span>
            )}
          </div>

          {!isCollapsed && openDropdown === "ticket" && (
            <ul
              className="list-unstyled mt-1 rounded py-1"
              style={{ backgroundColor: "#0d6efd3d" }}
            >
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/product" className="text-decoration-none text-dark">
                  Product
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/module" className="text-decoration-none text-dark">
                  Module
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link to="/task" className="text-decoration-none text-dark">
                  Task
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/open-ticket"
                  className="text-decoration-none text-dark"
                >
                  Open Ticket
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/inprogress-ticket"
                  className="text-decoration-none text-dark"
                >
                  Inprogress Ticket
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/closed-ticket"
                  className="text-decoration-none text-dark"
                >
                  Closed Ticket
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/forwarded-ticket"
                  className="text-decoration-none text-dark"
                >
                  Forwarded Ticket
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/all-tickets"
                  className="text-decoration-none text-dark"
                >
                  All Tickets
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Ticket Reports */}
        <li className="mb-2">
          <div
            className={`d-flex align-items-center p-2 rounded sidebar-item ${
              openDropdown === "reports" ? "bg-primary text-white" : "text-dark"
            }`}
            style={{
              cursor: "pointer",
              transition: "background-color 0.3s, color 0.3s",
            }}
            onClick={() => handleToggle("reports")}
          >
            <FaChartBar className="fs-5" />
            {!isCollapsed && (
              <span className="ms-2 d-flex justify-content-between align-items-center w-100">
                Ticket Reports
                {openDropdown === "reports" ? (
                  <FaChevronDown className="small" />
                ) : (
                  <FaChevronRight className="small" />
                )}
              </span>
            )}
          </div>

          {!isCollapsed && openDropdown === "reports" && (
            <ul
              className="list-unstyled mt-1 rounded py-1"
              style={{ backgroundColor: "#0d6efd3d" }}
            >
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/district-report"
                  className="text-decoration-none text-dark"
                >
                  District Wise Reports
                </Link>
              </li>
              <li className="py-2 ps-4 m-1 rounded hover-bg">
                <Link
                  to="/product-report"
                  className="text-decoration-none text-dark"
                >
                  Product Wise Reports
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
