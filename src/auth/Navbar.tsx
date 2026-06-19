"use client";

import { useState } from "react";
import {
  Menu,
  X,
  BarChart3,
  LayoutGrid,
  LogOut,
  Home,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface DashboardHeaderProps {
  email?: string;
  onLogout: () => void;
}

export default function DashboardHeader({
  email,
  onLogout,
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navigate = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/dashboard")
                  ? "bg-purple-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/dashboard/categories")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/dashboard/categories")
                  ? "bg-purple-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Categories
            </button>

            <button
              onClick={() => navigate("/dashboard/analytics")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/dashboard/analytics")
                  ? "bg-purple-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Analytics
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg border border-gray-200"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* User Email */}
        {email && (
          <div className="px-4 pb-4 max-w-7xl mx-auto">
            <p className="text-sm text-gray-500">
              Logged in as{" "}
              <span className="font-medium text-gray-800">
                {email}
              </span>
            </p>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h2 className="font-bold text-lg">
                  Voting Dashboard
                </h2>

                <p className="text-xs text-gray-500">
                  Navigation Menu
                </p>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-3">
              <button
                onClick={() => navigate("/dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive("/dashboard")
                    ? "bg-purple-600 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Home size={18} />
                Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard/categories")
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive("/dashboard/categories")
                    ? "bg-purple-600 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <LayoutGrid size={18} />
                Categories
              </button>

              <button
                onClick={() =>
                  navigate("/dashboard/analytics")
                }
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive("/dashboard/analytics")
                    ? "bg-purple-600 text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <BarChart3 size={18} />
                Analytics
              </button>

              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {email && (
              <div className="absolute bottom-0 left-0 w-full border-t p-4">
                <p className="text-xs text-gray-500">
                  Logged in as
                </p>

                <p className="text-sm font-medium truncate">
                  {email}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}