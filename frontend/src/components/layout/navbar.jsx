"use client"; 
import Link from "next/link";
import NavLinks from "./navbar-links";
import { useAuth } from "../auth-provider";
import { ThemeToggleButton } from "../theme-toggle-button";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
  const auth = useAuth();

  return (
    <nav className="sticky top-0 w-full px-6 py-4 bg-background shadow-md flex justify-between items-center">
      {/* Left side of the navbar */}
      <div className="flex items-center gap-6">
        <ThemeToggleButton />
        <Link href="/" className="hover:text-primary">Home</Link>
      </div>

      {/* Right side of the navbar */}
      <div className="flex items-center gap-4">
        {
          auth.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        {
          NavLinks.map((navLinkItem, index) => {
            const shouldDisplay = auth.isAuthenticated && navLinkItem.authRequired || !auth.isAuthenticated && !navLinkItem.authRequired;
            return !shouldDisplay ? null : (
              <Button variant={navLinkItem.variant} className={navLinkItem.className} key={index}>
                <Link href={navLinkItem.href} className="flex items-center gap-2 ">
                  {navLinkItem.icon? navLinkItem.icon : null}
                  {navLinkItem.label? navLinkItem.label : null}
                </Link>
              </Button>
            );
          })
        }
      </div>
    </nav>
  );
}