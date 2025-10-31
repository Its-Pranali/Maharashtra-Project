
import { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../layout/Main";

function MasterData() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed((prev) => !prev);
    return (
        <Main isCollapsed={isCollapsed} toggleSidebar={toggleSidebar}>
            <div className="container-fluid px-3">
                <div className="row">
                    <div className="col-md-3 my-2">
                        <Link to="/district">
                            <div className="card  py-4 card-light-blue">
                                <h5>District</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Taluka</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Village</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Bank</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Branch</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/organization">
                            <div className="card  py-4 card-light-blue">
                                <h5>Organization</h5>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-3 my-2">
                        <Link to="/master-data">
                            <div className="card  py-4 card-light-blue">
                                <h5>Designation</h5>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Main>
    );
}

export default MasterData;