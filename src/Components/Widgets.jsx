import React, { useState, useEffect } from "react";
import ChartRenderer from "./ChartRenderer";
import { GoPlus } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import { CiMenuKebab } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosTime } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import dashboarddata from "../data.json";
const Widgets = () => {
  const [widgetsById, setWidgetsById] = useState(dashboarddata.widgetsbyId);
  const [categories, setCategories] = useState(dashboarddata.categories);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [creatingForCategory, setCreatingForCategory] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const [newWidgetData, setNewWidgetData] = useState({
    name: "",
    chartType: "pie",
    chartData: [],
  });

  const removeWidget = (categoryId, widgetId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter((id) => id !== widgetId) }
          : cat
      )
    );
  };

  const addWidget = (categoryId, widgetId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widgetId] }
          : cat
      )
    );
  };
  //add new widget to category

  
  const handleCreateWidget = (categoryId) => {
    const newId = `widget-${Object.keys(widgetsById).length + 1}`;

    const newWidget = {
      id: newId,
      name: newWidgetData.name,
      chartType: newWidgetData.chartType,
      chartData: newWidgetData.chartData.length
        ? newWidgetData.chartData
        : [{ name: "Sample", value: 100 }],
    };

    setWidgetsById((prev) => ({
      ...prev,
      [newId]: newWidget,
    }));
    console.log("widgetsById", JSON.stringify(widgetsById, null, 2));

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              widgets: [...cat.widgets, newId],
              allWidgets: [...(cat.allWidgets || []), newId],
            }
          : cat
      )
    );

    // Reset form
    setNewWidgetData({ name: "", chartType: "pie", chartData: [] });
    setCreatingForCategory(categoryId);
  };
  useEffect(() => {
    console.log("Updated widgetsById:", widgetsById);
    console.log("Updated categories:", categories);
  }, [widgetsById, categories]);

  return (
    <>
      <div className=" flex flex-1 items-center justify-between m-8 text-indigo-950">
        <h3 className="text-xl font-semibold">CNAPP Dashboard</h3>
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => setDrawerOpen(true)}
            className="bg-indigo-100 flex items-center gap-x-2 border rounded-md border-slate-600/40 p-2 cursor-pointer"
          >
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
        {categories.map((category) => (
          <div key={category.id} className="bg-indigo-100 rounded-md">
            <h2 className="font-bold m-2">{category.name}</h2>
            <div className="grid grid-cols-3 gap-4">
              {category.widgets.map((widgetId) => {
                const widget = widgetsById[widgetId];
                return (
                  <div
                    key={widget.id}
                    className="relative rounded-md m-6 p-5 font-semibold border border-indigo-400/50 bg-indigo-50"
                  >
                    {widget.name}
                    <button onClick={() => removeWidget(category.id, widgetId)}>
                      <CgClose className="absolute top-2 right-2 cursor-pointer hover:text-indigo-500" />
                    </button>
                    <ChartRenderer
                      type={widget.chartType}
                      data={widget.chartData}
                    />
                  </div>
                );
              })}
              {category.widgets.length < 3 && (
                <div className="flex items-center justify-center  m-6 p-5 rounded-md border border-indigo-400/50 bg-indigo-50 h-90">
                  <button
                    className="bg-indigo-100 gap-x-2 p-2 absolute flex items-center cursor-pointer hover:bg-indigo-300 hover:text-indigo-900 border rounded-md border-slate-600/40"
                    onClick={() => setDrawerOpen(true)}
                  >
                    Add widgets <GoPlus className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-indigo-50 border border-indigo-500/60 rounded-md z-50 overflow-y-auto shadow-2xl transform transition-transform duration-300  ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {categories.map((category) => (
          <div key={category.id} className="m-6">
            <div className="flex justify-between items-center font-semibold text-indigo-900 text-lg">
              <span>{category.name}</span>
              <button
                onClick={() => {
                  setCreatingForCategory(category.id);
                  setOpen(true);
                }}
                className="px-3 py-1 rounded-lg bg-indigo-800 text-white text-sm"
              >
                New Widget
              </button>
            </div>

            {/*  <div className="flex justify-between items-center  font-semibold text-indigo-900 text-lg">
      <div>{category.name}  <button className="px-3 py-1 rounded-lg bg-indigo-800 text-white text-sm">New Widget</button></div> 
    </div> */}

            <div className="mb-3">
              <h4 className="text-sm font-medium text-gray-600 mb-1">
                Assigned Widgets
              </h4>
              {category.widgets.length > 0 ? (
                category.widgets.map((widgetId) => {
                  const widget = widgetsById[widgetId];
                  return (
                    <div
                      key={widgetId}
                      className="flex justify-between items-center font-semibold text-slate-700 border-b pb-1"
                    >
                      <span>{widget.name}</span>
                      <button
                        onClick={() => removeWidget(category.id, widgetId)}
                        className="px-3 py-1 rounded-lg bg-slate-600 text-white text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">No widgets assigned</p>
              )}
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-1">
                Available Widgets
              </h4>
              {category.allWidgets ? (
                category.allWidgets
                  .filter((widgetId) => !category.widgets.includes(widgetId))
                  .map((widgetId) => {
                    const widget = widgetsById[widgetId];
                    return (
                      <div
                        key={widgetId}
                        className="flex justify-between items-center font-semibold border-b pb-1 text-indigo-900"
                      >
                        <span>{widget.name}</span>
                        <button
                          onClick={() => addWidget(category.id, widgetId)}
                          className="px-3 py-1 rounded-lg bg-indigo-800 text-white text-sm"
                        >
                          Add
                        </button>
                      </div>
                    );
                  })
              ) : (
                <p className="text-gray-500 text-sm">No available widgets</p>
              )}
            </div>
          </div>
        ))}
        {/* Modal */}
        {isOpen && creatingForCategory && (
          <div className="fixed inset-0 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
            <div className="w-[300px] flex flex-col bg-indigo-200 rounded-md border border-slate-400/60">
              <button>
                <CgClose
                  onClick={() => setOpen(false)}
                  className="place-self-end cursor-pointer hover:text-indigo-500"
                />
              </button>

              <div className="p-1 px-5">New widget {creatingForCategory} </div>

              <div className="p-6 border border-slate-400/60 rounded">
                <input
                  type="text"
                  value={newWidgetData.name}
                  onChange={(e) =>
                    setNewWidgetData({
                      ...newWidgetData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Widget Name"
                  className="border  border-slate-400/60 p-1 mb-2 w-full"
                />
                <select
                  value={newWidgetData.chartType}
                  onChange={(e) =>
                    setNewWidgetData({
                      ...newWidgetData,
                      chartType: e.target.value,
                    })
                  }
                  className="border border-slate-400/60 p-1 mb-2 w-full"
                >
                  <option value="">Select Type</option>
                  <option value="bar">Bar Chart</option>
                  <option value="line">Line Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
                <button
                  onClick={() => handleCreateWidget(creatingForCategory)}
                  className="px-3 py-1 bg-indigo-800 text-white rounded"
                >
                  Save Widget
                </button>
                <button
                  onClick={() => setCreatingForCategory(null)}
                  className="ml-2 px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div
          onClick={() => setDrawerOpen(false)}
          className="fixed inset-0 bg-opacity-40 z-40"
        />
      )}
    </>
  );
};

export default Widgets;
