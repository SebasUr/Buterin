"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import NavLinks from "./navbar-links"
import { useAuth } from "../auth-provider"
import { ThemeToggleButton } from "../theme-toggle-button"
import { Button } from "@/components/ui/button"
import { User, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NavBar() {
  const auth = useAuth()
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Handle responsive behavior on the client side only
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <nav className="sticky top-0 w-full px-6 py-4 bg-background shadow-md flex justify-between items-center z-50">
      {/* Left side of the navbar */}
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          {/* Logo for light mode */}
          <Image
            src="/images/buterin-logo.png"
            alt="Buterin Logo"
            width={200}
            height={80}
            className="h-8 w-auto dark:hidden"
          />
          {/* Logo for dark mode - you can use the same logo or a light version */}
          <Image
            src="/images/buterin-logo-dark.png"
            alt="Buterin Logo"
            width={200}
            height={80}
            className="h-8 w-auto hidden dark:block"
          />
        </Link>
        <ThemeToggleButton />
        <div className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
        </div>
      </div>

      {/* Right side of the navbar */}
      <div className="flex items-center gap-4">
        {auth.isAuthenticated && (
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
        )}
        {NavLinks.map((navLinkItem, index) => {
          // Only show buttons on mobile for login/logout/cart
          const isMobileVisible =
            navLinkItem.href === "/login" || navLinkItem.href === "/logout" || navLinkItem.href === "/cart"
          const shouldDisplay =
            (auth.isAuthenticated && navLinkItem.authRequired) || (!auth.isAuthenticated && !navLinkItem.authRequired)

          // Don't render nav items that shouldn't be displayed
          // For mobile, only show specific items
          if (!shouldDisplay || (isMobile && !isMobileVisible)) {
            return null
          }

          return (
            <Button variant={navLinkItem.variant} className={navLinkItem.className} key={index}>
              <Link href={navLinkItem.href} className="flex items-center gap-2 ">
                {navLinkItem.icon ? navLinkItem.icon : null}
                {navLinkItem.label ? navLinkItem.label : null}
              </Link>
            </Button>
          )
        })}

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-2 md:hidden">
          <Link href="/" className="p-2 hover:bg-accent rounded-md">
            Home
          </Link>
          <Link href="/wallet-explorer" className="p-2 hover:bg-accent rounded-md">
            Wallet Explorer
          </Link>
          <Link href="/explore" className="p-2 hover:bg-accent rounded-md">
            Explore
          </Link>
        </div>
      )}
    </nav>
  )
}

