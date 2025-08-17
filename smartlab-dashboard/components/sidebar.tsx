"use client"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Zap,
  Users,
  Power,
  Camera,
  FileText,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  collapsed: boolean
  onToggle: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Energy Monitoring",
      href: "/dashboard/energy",
      icon: Zap,
    },
    {
      name: "User Activity",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Appliance Control",
      href: "/dashboard/appliances",
      icon: Power,
    },
    {
      name: "CCTV Monitoring",
      href: "/dashboard/cctv",
      icon: Camera,
    },
    {
      name: "Reports & Settings",
      href: "/dashboard/reports",
      icon: FileText,
    },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => onToggle(true)} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed left-0 top-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out
        ${collapsed ? "w-16" : "w-64"}
        lg:relative lg:z-auto
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border/50">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <div className="w-5 h-5 bg-white rounded-full opacity-90" />
                </div>
                <div>
                  <span className="font-bold text-lg text-sidebar-foreground">SmartLab</span>
                  <p className="text-xs text-sidebar-foreground/60">Admin Portal</p>
                </div>
              </div>
            )}
            {collapsed && (
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg mx-auto">
                <div className="w-5 h-5 bg-white rounded-full opacity-90" />
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggle(!collapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors rounded-lg hidden lg:flex"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onToggle(!collapsed)}
              className="text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors rounded-lg lg:hidden"
            >
              {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`
                    w-full justify-start text-left transition-all duration-200 rounded-xl h-12
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                    }
                    ${collapsed ? "px-3" : "px-4"}
                  `}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon
                    className={`h-5 w-5 ${collapsed ? "" : "mr-3"} ${isActive ? "text-primary-foreground" : ""}`}
                  />
                  {!collapsed && <span className="truncate font-medium">{item.name}</span>}
                </Button>
              )
            })}
          </nav>

          <div className="p-3 border-t border-sidebar-border/50">
            <Button
              variant="ghost"
              className={`
                w-full justify-start text-sidebar-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 rounded-xl h-12
                ${collapsed ? "px-3" : "px-4"}
              `}
              onClick={handleLogout}
            >
              <LogOut className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
              {!collapsed && <span className="font-medium">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
