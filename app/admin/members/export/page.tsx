"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, FileSpreadsheet, FileText, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { StateLgaSelector } from "@/components/state-lga-selector"
import { BackButton } from "@/components/admin/back-button"
import { Progress } from "@/components/ui/progress"

export default function ExportMembersPage() {
  const router = useRouter()
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [exportFormat, setExportFormat] = useState("csv")
  const [state, setState] = useState("")
  const [lga, setLga] = useState("")
  const [exportHistory] = useState([
    { id: 1, date: "2023-11-15", format: "CSV", records: 1250, filter: "All Members" },
    { id: 2, date: "2023-11-10", format: "Excel", records: 450, filter: "Lagos State" },
    { id: 3, date: "2023-10-28", format: "CSV", records: 320, filter: "Abuja FCT" },
  ])

  const handleExport = async () => {
    setIsExporting(true)
    setExportProgress(0)

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExporting(false)
            // Reset progress after completion
            setExportProgress(0)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton href="/admin/members" />
          <h1 className="text-2xl font-bold">Export Member Data</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export Options */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
            <CardDescription>Configure your export settings and filters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Export Format */}
            <div className="space-y-2">
              <Label>Export Format</Label>
              <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="format-csv" />
                  <Label htmlFor="format-csv" className="cursor-pointer flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    CSV
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="excel" id="format-excel" />
                  <Label htmlFor="format-excel" className="cursor-pointer flex items-center gap-1">
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label>Filter by Location</Label>
              <div className="bg-gray-50 p-4 rounded-md">
                <StateLgaSelector
                  selectedState={state}
                  selectedLga={lga}
                  onStateChange={setState}
                  onLgaChange={setLga}
                  required={false}
                  disabled={isExporting}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {!state
                    ? "Export all members from all states"
                    : !lga
                      ? `Export all members from ${state} state`
                      : `Export members from ${lga}, ${state}`}
                </p>
              </div>
            </div>

            {/* Export Progress */}
            {isExporting && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Export Progress</Label>
                  <span className="text-sm text-gray-500">{exportProgress}%</span>
                </div>
                <Progress value={exportProgress} className="h-2" />
                <p className="text-sm text-gray-500">
                  {exportProgress < 100
                    ? "Preparing your export file..."
                    : "Export complete! Your download will begin shortly."}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setState("")
                setLga("")
                setExportFormat("csv")
              }}
              disabled={isExporting}
            >
              Reset
            </Button>
            <Button onClick={handleExport} disabled={isExporting} className="bg-[#0F5D0B] hover:bg-[#0A4A08]">
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Exporting...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Export History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Exports</CardTitle>
            <CardDescription>Your recent data exports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exportHistory.map((export_) => (
                <div key={export_.id} className="border-b pb-3 last:border-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{export_.filter}</p>
                      <p className="text-sm text-gray-500">{export_.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                        {export_.format}
                      </span>
                      <p className="text-sm text-gray-500">{export_.records} records</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" size="sm">
              View All Exports
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

