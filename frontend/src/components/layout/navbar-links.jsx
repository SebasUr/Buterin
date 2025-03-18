import { LogIn } from "lucide-react";

const NavLinks = [
  {
    label: "Login",
    href: "/login",
    authRequired: false,
    className: "bg-primary text-primary-foreground",
    variant: "default",
    icon: <LogIn className="w-5 h-5" />,
  },
]

export default NavLinks

