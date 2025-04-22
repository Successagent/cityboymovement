"use client"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpCircle, AlertCircle } from "lucide-react"
import { nigerianStates, lgasByState, defaultLGAs } from "@/lib/nigerian-states"

interface StateLgaSelectorProps {
  selectedState: string
  selectedLga: string
  onStateChange: (state: string) => void
  onLgaChange: (lga: string) => void
  required?: boolean
  disabled?: boolean
  className?: string
}

export function StateLgaSelector({
  selectedState,
  selectedLga,
  onStateChange,
  onLgaChange,
  required = true,
  disabled = false,
  className = "",
}: StateLgaSelectorProps) {
  // State for manual LGA input mode
  const [manualLgaMode, setManualLgaMode] = useState(false)
  const [lgaError, setLgaError] = useState<string | null>(null)

  // Direct calculation of available LGAs based on selected state
  const availableLGAs = selectedState && lgasByState[selectedState] ? lgasByState[selectedState] : defaultLGAs

  // Handle state change
  const handleStateChange = (state: string) => {
    onStateChange(state)

    // Reset LGA when state changes
    onLgaChange("")
    setLgaError(null)
  }

  // Handle manual LGA input
  const handleManualLgaInput = (value: string) => {
    // Basic validation
    if (required && value.trim() === "") {
      setLgaError("LGA cannot be empty")
    } else if (value.length > 50) {
      setLgaError("LGA name is too long")
    } else if (!/^[a-zA-Z0-9\s\-']+$/.test(value) && value !== "") {
      setLgaError("LGA contains invalid characters")
    } else {
      setLgaError(null)
    }

    onLgaChange(value)
  }

  // Toggle between dropdown and manual input
  const toggleManualMode = (checked: boolean) => {
    setManualLgaMode(checked)
    onLgaChange("") // Clear LGA value when switching modes
    setLgaError(null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* State Selection */}
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={selectedState} onValueChange={handleStateChange} disabled={disabled} required={required}>
            <SelectTrigger id="state" className="w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] bg-white">
              {nigerianStates.map((stateName) => (
                <SelectItem key={stateName} value={stateName}>
                  {stateName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* LGA Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="lga">Local Government Area</Label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Manual Input</span>
              <Switch className = 'border-gray-400'
                checked={manualLgaMode}
                onCheckedChange={toggleManualMode}
                disabled={disabled || !selectedState}
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent className = 'bg-white'>
                    <p className="max-w-xs ">
                      Toggle to manually enter an LGA if it's not in the dropdown list. Please ensure correct spelling.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {manualLgaMode ? (
            <div className="space-y-1">
              <Input
                id="lga-manual"
                placeholder="Enter your LGA manually"
                value={selectedLga}
                onChange={(e) => handleManualLgaInput(e.target.value)}
                disabled={disabled || !selectedState}
                required={required}
                className={lgaError ? "border-red-500" : ""}
              />
              {lgaError && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {lgaError}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Please enter the official name of your Local Government Area</p>
            </div>
          ) : (
            <Select
              value={selectedLga}
              onValueChange={onLgaChange}
              disabled={disabled || !selectedState}
              required={required}
            >
              <SelectTrigger id="lga" className="w-full">
                <SelectValue placeholder={selectedState ? "Select your LGA" : "Select state first"} />
              </SelectTrigger>
              <SelectContent className="max-h-[300px] bg-white">
                {availableLGAs.map((lgaName) => (
                  <SelectItem key={lgaName} value={lgaName}>
                    {lgaName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  )
}

