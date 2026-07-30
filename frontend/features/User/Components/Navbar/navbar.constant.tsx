import { NavbarLinksProps } from "./navbar.types";
import { ChevronDown, Server, Cpu, Network, Radio } from "lucide-react";

export const NAVBAR_LINKS: NavbarLinksProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/product-and-service",
    label: "Product and Service",
    icon: <ChevronDown size={15} />,
    dropdown: [
      {
        href: "/product-and-service?tab=infra",
        label: "Infrastructure",
        icon: <Server size={15} />,
      },
      {
        href: "/product-and-service?tab=it",
        label: "Information Technology (IT)",
        icon: <Cpu size={15} />,
      },
      {
        href: "/product-and-service?tab=ict",
        label: "Information Communication (ICT)",
        icon: <Network size={15} />,
      },
      {
        href: "/product-and-service?tab=iot",
        label: "Internet of Things (IoT)",
        icon: <Radio size={15} />,
      },
    ],
  },
  {
    href: "/news",
    label: "News",
  },
  {
    href: "/about-us",
    label: "About Us",
  },
];
