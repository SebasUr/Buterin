import { LogIn, UserPlus } from "lucide-react";

const NavLinks = [
  {
    label: "Register",
    href: "/register",
    authRequired: false,
    className: "bg-primary text-primary-foreground",
    variant: "default",
    icon: <UserPlus className="w-5 h-5" />,
  },
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

