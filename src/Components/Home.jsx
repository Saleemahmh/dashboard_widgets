import React from "react";
import Widgets from "./Widgets";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { HiOutlineBellAlert } from "react-icons/hi2";
const Home = () => {
  return (
    <>
      <nav className="bg-indigo-50 text-indigo-950 m-6 rounded-md">
        <div className="flex flex-1 items-center justify-between m-2 ">
          <ul className="flex items-center space-x-4">
            <li>Home</li>
            <li>
              <IoIosArrowForward />
            </li>
            <li className="font-semibold text-indigo-900">Dashboard V2</li>
          </ul>
          <div className="flex m-2">
            <input
              className="bg-indigo-100 border w-md rounded-md border-slate-600/40"
              placeholder="Search"
            >
            </input>
            <button><CiSearch></CiSearch></button>
          </div>
          <ul className="flex items-center space-x-4 text-indigo-900">
            <li><HiOutlineBellAlert /></li>
            <li>
              <CgProfile />
            </li>
            <li><CiSettings/></li>
          </ul>
        </div>
      </nav>

      <div>
        <Widgets></Widgets>
      </div>
    </>
  );
};

export default Home;
