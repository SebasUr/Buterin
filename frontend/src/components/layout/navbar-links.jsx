import { ShoppingCart, LogIn, LogOut, User, Wallet } from "lucide-react";

const NavLinks = [
  {
    href: "/cart",
    authRequired: true,
    className: "text-primary border-border",
    variant: "outline",
    icon: <ShoppingCart className="w-5 h-5" />
  },
  {
    label: "Login",
    href: "/login",
    authRequired: false,
    className: "bg-primary text-primary-foreground",
    variant: "default",
    icon: <LogIn className="w-5 h-5" />
  },
  {
    label: "Logout",
    href: "/logout",
    authRequired: true,
    className: "bg-primary text-primary-foreground",
    variant: "default",
    icon: <LogOut className="w-5 h-5" />
  },
]

export default NavLinks;