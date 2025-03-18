"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import NavLinks from "./navbar-links"
import { useAuth } from "../auth-provider"
import { ThemeToggleButton } from "../theme-toggle-button"
import { Button } from "@/components/ui/button"
import { User, Menu, LogOut, ShoppingCart, Search, Wallet } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function NavBar() {
  const auth = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }} // Empieza invisible y más arriba
      animate={{ opacity: 1, y: 0 }} // Aparece y baja a su posición
      transition={{ duration: 0.6, ease: "easeOut" }} // Duración y suavidad de la animación
      className={`sticky top-0 w-full px-6 py-4 bg-background transition-shadow z-50
        ${scrolled ? "shadow-lg" : "shadow-md"}
      `}
    >
      <div className="flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/buterin-logo.png"
              alt="Buterin Logo"
              width={200}
              height={80}
              className="h-8 w-auto dark:hidden transition-opacity hover:opacity-80"
            />
            <Image
              src="/images/buterin-logo-dark.png"
              alt="Buterin Logo"
              width={200}
              height={80}
              className="h-8 w-auto hidden dark:block transition-opacity hover:opacity-80"
            />
          </Link>
          <ThemeToggleButton />
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className="hover:text-primary hover:scale-107 transition-transform">
              Home
            </Link>
          </div>
        </div>

      {/* Right side of the navbar */}
      <div className="flex items-center gap-4">
        <Button variant="outline" className="text-primary border-border">
          <Link href="/explore" className="flex items-center gap-2 ">
            <Search className="w-5 h-5" />
            Explore
          </Link>
        </Button>
        <Button variant="outline" className="text-primary border-border">
          <Link href="/wallet-explorer" className="flex items-center gap-2 ">
            <Wallet className="w-5 h-5" />
            Wallet Explorer
          </Link>
        </Button>
        {
          auth.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger >
                <User className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel><strong>{auth.username ? auth.username : "My Account"}</strong></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={(e) => router.push("/cart")}>
                  <ShoppingCart className="w-5 h-5" />Shopping cart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => router.push("/logout")}>
                  <LogOut className="w-5 h-5" />Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }
        {
          NavLinks.map((navLinkItem, index) => {
            // Only show buttons on mobile for login/logout/cart
            const isMobileVisible =
              navLinkItem.href === "/login" || navLinkItem.href === "/cart"
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
          })
        }

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className={`h-5 w-5 transition-transform ${menuOpen ? "rotate-90" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.nav>
  )
}
