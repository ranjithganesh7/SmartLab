"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md bg-card-gradient border-border/50 shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">SmartLab</h1>
            <p className="text-secondary text-sm">Advanced Laboratory Management System</p>
          </div>

          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-primary rounded-full"></div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Access the administrative dashboard to monitor energy consumption, user activity, and control laboratory
              appliances.
            </p>

            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-primary hover:bg-accent text-primary-foreground font-medium py-2.5 transition-colors"
            >
              Admin Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
