

import { useState } from "react";
import Main from "./layout/Main";
import { Link } from "react-router-dom";

function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
      <div className="container-fluid px-3">
        <div className="row">
          <div className="col-md-3">
            <Link to="/master-data">
              <div className="card  py-4 card-light-blue">
                <h5>Master Data</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/ticket-details">
              <div className="card  py-4 card-light-blue">
                <h5>Ticket Details</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-3">
            <Link to="/master-data">
              <div className="card  py-4 card-light-blue">
                <h5>Inprogress Ticket</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Dashboard;
