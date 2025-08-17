"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Settings, Bell, Zap, Users, Power, AlertTriangle } from "lucide-react"

export default function ReportsSettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [reportType, setReportType] = useState("energy")
  const [dateRange, setDateRange] = useState("week")

  const [alertSettings, setAlertSettings] = useState({
    energyThreshold: 5000,
    userSessionLimit: 12,
    applianceFailureAlert: true,
    highPowerAlert: true,
    emailNotifications: true,
    smsNotifications: false,
  })

  const generateReport = () => {
    console.log(`Generating ${reportType} report for ${dateRange}`)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-4 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Reports & Settings</h1>
              <p className="text-secondary mt-1">Generate reports and configure system settings</p>
            </div>
          </div>

          <Tabs defaultValue="reports" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-card">
              <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Reports
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Report Generation */}
                <Card className="bg-card-gradient border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Generate Reports
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type" className="text-foreground">
                        Report Type
                      </Label>
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="energy">Energy Consumption</SelectItem>
                          <SelectItem value="users">User Activity</SelectItem>
                          <SelectItem value="appliances">Appliance Usage</SelectItem>
                          <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-range" className="text-foreground">
                        Date Range
                      </Label>
                      <Select value={dateRange} onValueChange={setDateRange}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                      <Button onClick={generateReport} className="flex-1 bg-primary hover:bg-accent">
                        <Download className="h-4 w-4 mr-2" />
                        Generate PDF
                      </Button>
                      <Button
                        variant="outline"
                        onClick={generateReport}
                        className="flex-1 border-border bg-transparent"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Generate CSV
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-card-gradient border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Quick Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-secondary text-sm">Total Energy (This Month)</span>
                      </div>
                      <span className="text-foreground font-medium">4,247 kWh</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="text-secondary text-sm">Active Users (Today)</span>
                      </div>
                      <span className="text-foreground font-medium">24 users</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Power className="h-4 w-4 text-primary" />
                        <span className="text-secondary text-sm">Appliances Online</span>
                      </div>
                      <span className="text-foreground font-medium">18 of 20</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-status-pending" />
                        <span className="text-secondary text-sm">Alerts (This Week)</span>
                      </div>
                      <span className="text-foreground font-medium">7 alerts</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Alert Configuration */}
                <Card className="bg-card-gradient border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-primary" />
                      Alert Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="energy-threshold" className="text-foreground">
                        Energy Threshold (W)
                      </Label>
                      <Input
                        id="energy-threshold"
                        type="number"
                        value={alertSettings.energyThreshold}
                        onChange={(e) =>
                          setAlertSettings((prev) => ({ ...prev, energyThreshold: Number.parseInt(e.target.value) }))
                        }
                        className="bg-input border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session-limit" className="text-foreground">
                        User Session Limit (hours)
                      </Label>
                      <Input
                        id="session-limit"
                        type="number"
                        value={alertSettings.userSessionLimit}
                        onChange={(e) =>
                          setAlertSettings((prev) => ({ ...prev, userSessionLimit: Number.parseInt(e.target.value) }))
                        }
                        className="bg-input border-border text-foreground"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="appliance-failure" className="text-foreground">
                          Appliance Failure Alerts
                        </Label>
                        <Switch
                          id="appliance-failure"
                          checked={alertSettings.applianceFailureAlert}
                          onCheckedChange={(checked) =>
                            setAlertSettings((prev) => ({ ...prev, applianceFailureAlert: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="high-power" className="text-foreground">
                          High Power Consumption Alerts
                        </Label>
                        <Switch
                          id="high-power"
                          checked={alertSettings.highPowerAlert}
                          onCheckedChange={(checked) =>
                            setAlertSettings((prev) => ({ ...prev, highPowerAlert: checked }))
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="bg-card-gradient border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-primary" />
                      Notification Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="text-foreground">
                        Email Notifications
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={alertSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setAlertSettings((prev) => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notifications" className="text-foreground">
                        SMS Notifications
                      </Label>
                      <Switch
                        id="sms-notifications"
                        checked={alertSettings.smsNotifications}
                        onCheckedChange={(checked) =>
                          setAlertSettings((prev) => ({ ...prev, smsNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="pt-4">
                      <Button className="w-full bg-primary hover:bg-accent">Save Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
