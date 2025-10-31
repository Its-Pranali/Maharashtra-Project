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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/main" element={<Main />} />
      <Route path="/master-data" element={<MasterData />} />
      <Route path="/district" element={<District />} />
      <Route path="/organization" element={<Organization />} />
    </Routes>
  );
}

export default App;
