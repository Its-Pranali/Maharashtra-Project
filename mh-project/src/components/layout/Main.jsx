import Header from "./Header";
import Sidebar from "./Sidebar";

function Main({ isCollapsed, toggleSidebar, children }) {
  return (
    <div className="d-flex">
      <Sidebar isCollapsed={isCollapsed} />
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isCollapsed ? "80px" : "250px",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 mt-2" >{children}</main>
      </div>
    </div>
  );
}

export default Main;
