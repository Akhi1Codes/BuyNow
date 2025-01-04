import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar.jsx";
import Navbar from "../components/admin/Navbar.jsx";
import { SidebarProvider } from "../context/SidebarContext.jsx";
const AdminRoot = () => {
    return (
        <SidebarProvider>
        <div className="flex">
          <Sidebar />
            <div className="w-full">
                <Navbar/>
                <Outlet />
            </div>
        </div>
        </SidebarProvider>
    );
  };
export default AdminRoot;
