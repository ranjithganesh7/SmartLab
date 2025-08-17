"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Download, FileText, Zap, TrendingUp, Activity } from "lucide-react"

export default function EnergyMonitoringPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [timeFilter, setTimeFilter] = useState("day")

  // Mock data for appliances
  const applianceData = [
    { name: "Air Conditioner A", current: 12.5, voltage: 220, power: 2750, status: "Running" },
    { name: "LED Lights - Lab A", current: 2.1, voltage: 220, power: 462, status: "Running" },
    { name: "Computer Workstation 1", current: 3.2, voltage: 220, power: 704, status: "Running" },
    { name: "Microscope Station", current: 1.8, voltage: 220, power: 396, status: "Running" },
    { name: "Centrifuge Machine", current: 8.5, voltage: 220, power: 1870, status: "Pending" },
    { name: "Fume Hood Ventilation", current: 4.2, voltage: 220, power: 924, status: "Running" },
    { name: "Refrigeration Unit", current: 6.8, voltage: 220, power: 1496, status: "Running" },
    { name: "Heating Element", current: 0, voltage: 220, power: 0, status: "Failed" },
  ]

  // Mock data for usage trend
  const usageTrendData = [
    { time: "00:00", power: 2400 },
    { time: "04:00", power: 1800 },
    { time: "08:00", power: 4200 },
    { time: "12:00", power: 5800 },
    { time: "16:00", power: 6200 },
    { time: "20:00", power: 4800 },
  ]

  // Mock data for daily totals
  const dailyTotalsData = [
    { day: "Mon", consumption: 145 },
    { day: "Tue", consumption: 162 },
    { day: "Wed", consumption: 138 },
    { day: "Thu", consumption: 175 },
    { day: "Fri", consumption: 189 },
    { day: "Sat", consumption: 95 },
    { day: "Sun", consumption: 87 },
  ]

  // Mock data for appliance-wise consumption
  const applianceShareData = [
    { name: "Air Conditioning", value: 35, color: "#60A5FA" },
    { name: "Lighting", value: 15, color: "#22C55E" },
    { name: "Computers", value: 25, color: "#F59E0B" },
    { name: "Lab Equipment", value: 20, color: "#EF4444" },
    { name: "Others", value: 5, color: "#94A3B8" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Running":
        return "bg-status-running"
      case "Failed":
        return "bg-status-failed"
      case "Pending":
        return "bg-status-pending"
      default:
        return "bg-secondary"
    }
  }

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Running":
        return "text-status-running"
      case "Failed":
        return "text-status-failed"
      case "Pending":
        return "text-status-pending"
      default:
        return "text-secondary"
    }
  }

  const totalPower = applianceData.reduce((sum, appliance) => sum + appliance.power, 0)
  const runningAppliances = applianceData.filter((a) => a.status === "Running").length

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Energy Monitoring</h1>
              <p className="text-secondary mt-1">Monitor real-time energy consumption and usage patterns</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" className="border-border bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Total Power Consumption</CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{(totalPower / 1000).toFixed(1)} kW</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-status-running" />
                  <span className="text-xs text-status-running">+8% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Active Appliances</CardTitle>
                <Activity className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{runningAppliances}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">out of {applianceData.length} total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Average Efficiency</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">87.5%</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-status-running">Optimal range</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Trend Chart */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Usage Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Line type="monotone" dataKey="power" stroke="#60A5FA" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Daily Totals Chart */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyTotalsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="consumption" fill="#60A5FA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Appliance Share and Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Appliance Share Pie Chart */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Consumption by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applianceShareData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {applianceShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Appliance Table */}
            <Card className="lg:col-span-2 bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Appliance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-secondary">Appliance</TableHead>
                      <TableHead className="text-secondary">Current (A)</TableHead>
                      <TableHead className="text-secondary">Voltage (V)</TableHead>
                      <TableHead className="text-secondary">Power (W)</TableHead>
                      <TableHead className="text-secondary">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applianceData.map((appliance, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="text-foreground font-medium">{appliance.name}</TableCell>
                        <TableCell className="text-foreground">{appliance.current}</TableCell>
                        <TableCell className="text-foreground">{appliance.voltage}</TableCell>
                        <TableCell className="text-foreground">{appliance.power}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(appliance.status)} text-white`}>{appliance.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
