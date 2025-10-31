import { Link } from "react-router-dom";
import {
    FaTachometerAlt,
    FaDatabase,
    FaTicketAlt,
    FaChartBar,
    FaChevronRight,
} from "react-icons/fa";

function Sidebar({ isCollapsed }) {
    return (
        <aside className={`bg-white border-end vh-100 position-fixed top-0 start-0 d-flex flex-column`} style={{
            width: isCollapsed ? "80px" : "250px", transition: "width 0.3s ease", zIndex: 998,
        }}>
            <h6 className="text-center mt-4">Admin</h6>
            <ul className="list-unstyled mt-3 px-2">
                <li className="mb-2">
                    <Link to="/dashboard" className="d-flex align-items-center text-dark text-decoration-none p-2 rounded" style={{ backgroundColor: "#eaf0ff" }} >
                        <FaTachometerAlt className="fs-5" />
                        {!isCollapsed && <span className="ms-2">Dashboard</span>}
                    </Link>
                </li>

                <li className="mb-2">
                    <div className="d-flex align-items-center text-dark p-2 rounded">
                        <FaDatabase className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between w-100">
                                Master Data <FaChevronRight className="small" />
                            </span>
                        )}
                    </div>
                </li>

                <li className="mb-2">
                    <div className="d-flex align-items-center text-dark p-2 rounded">
                        <FaTicketAlt className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between w-100">
                                Ticket Details <FaChevronRight className="small" />
                            </span>
                        )}
                    </div>
                </li>

                <li className="mb-2">
                    <div className="d-flex align-items-center text-dark p-2 rounded">
                        <FaChartBar className="fs-5" />
                        {!isCollapsed && (
                            <span className="ms-2 d-flex justify-content-between w-100">
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
