import { ToastContainer } from "react-toastify";
import AdminLogin from "../components/Admin/AdminLogin";
import AdminNavigation from "../components/Admin/AdminNavigation";

export default function Admin() {
  const adminToken = localStorage.getItem("admin");

  return (
    <section className="w-full h-full flex flex-col items-center gap-8 bg-blueGrad">
      <div className="abosulte w-full h-fit top-0 right-0">
        <ToastContainer />
      </div>
      {adminToken ? <AdminNavigation /> : <AdminLogin />}
    </section>
  );
}
