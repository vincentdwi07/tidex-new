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
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {NAVBAR_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="px-4 py-2 rounded-[80px] text-white">{link.label}</a>
                    ))}
                </div>
                <div className="bg-white rounded-[80px] px-4 py-2 flex gap-2 items-center">
                    <FaPhoneAlt/>
                    <button className="rounded-[80px] text-black">Contact Us</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;