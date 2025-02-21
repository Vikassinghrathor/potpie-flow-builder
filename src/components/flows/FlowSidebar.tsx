import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import profile from "../../assets/profile.svg";
import { Menu, History, Layers, FileCode } from "lucide-react";

export const FlowSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-16 flex-col bg-[#363636] py-4 hidden sm:flex">
      {/* Logo Section */}
      <div className="flex flex-col items-center gap-6 mt-0.5">
        <Link to="/">
          <img src={logo} alt="logo" className="w-8 h-8" />
        </Link>
        <Link
          to="#"
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <Menu className="w-6 h-6 text-[#FFFFFF]" />
        </Link>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-4 mt-6">
        <Link
          to="#"
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <History className="w-6 h-6 text-[#FFFFFF]" />
        </Link>
        <Link
          to="#"
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <Layers className="w-6 h-6 text-[#FFFFFF]" />
        </Link>
        <Link
          to="#"
          className="p-2 rounded hover:bg-gray-700 transition-colors"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/ddf789af42b44eaea963851b07583965/fd429ffca8e797f5e80a4540736a44b5d016dcdef6fc3ba570ab72f8f50dacf8?placeholderIfAbsent=true"
            className="w-6 h-6 text-[#FFFFFF]"
            alt="github icon"
          />
        </Link>
      </div>

      {/* Profile Section */}
      <div className="mt-auto flex justify-center">
        <Link to="#">
          <img src={profile} alt="Profile" className="w-8 h-8 rounded-full" />
        </Link>
      </div>
    </aside>
  );
};

export default FlowSidebar;
