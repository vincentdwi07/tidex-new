"use client";

import Image from "next/image";
import { useState } from "react";
import { NAVBAR_LINKS } from "./navbar.constant";
import { FaPhoneAlt } from "react-icons/fa";
import { Glassmorph } from "@/lib/constant/Glassmorph";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="fixed top-6 z-50 left-1/2 translate-x-[-50%] w-full max-w-[1400px] px-4 xl:px-0">
      <div
        className={`${Glassmorph} rounded-full flex items-center justify-between p-2 shadow-2xl relative`}
      >
        <div className="bg-white p-2 px-4 rounded-[80px]">
          <Image src={"/logo.webp"} alt={""} width={55} height={55} />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5 w-auto">
          {NAVBAR_LINKS.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() =>
                link.dropdown ? setOpenDropdown(link.href) : null
              }
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {/* Nav item */}
              <a
                href={link.href}
                className="relative isolate px-4 py-2 rounded-[80px] text-white flex gap-1 items-center overflow-hidden
                  after:content-[''] after:absolute after:inset-0
                  after:bg-white after:origin-center after:scale-x-0
                  after:transition-transform after:duration-400
                  after:z-0
                  hover:after:scale-x-100 hover:text-black duration-500 transition-colors"
              >
                <span className="relative z-10 flex gap-1 items-center">
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  )}
                  {!link.dropdown && link.icon}
                </span>
              </a>

              {/* Dropdown */}
              {link.dropdown && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                    openDropdown === link.href
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="bg-black rounded-2xl overflow-hidden min-w-[260px] border border-white/10 shadow-2xl">
                    {link.dropdown.map((item, idx) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 text-sm ${
                          idx !== link.dropdown!.length - 1
                            ? "border-b border-white/10"
                            : ""
                        }`}
                      >
                        <span className="text-red-400 shrink-0">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="group bg-transparent text-white rounded-[80px] px-4 py-2 flex gap-2 items-center relative overflow-hidden border-white/50 border cursor-pointer">
          {/* background animasi */}
          <span
            className="
              absolute inset-0 
              bg-white 
              scale-x-0 
              group-hover:scale-x-100 
              transition-transform 
              duration-500 
              ease 
              origin-right
              z-0
            "
          />

          {/* content */}
          <FaPhoneAlt className="relative z-10 text-white group-hover:text-black transition-all duration-500 ease" />
          <button className="relative z-10 rounded-[80px] text-white group-hover:text-black transition-all duration-500 ease">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
