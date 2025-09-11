import React, { useState } from "react";
import ChartRenderer from "./ChartRenderer";
import { GoPlus } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosTime } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import dashboarddata from "../data.json";
const Widgets = () => {
    const [dashboard,setDashboard] = useState()

  return (
    <>
      <div className=" flex flex-1 items-center justify-between m-8 text-indigo-950">
        <h3 className="text-xl font-semibold">CNAPP Dashboard</h3>
        <div className="flex items-center justify-end gap-2">
          <button onClick={()=>addWidget(category.id)} className="bg-indigo-100 flex items-center gap-x-2 border rounded-md border-slate-600/40 p-2 cursor-pointer">
            Add widgets <GoPlus className="text-xl" />
          </button>
          <button className="bg-indigo-100  border rounded-md border-slate-600/40 p-3 cursor-pointer">
            <TfiReload />
          </button>
          <button className="bg-indigo-100  border rounded-md border-slate-600/40 p-3 cursor-pointer">
            <CiMenuKebab />
          </button>
          <button className="bg-indigo-100 flex items-center gap-x-3 border-2 rounded-md border-slate-900/60 p-2 font-semibold cursor-pointer">
            <IoIosTime /> Last 2 days <IoIosArrowDown className="text-xl" />
          </button>
        </div>
      </div>
      <div className="m-12">
        {dashboarddata.categories.map((category) => (
          <div key={category.id} className="bg-indigo-100 rounded-md">
            <h2 className="font-bold m-2">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {category.widgets.map((widget) => (
                <>
                  <div
                    key={widget.id}
                    className="relative rounded-md m-6 p-5 font-semibold border border-indigo-400/50 bg-indigo-50"
                  >
                    {widget.name}<button onClick={()=>removeWidget(category.id,widget.id)}><CgClose className="absolute top-2 right-2 cursor-pointer hover:text-indigo-500" /></button> 
                    <ChartRenderer
                      type={widget.chartType}
                      data={widget.chartData}
                    />
                    {/* {widget.chartData.map((data) => (
                      <div>
                        {data.name}
                        {data.value}
                      </div>
                    ))} */}
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Widgets;
