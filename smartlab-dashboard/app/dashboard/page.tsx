"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/sidebar"
import { useState } from "react"
import { Zap, Users, Power, AlertTriangle, TrendingUp, Activity, Clock } from "lucide-react"

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const overviewData = [
    {
      title: "Current Energy Consumption",
      value: "2,847",
      unit: "kWh",
      icon: Zap,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Active Users",
      value: "24",
      unit: "users",
      icon: Users,
      trend: "+3",
      trendUp: true,
    },
    {
      title: "Running Appliances",
      value: "18",
      unit: "devices",
      icon: Power,
      trend: "-2",
      trendUp: false,
    },
    {
      title: "Alerts",
      value: "5",
      unit: "notifications",
      icon: AlertTriangle,
      trend: "+2",
      trendUp: false,
    },
  ]

  const recentActivity = [
    { time: "2 min ago", event: "High power consumption detected in Lab A", type: "warning" },
    { time: "5 min ago", event: "User John Doe logged in", type: "info" },
    { time: "12 min ago", event: "Air conditioning system turned off", type: "success" },
    { time: "18 min ago", event: "New user registration: Jane Smith", type: "info" },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"} lg:${sidebarCollapsed ? "ml-16" : "ml-64"}`}
      >
        <div className="p-4 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-secondary mt-1">Welcome back! Here's what's happening in your lab.</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-secondary">Last updated</p>
              <p className="text-sm font-medium text-foreground">2 minutes ago</p>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {overviewData.map((item, index) => (
              <Card key={index} className="bg-card-gradient border-border/50 hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-secondary">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline space-x-2">
                    <div className="text-xl sm:text-2xl font-bold text-foreground">{item.value}</div>
                    <div className="text-xs text-secondary">{item.unit}</div>
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp
                      className={`h-3 w-3 mr-1 ${item.trendUp ? "text-status-running" : "text-status-failed"}`}
                    />
                    <span className={`text-xs ${item.trendUp ? "text-status-running" : "text-status-failed"}`}>
                      {item.trend} from last hour
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Energy Usage Chart */}
            <Card className="xl:col-span-2 bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Energy Usage Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-64 flex items-center justify-center text-secondary">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-primary/50" />
                    <p className="text-sm sm:text-base">
                      Energy usage chart will be implemented in Energy Monitoring page
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === "warning"
                          ? "bg-status-pending"
                          : activity.type === "success"
                            ? "bg-status-running"
                            : "bg-primary"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground break-words">{activity.event}</p>
                      <p className="text-xs text-secondary">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
