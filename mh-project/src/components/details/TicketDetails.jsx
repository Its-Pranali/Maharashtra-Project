
import { useState } from "react";
import Main from "../layout/Main";
import { Link } from "react-router-dom";

function TicketDetails() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="col-md-3 my-2">
                        <Link to="/product">
                            <div className="card  py-4 card-light-blue">
                                <h5>Product</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Module</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Task</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Open Ticket</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Inprogress Ticket</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/organization">
                            <div className="card  py-4 card-light-blue">
                                <h5>Closed Ticket</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/designation">
                            <div className="card  py-4 card-light-blue">
                                <h5>Forwarded Ticket</h5>
                            </div>
                        </Link>
                    </div>

                     <div className="col-md-3 my-2">
                        <Link to="/designation">
                            <div className="card  py-4 card-light-blue">
                                <h5>All Tickets</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default TicketDetails;