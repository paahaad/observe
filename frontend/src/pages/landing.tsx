"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { Activity, BarChart3, Clock, Cpu, CpuIcon, FileSearch, Gauge, Home, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for charts
const cpuData = [
  { time: "00:00", usage: 45 },
  { time: "01:00", usage: 52 },
  { time: "02:00", usage: 49 },
  { time: "03:00", usage: 63 },
  { time: "04:00", usage: 58 },
  { time: "05:00", usage: 48 },
]

const memoryData = [
  { time: "00:00", usage: 3.2 },
  { time: "01:00", usage: 3.5 },
  { time: "02:00", usage: 3.8 },
  { time: "03:00", usage: 4.1 },
  { time: "04:00", usage: 3.9 },
  { time: "05:00", usage: 3.6 },
]

const latencyData = [
  { time: "00:00", latency: 120 },
  { time: "01:00", latency: 135 },
  { time: "02:00", latency: 128 },
  { time: "03:00", latency: 142 },
  { time: "04:00", latency: 139 },
  { time: "05:00", latency: 131 },
]

export default function ObserverDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [timeInterval, setTimeInterval] = useState("1h")

  const renderDashboard = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
          <Cpu className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">58%</div>
          <ChartContainer config={{ usage: { label: "Usage", color: "hsl(var(--chart-1))" } }} className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
          <CpuIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.9 GB</div>
          <ChartContainer config={{ usage: { label: "Usage", color: "hsl(var(--chart-2))" } }} className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={memoryData}>
                <Line type="monotone" dataKey="usage" stroke="var(--color-usage)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Request Latency</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">131 ms</div>
          <ChartContainer config={{ latency: { label: "Latency", color: "hsl(var(--chart-3))" } }} className="h-[80px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latencyData}>
                <Line type="monotone" dataKey="latency" stroke="var(--color-latency)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )

  const renderMetrics = () => (
    <Card>
      <CardHeader>
        <CardTitle>Metrics</CardTitle>
        <CardDescription>System metrics over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Select value={timeInterval} onValueChange={setTimeInterval}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time interval" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer
          config={{
            cpu: { label: "CPU Usage", color: "hsl(var(--chart-1))" },
            memory: { label: "Memory Usage", color: "hsl(var(--chart-2))" },
            latency: { label: "Request Latency", color: "hsl(var(--chart-3))" },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[...Array(24)].map((_, i) => ({
              time: `${i}:00`,
              cpu: Math.floor(Math.random() * 100),
              memory: Math.floor(Math.random() * 8 * 10) / 10,
              latency: Math.floor(Math.random() * 200 + 50),
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="cpu" stroke="var(--color-cpu)" name="CPU Usage (%)" />
              <Line yAxisId="left" type="monotone" dataKey="memory" stroke="var(--color-memory)" name="Memory Usage (GB)" />
              <Line yAxisId="right" type="monotone" dataKey="latency" stroke="var(--color-latency)" name="Request Latency (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )

  const renderTraces = () => (
    <Card>
      <CardHeader>
        <CardTitle>Traces</CardTitle>
        <CardDescription>Service trace visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <Server className="h-4 w-4" />
              <span className="font-medium">Service {i + 1}</span>
              <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 100 + 50)}ms</span>
              <div className="flex-1 h-2 bg-primary/20 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${Math.random() * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const renderLogs = () => (
    <Card>
      <CardHeader>
        <CardTitle>Logs</CardTitle>
        <CardDescription>System logs with search and filter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Input placeholder="Search logs..." className="flex-1" />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">{new Date().toISOString()}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? 'bg-red-200 text-red-800' : i % 3 === 1 ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>
                {i % 3 === 0 ? 'ERROR' : i % 3 === 1 ? 'WARNING' : 'INFO'}
              </span>
              <span className="flex-1">Log message {i + 1}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-muted/40">
        <div className="flex h-14 items-center border-b px-6">
          <Gauge className="h-6 w-6 mr-2" />
          <span className="font-semibold">Observer</span>
        </div>
        <nav className="space-y-2 p-4">
          <Button
            variant={activeSection === "dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button
            variant={activeSection === "metrics" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("metrics")}
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Metrics
          </Button>
          <Button
            variant={activeSection === "traces" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("traces")}
          >
            <Activity className="mr-2 h-4 w-4" />
            Traces
          </Button>
          <Button
            variant={activeSection === "logs" ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveSection("logs")}
          >
            <FileSearch className="mr-2 h-4 w-4" />
            Logs
          </Button>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Observer Dashboard</h1>
        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "metrics" && renderMetrics()}
        {activeSection === "traces" && renderTraces()}
        {activeSection === "logs" && renderLogs()}
      </main>
    </div>
  )
}