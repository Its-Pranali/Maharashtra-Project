import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Main from "./components/layout/Main";
import './App.css'
import './assets/style.css'
import MasterData from "./components/master/MasterData";
import District from "./components/master/District";
import Organization from "./components/master/Organization";
import Designation from "./components/master/Designation";
import TicketDetails from "./components/details/TicketDetails";
import Product from "./components/details/Product";
import Role from "./components/master/Role";
import Taluka from "./components/master/Taluka";
import Bank from "./components/master/Bank";
import Module from "./components/details/Module";
import Branch from "./components/master/Branch";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/main" element={<Main />} />
      <Route path="/master-data" element={<MasterData />} />
      <Route path="/district" element={<District />} />
      <Route path="/organization" element={<Organization />} />
      <Route path="/designation" element={<Designation />} />
      <Route path="/ticket-details" element={<TicketDetails />} />
      <Route path="/product" element={<Product />} />
      <Route path="/role" element={<Role />} />
      <Route path="/taluka" element={<Taluka />} />
      <Route path="/bank" element={<Bank />} />
      <Route path="/module" element={<Module />} />
      <Route path="/branch" element={<Branch />} />
    </Routes>
  );
}

export default App;
