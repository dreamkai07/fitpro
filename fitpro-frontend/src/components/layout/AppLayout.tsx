import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="p-8 flex-1">

          <Outlet />

        </main>

      </div>

    </div>
  );
}