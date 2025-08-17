"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
import { Users, Clock, AlertTriangle, TrendingUp, UserCheck, Download, Calendar } from "lucide-react"

export default function UserActivityPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [timeFilter, setTimeFilter] = useState("today")

  // Mock data for user sessions
  const userSessions = [
    {
      name: "John Doe",
      loginTime: "08:30 AM",
      logoutTime: "05:45 PM",
      duration: "9h 15m",
      status: "Active",
      location: "Lab A",
    },
    {
      name: "Jane Smith",
      loginTime: "09:15 AM",
      logoutTime: "04:30 PM",
      duration: "7h 15m",
      status: "Completed",
      location: "Lab B",
    },
    {
      name: "Mike Johnson",
      loginTime: "07:45 AM",
      logoutTime: "Still Active",
      duration: "10h 30m",
      status: "Active",
      location: "Lab A",
    },
    {
      name: "Sarah Wilson",
      loginTime: "10:00 AM",
      logoutTime: "02:15 PM",
      duration: "4h 15m",
      status: "Completed",
      location: "Lab C",
    },
    {
      name: "David Brown",
      loginTime: "11:30 AM",
      logoutTime: "Still Active",
      duration: "6h 45m",
      status: "Active",
      location: "Lab B",
    },
    {
      name: "Emily Davis",
      loginTime: "06:00 AM",
      logoutTime: "11:45 AM",
      duration: "5h 45m",
      status: "Abnormal",
      location: "Lab A",
    },
  ]

  // Mock data for daily logins
  const dailyLoginsData = [
    { day: "Mon", logins: 28 },
    { day: "Tue", logins: 32 },
    { day: "Wed", logins: 25 },
    { day: "Thu", logins: 35 },
    { day: "Fri", logins: 30 },
    { day: "Sat", logins: 15 },
    { day: "Sun", logins: 12 },
  ]

  // Mock data for hourly usage pattern
  const hourlyUsageData = [
    { hour: "6AM", users: 2 },
    { hour: "8AM", users: 15 },
    { hour: "10AM", users: 25 },
    { hour: "12PM", users: 30 },
    { hour: "2PM", users: 28 },
    { hour: "4PM", users: 20 },
    { hour: "6PM", users: 8 },
    { hour: "8PM", users: 3 },
  ]

  // Mock data for lab usage distribution
  const labUsageData = [
    { name: "Lab A", value: 45, color: "#60A5FA" },
    { name: "Lab B", value: 30, color: "#22C55E" },
    { name: "Lab C", value: 20, color: "#F59E0B" },
    { name: "Lab D", value: 5, color: "#EF4444" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-status-running"
      case "Completed":
        return "bg-primary"
      case "Abnormal":
        return "bg-status-failed"
      default:
        return "bg-secondary"
    }
  }

  const activeUsers = userSessions.filter((u) => u.status === "Active").length
  const totalSessions = userSessions.length
  const abnormalSessions = userSessions.filter((u) => u.status === "Abnormal").length

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">User Activity</h1>
              <p className="text-secondary mt-1">Monitor student login sessions and usage patterns</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Alerts for Abnormal Sessions */}
          {abnormalSessions > 0 && (
            <Alert className="border-status-failed/50 bg-status-failed/10">
              <AlertTriangle className="h-4 w-4 text-status-failed" />
              <AlertDescription className="text-foreground">
                <strong>{abnormalSessions} abnormal session(s) detected.</strong> Emily Davis has been logged in for an
                unusually short time. Please review for potential security issues.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{activeUsers}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">currently in labs</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Total Sessions</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalSessions}</div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-3 w-3 mr-1 text-status-running" />
                  <span className="text-xs text-status-running">+12% from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Average Duration</CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">7h 15m</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">per session</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Peak Usage</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">12:00 PM</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">30 concurrent users</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Logins Chart */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Daily Login Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyLoginsData}>
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
                    <Line type="monotone" dataKey="logins" stroke="#60A5FA" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Hourly Usage Pattern */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Peak Usage Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hourlyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="hour" stroke="#94A3B8" />
                    <YAxis stroke="#94A3B8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1E293B",
                        border: "1px solid #334155",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="users" fill="#22C55E" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Lab Usage and User Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Lab Usage Distribution */}
            <Card className="bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Lab Usage Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={labUsageData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {labUsageData.map((entry, index) => (
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

            {/* User Sessions Table */}
            <Card className="lg:col-span-2 bg-card-gradient border-border/50">
              <CardHeader>
                <CardTitle className="text-foreground">Current Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-secondary">Student Name</TableHead>
                      <TableHead className="text-secondary">Login Time</TableHead>
                      <TableHead className="text-secondary">Logout Time</TableHead>
                      <TableHead className="text-secondary">Duration</TableHead>
                      <TableHead className="text-secondary">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userSessions.map((session, index) => (
                      <TableRow key={index} className="border-border">
                        <TableCell className="text-foreground font-medium">
                          <div>
                            <div>{session.name}</div>
                            <div className="text-xs text-secondary">{session.location}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">{session.loginTime}</TableCell>
                        <TableCell className="text-foreground">{session.logoutTime}</TableCell>
                        <TableCell className="text-foreground">{session.duration}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(session.status)} text-white`}>{session.status}</Badge>
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
