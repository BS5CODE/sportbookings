import React from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineCalendarToday } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="bg-zinc-900 text-white h-screen p-5 pt-5">
      <div className="text-2xl font-semibold mb-4">Game Theory</div>
      <div className="pt-3">
        <div className="mb-2 p-2 hover:bg-slate-800 rounded-md px-4">
          <Link to="/" className=" flex items-center">
            <MdOutlineCalendarToday className="mr-2 " />
            <div>Schedule</div>
          </Link>
        </div>
        <div className="flex items-center mb-2 p-2 hover:bg-slate-800 rounded-md px-4">
          <LuLayoutDashboard className="mr-2 " />
          <div>Attendance</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
