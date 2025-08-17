"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Play, Square, Download, Maximize, Settings, AlertTriangle } from "lucide-react"

interface CameraFeed {
  id: string
  name: string
  location: string
  status: "online" | "offline" | "recording"
  resolution: string
  lastSnapshot: string
}

export default function CCTVMonitoringPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [recordingCameras, setRecordingCameras] = useState<string[]>([])

  const cameras: CameraFeed[] = [
    {
      id: "cam-001",
      name: "Lab A - Main View",
      location: "Lab A",
      status: "online",
      resolution: "1080p",
      lastSnapshot: "2 min ago",
    },
    {
      id: "cam-002",
      name: "Lab A - Equipment Area",
      location: "Lab A",
      status: "recording",
      resolution: "720p",
      lastSnapshot: "1 min ago",
    },
    {
      id: "cam-003",
      name: "Lab B - Entrance",
      location: "Lab B",
      status: "online",
      resolution: "1080p",
      lastSnapshot: "3 min ago",
    },
    {
      id: "cam-004",
      name: "Lab B - Workstation",
      location: "Lab B",
      status: "offline",
      resolution: "720p",
      lastSnapshot: "15 min ago",
    },
    {
      id: "cam-005",
      name: "Lab C - Overview",
      location: "Lab C",
      status: "online",
      resolution: "1080p",
      lastSnapshot: "1 min ago",
    },
    {
      id: "cam-006",
      name: "Corridor - Main Hall",
      location: "Corridor",
      status: "online",
      resolution: "720p",
      lastSnapshot: "2 min ago",
    },
  ]

  const toggleRecording = (cameraId: string) => {
    setRecordingCameras((prev) =>
      prev.includes(cameraId) ? prev.filter((id) => id !== cameraId) : [...prev, cameraId],
    )
  }

  const takeSnapshot = (cameraId: string) => {
    // Simulate snapshot functionality
    console.log(`Taking snapshot from camera ${cameraId}`)
  }

  const filteredCameras = selectedCamera === "all" ? cameras : cameras.filter((c) => c.location === selectedCamera)

  const onlineCameras = cameras.filter((c) => c.status === "online" || c.status === "recording").length
  const recordingCount = cameras.filter((c) => c.status === "recording").length + recordingCameras.length
  const offlineCameras = cameras.filter((c) => c.status === "offline").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-status-running"
      case "recording":
        return "bg-status-pending"
      case "offline":
        return "bg-status-failed"
      default:
        return "bg-secondary"
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />

      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">CCTV Monitoring</h1>
              <p className="text-secondary mt-1">Monitor live video feeds from laboratory cameras</p>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cameras</SelectItem>
                  <SelectItem value="Lab A">Lab A</SelectItem>
                  <SelectItem value="Lab B">Lab B</SelectItem>
                  <SelectItem value="Lab C">Lab C</SelectItem>
                  <SelectItem value="Corridor">Corridor</SelectItem>
                </SelectContent>
              </Select>
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="w-32 bg-input border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="single">Single View</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Online Cameras</CardTitle>
                <Camera className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{onlineCameras}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">out of {cameras.length} total</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Recording</CardTitle>
                <Square className="h-4 w-4 text-status-pending" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{recordingCount}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-status-pending">active recordings</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Offline Cameras</CardTitle>
                <AlertTriangle className="h-4 w-4 text-status-failed" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{offlineCameras}</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-status-failed">need attention</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card-gradient border-border/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-secondary">Storage Used</CardTitle>
                <Download className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">2.4 TB</div>
                <div className="flex items-center mt-2">
                  <span className="text-xs text-secondary">of 5 TB available</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Camera Grid */}
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
          >
            {filteredCameras.map((camera) => (
              <Card key={camera.id} className="bg-card-gradient border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-foreground">{camera.name}</CardTitle>
                      <p className="text-sm text-secondary">{camera.location}</p>
                    </div>
                    <Badge className={`${getStatusColor(camera.status)} text-white capitalize`}>{camera.status}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Video Feed Placeholder */}
                  <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
                    {camera.status === "offline" ? (
                      <div className="text-center">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-2 text-status-failed" />
                        <p className="text-status-failed">Camera Offline</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-12 w-12 mx-auto mb-2 text-primary/50" />
                        <p className="text-primary/50">Live Feed</p>
                        <p className="text-xs text-secondary mt-1">{camera.resolution}</p>
                      </div>
                    )}
                    {(camera.status === "recording" || recordingCameras.includes(camera.id)) && (
                      <div className="absolute top-2 right-2 flex items-center space-x-1 bg-status-pending/90 px-2 py-1 rounded">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-xs text-white">REC</span>
                      </div>
                    )}
                  </div>

                  {/* Camera Info */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary">Last Snapshot:</span>
                    <span className="text-foreground">{camera.lastSnapshot}</span>
                  </div>

                  {/* Camera Controls */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border bg-transparent"
                      onClick={() => takeSnapshot(camera.id)}
                      disabled={camera.status === "offline"}
                    >
                      <Camera className="h-3 w-3 mr-1" />
                      Snapshot
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`flex-1 border-border ${
                        recordingCameras.includes(camera.id) || camera.status === "recording"
                          ? "bg-status-pending/20 text-status-pending"
                          : "bg-transparent"
                      }`}
                      onClick={() => toggleRecording(camera.id)}
                      disabled={camera.status === "offline"}
                    >
                      {recordingCameras.includes(camera.id) || camera.status === "recording" ? (
                        <Square className="h-3 w-3 mr-1" />
                      ) : (
                        <Play className="h-3 w-3 mr-1" />
                      )}
                      {recordingCameras.includes(camera.id) || camera.status === "recording" ? "Stop" : "Record"}
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border bg-transparent"
                      disabled={camera.status === "offline"}
                    >
                      <Maximize className="h-3 w-3 mr-1" />
                      Fullscreen
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-border bg-transparent"
                      disabled={camera.status === "offline"}
                    >
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
    </div>
  )
}
