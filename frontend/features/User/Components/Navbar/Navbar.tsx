import Image from "next/image";
import { NAVBAR_LINKS } from "./navbar.constant";
import { FaPhoneAlt } from "react-icons/fa";
import { Glassmorph } from "@/lib/constant/Glassmorph";


const Navbar = () => {
    return (
        <nav className="fixed top-6 z-50 left-1/2 translate-x-[-50%] w-full max-w-[1400px]">
            <div className={`${Glassmorph} rounded-full flex items-center justify-between p-2 shadow-2xl relative`}>
                <div className="bg-white p-2 px-4 rounded-[80px]">
                    <Image src={"/logo.webp"} alt={""} width={55} height={55}></Image>
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-5 w-auto">
                    {NAVBAR_LINKS.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="relative isolate px-4 py-2 rounded-[80px] text-white flex gap-1 items-center overflow-hidden
                                after:content-[''] after:absolute after:inset-0
                                after:bg-white after:origin-center after:scale-x-0
                                after:transition-transform after:duration-400
                                after:z-0
                                hover:after:scale-x-100 hover:text-black duration-500 transition-color"
                    >
                        <span className="relative z-10 flex gap-1 items-center">
                        {link.label}
                        {link.icon}
                        </span>
                    </a>
                    ))}
                </div>

                <div className="group bg-transparent text-white rounded-[80px] px-4 py-2 flex gap-2 items-center relative overflow-hidden border-white/50 border-1 cursor-pointer">
                    {/* background animasi */}
                    <span className="
                        absolute inset-0 
                        bg-white 
                        scale-x-0 
                        group-hover:scale-x-100 
                        transition-transform 
                        duration-500 
                        ease 
                        origin-right
                        z-0
                    "></span>

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