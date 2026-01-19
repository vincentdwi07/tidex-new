import { NavbarLinksProps } from "./navbar.types";
import { ChevronDown } from "lucide-react";

export const NAVBAR_LINKS : NavbarLinksProps[] = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/about",
        label: "Product and Service",
        icon: <ChevronDown size={15}/>
    },
    {
        href: "/contact",
        label: "News"
    },
    {
        href: "/about-us",
        label: "About Us"
    }
]