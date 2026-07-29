import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Dumbbell,
  Salad,
  Target,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Workout",
    icon: Dumbbell,
    path: "/workout",
  },
  {
    title: "Diet",
    icon: Salad,
    path: "/diet",
  },
  {
    title: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-950 border-r border-slate-800">
      <div className="p-8 text-3xl font-bold text-green-400">FitPro</div>
      <nav className="flex flex-col gap-2 px-4">
        {menu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition shadow-lg shadow-red-500/20"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}