"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StateLgaSelector } from "@/components/state-lga-selector"
import { X, Filter, Search } from "lucide-react"

interface MemberFilterProps {
  onFilter: (filters: FilterOptions) => void
  onReset: () => void
}

export interface FilterOptions {
  search: string
  state: string
  lga: string
  hasPVC: string
}

export function MemberFilter({ onFilter, onReset }: MemberFilterProps) {
  const [search, setSearch] = useState("")
  const [state, setState] = useState("")
  const [lga, setLga] = useState("")
  const [hasPVC, setHasPVC] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleFilter = () => {
    onFilter({
      search,
      state,
      lga,
      hasPVC,
    })
  }

  const handleReset = () => {
    setSearch("")
    setState("")
    setLga("")
    setHasPVC("")
    onReset()
  }

  return (
    <div className="w-full">
      {/* Simple search bar always visible */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? "bg-gray-100" : ""}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button onClick={handleFilter}>Search</Button>
      </div>

      {/* Advanced filters */}
      {isOpen && (
        <div className="bg-white p-4 rounded-md border mb-4 animate-in fade-in-50 slide-in-from-top-5 duration-300">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Advanced Filters</h3>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* State and LGA Selection */}
            <StateLgaSelector
              selectedState={state}
              selectedLga={lga}
              onStateChange={setState}
              onLgaChange={setLga}
              required={false}
              className="md:col-span-2"
            />

            {/* Has PVC Filter */}
            <div className="space-y-2">
              <Label htmlFor="hasPVC">Has PVC</Label>
              <Select value={hasPVC} onValueChange={setHasPVC}>
                <SelectTrigger id="hasPVC">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button onClick={handleFilter}>Apply Filters</Button>
          </div>
        </div>
      )}
    </div>
  )
}

