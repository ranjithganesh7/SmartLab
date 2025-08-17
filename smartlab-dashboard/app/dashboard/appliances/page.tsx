"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Power,
  Zap,
  Clock,
  Settings,
  AlertTriangle,
  Calendar,
  PowerOff,
  Thermometer,
  Lightbulb,
  Monitor,
  Fan,
} from "lucide-react"

interface Appliance {
  id: string
  name: string
  type: string
  status: "on" | "off"
  powerDraw: number
  lastUsed: string
  location: string
  scheduled: boolean
  scheduleTime?: string
  icon: any
}

export default function ApplianceControlPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false)
  const [selectedAppliance, setSelectedAppliance] = useState<Appliance | null>(null)

  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: "1",
      name: "Air Conditioner A",
      type: "HVAC",
      status: "on",
      powerDraw: 2750,
      lastUsed: "Currently running",
      location: "Lab A",
      scheduled: false,
      icon: Fan,
    },
    {
      id: "2",
      name: "LED Lights - Lab A",
      type: "Lighting",
      status: "on",
      powerDraw: 462,
      lastUsed: "Currently running",
      location: "Lab A",
      scheduled: true,
      scheduleTime: "18:00",
      icon: Lightbulb,
    },
    {
      id: "3",
      name: "Computer Workstation 1",
      type: "Computing",
      status: "on",
      powerDraw: 704,
      lastUsed: "Currently running",
      location: "Lab A",
      scheduled: false,
      icon: Monitor,
    },
    {
      id: "4",
      name: "Heating Element",
      type: "Equipment",
      status: "off",
      powerDraw: 0,
      lastUsed: "2 hours ago",
      location: "Lab B",
      scheduled: false,
      icon: Thermometer,
    },
    {
      id: "5",
      name: "Centrifuge Machine",
      type: "Equipment",
      status: "off",
      powerDraw: 0,
      lastUsed: "30 minutes ago",
      location: "Lab B",
      scheduled: true,
      scheduleTime: "09:00",
      icon: Settings,
    },
    {
      id: "6",
      name: "Fume Hood Ventilation",
      type: "Safety",
      status: "on",
      powerDraw: 924,
      lastUsed: "Currently running",
      location: "Lab C",
      scheduled: false,
      icon: Fan,
    },
  ])

  const toggleAppliance = (id: string) => {
    setAppliances((prev) =>
      prev.map((appliance) =>
        appliance.id === id
          ? {
              ...appliance,
              status: appliance.status === "on" ? "off" : "on",
              powerDraw: appliance.status === "on" ? 0 : appliance.powerDraw || 500,
              lastUsed: appliance.status === "on" ? "Just turned off" : "Currently running",
            }
          : appliance,
      ),
    )
  }

  const turnOffAllAppliances = () => {
    setAppliances((prev) =>
      prev.map((appliance) => ({
        ...appliance,
        status: "off" as const,
        powerDraw: 0,
        lastUsed: "Just turned off",
      })),
    )
  }

  const filteredAppliances =
    selectedLocation === "all" ? appliances : appliances.filter((a) => a.location === selectedLocation)

  const activeAppliances = appliances.filter((a) => a.status === "on").length
  const totalPowerDraw = appliances.reduce((sum, a) => sum + a.powerDraw, 0)
  const highPowerAppliances = appliances.filter((a) => a.powerDraw > 1000 && a.status === "on").length
  const scheduledAppliances = appliances.filter((a) => a.scheduled).length

  const openScheduleDialog = (appliance: Appliance) => {
    setSelectedAppliance(appliance)
    setScheduleDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appliance Control</h1>
              <p className="text-secondary mt-1">Monitor and control laboratory appliances remotely</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Labs</SelectItem>
                  <SelectItem value="Lab A">Lab A</SelectItem>
                  <SelectItem value="Lab B">Lab B</SelectItem>
                  <SelectItem value="Lab C">Lab C</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={turnOffAllAppliances}
                variant="destructive"
                className="bg-status-failed hover:bg-status-failed/90"
              >
                <PowerOff className="h-4 w-4 mr-2" />
                Turn Off All
              </Button>
            </div>
          </div>

          {/* High Power Alert */}
          {highPowerAppliances > 0 && (
            <Alert className="border-status-pending/50 bg-status-pending/10">
              <AlertTriangle className="h-4 w-4 text-status-pending" />
              <AlertDescription className="text-foreground">
                <strong>{highPowerAppliances} high-power appliance(s)</strong> are currently running. Consider turning
                off non-essential devices to reduce energy consumption.
              </AlertDescription>
            </Alert>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Active Appliances</CardTitle>
                <Power className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{activeAppliances}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">out of {appliances.length} total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Total Power Draw</CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{(totalPowerDraw / 1000).toFixed(1)} kW</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">current consumption</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Scheduled Tasks</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{scheduledAppliances}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">automated controls</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">High Power Devices</CardTitle>
                <AlertTriangle className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{highPowerAppliances}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-status-pending">needs attention</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appliance Control Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppliances.map((appliance) => (
              <Card
                key={appliance.id}
                className={`bg-card-gradient border-border/50 transition-all hover:border-primary/50 ${
                  appliance.powerDraw > 1000 && appliance.status === "on" ? "ring-2 ring-status-pending/50" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <appliance.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-foreground">{appliance.name}</CardTitle>
                        <p className="text-sm text-secondary">{appliance.location}</p>
                      </div>
                    </div>
                    <Switch
                      checked={appliance.status === "on"}
                      onCheckedChange={() => toggleAppliance(appliance.id)}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary">Status</span>
                    <Badge
                      className={`${
                        appliance.status === "on" ? "bg-status-running" : "bg-secondary"
                      } text-white capitalize`}
                    >
                      {appliance.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary">Power Draw</span>
                    <span
                      className={`text-sm font-medium ${
                        appliance.powerDraw > 1000 ? "text-status-pending" : "text-foreground"
                      }`}
                    >
                      {appliance.powerDraw}W
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary">Last Used</span>
                    <span className="text-sm text-foreground">{appliance.lastUsed}</span>
                  </div>

                  {appliance.scheduled && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary">Scheduled</span>
                      <span className="text-sm text-primary">{appliance.scheduleTime}</span>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border bg-transparent"
                      onClick={() => openScheduleDialog(appliance)}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Schedule
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-border bg-transparent">
                      <Settings className="h-3 w-3 mr-1" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Schedule Dialog */}
      <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Schedule {selectedAppliance?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-time" className="text-foreground">
                Auto Turn Off Time
              </Label>
              <Input
                id="schedule-time"
                type="time"
                defaultValue={selectedAppliance?.scheduleTime || "18:00"}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="schedule-days" className="text-foreground">
                Days
              </Label>
              <Select defaultValue="weekdays">
                <SelectTrigger className="bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekdays">Weekdays Only</SelectItem>
                  <SelectItem value="weekends">Weekends Only</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setScheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-accent" onClick={() => setScheduleDialogOpen(false)}>
                Save Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
