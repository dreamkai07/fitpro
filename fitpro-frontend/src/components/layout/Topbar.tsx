import { Bell, Search, UserCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function Topbar() {
  const { username } = useAuth();
  const location = useLocation();

  const title = location.pathname.split('/')[1] || 'Dashboard';
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{displayTitle}</h1>
        <p className="text-slate-400 text-sm">Welcome back 👋</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="bg-slate-800 rounded-xl px-4 py-2 flex items-center gap-3">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder:text-slate-500"
          />
        </div>

        <button className="bg-slate-800 p-3 rounded-xl text-slate-300 hover:text-white transition">
          <Bell size={18} />
        </button>

        <button className="bg-green-500 text-black font-semibold rounded-xl px-4 py-2 flex gap-2 items-center hover:bg-green-600 transition shadow-lg shadow-green-500/20">
          <UserCircle2 />
          {username || "User"}
        </button>
      </div>
    </header>
  );
}