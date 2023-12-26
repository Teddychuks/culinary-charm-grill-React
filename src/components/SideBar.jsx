/* eslint-disable react/prop-types */
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import {
  HiBars3,
  HiPencil,
  HiVariable,
  HiOutlineBookOpen,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import useDetectClickOutside from "../hooks/useDetectClickOutside";
import { serverUrl } from "../services/server";

const menuItems = [
  {
    label: "Content",
    items: [
      { to: "menu", icon: HiBars3, label: "Menu" },
      { to: "orders", icon: HiPencil, label: "Orders" },
    ],
  },
  {
    label: "Business Intelligence",
    items: [
      { to: "analytics", icon: HiVariable, label: "Analytics" },
      {
        to: "api_documentation",
        icon: HiOutlineBookOpen,
        label: "Api Documentation",
      },
    ],
  },
  {
    label: "Customization",
    items: [
      {
        to: "settings",
        icon: HiOutlineWrenchScrewdriver,
        label: "User Settings",
      },
    ],
  },
];

function NavLinkItem({ item, onClick }) {
  const { to, icon: Icon, label } = item;

  return (
    <NavLink
      className={({ isActive }) =>
        `flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg ${
          isActive
            ? "bg-blue-500 text-white"
            : " hover:bg-gray-100 hover:text-gray-700"
        }`
      }
      to={to}
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span className="mx-2 text-sm font-medium">{label}</span>
    </NavLink>
  );
}

function SideBar({ open, setOpen }) {
  const sidebarRef = useRef(null);
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const transitionStyle = isSmallScreen
    ? {
        transition: "transform 500ms ease-in-out",
        transform: open ? "translateX(0)" : "translateX(-100%)",
      }
    : {};

  const handleCloseSidebar = () => {
    if (open) {
      setTimeout(() => {
        setOpen(false);
      }, 100);
    }
  };

  useDetectClickOutside(sidebarRef, handleCloseSidebar);

  return (
    <aside
      className="fixed top-0 start-0 bottom-0 z-[60] selection:flex flex-col w-64 h-screen px-5 py-8 bg-white border-r rtl:border-r-0 rtl:border-l"
      ref={sidebarRef}
      style={transitionStyle}
    >
      <a href="#">
        <img className="w-12 h-12" src={`${serverUrl}${"brand.png"}`} alt="" />
      </a>

      <div className="flex flex-col justify-between flex-1 mt-6 font">
        <nav className="-mx-3 space-y-6">
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3">
              <label className="px-3 text-xs text-gray-500 uppercase ">
                {section.label.toLowerCase()}
              </label>
              {section.items.map((item, itemIndex) => (
                <NavLinkItem
                  key={itemIndex}
                  item={item}
                  onClick={handleCloseSidebar}
                />
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default SideBar;
