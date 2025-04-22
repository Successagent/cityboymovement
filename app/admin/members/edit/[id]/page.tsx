"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Save, User, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { StateLgaSelector } from "@/components/state-lga-selector"
import { BackButton } from "@/components/admin/back-button"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock member data for demonstration
const mockMember = {
  id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "08012345678",
  state: "Lagos",
  lga: "Ikeja",
  ward: "Ward 5",
  hasPVC: "yes",
  notes: "Active member, attends all meetings",
  joinedDate: "2023-05-15",
}

export default function EditMemberPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Form state
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("")
  const [lga, setLga] = useState("")
  const [ward, setWard] = useState("")
  const [hasPVC, setHasPVC] = useState<string>("yes")
  const [notes, setNotes] = useState("")

  // Fetch member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Set form data from mock data
        setFullName(mockMember.fullName)
        setEmail(mockMember.email)
        setPhone(mockMember.phone)
        setState(mockMember.state)
        setLga(mockMember.lga)
        setWard(mockMember.ward)
        setHasPVC(mockMember.hasPVC)
        setNotes(mockMember.notes)
      } catch (error) {
        console.error("Error fetching member:", error)
        setFormError("Failed to load member data. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchMember()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setIsSaving(true)

    // Validate LGA if state is selected
    if (state && !lga) {
      setFormError("Please select or enter a Local Government Area")
      setIsSaving(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success - redirect back to members list
      router.push("/admin/members")
    } catch (error) {
      console.error("Error updating member:", error)
      setFormError("An error occurred while updating the member. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BackButton href="/admin/members" />
            <h1 className="text-2xl font-bold">Edit Member</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex justify-center items-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0F5D0B] border-t-transparent"></div>
          <span className="ml-2">Loading member data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton href="/admin/members" />
          <h1 className="text-2xl font-bold">Edit Member: {fullName}</h1>
        </div>
      </div>

      {formError && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="fullName"
                  placeholder="Enter member's full name"
                  className="pl-10"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter member's email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter member's phone number"
                  className="pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* State and LGA Selection */}
            <div className="md:col-span-2">
              <StateLgaSelector
                selectedState={state}
                selectedLga={lga}
                onStateChange={setState}
                onLgaChange={setLga}
                required
                disabled={isSaving}
              />
            </div>

            {/* Ward */}
            <div className="space-y-2">
              <Label htmlFor="ward">Ward</Label>
              <Input id="ward" placeholder="Enter ward" value={ward} onChange={(e) => setWard(e.target.value)} />
            </div>

            {/* PVC Verification */}
            <div className="space-y-2">
              <Label>Has PVC?</Label>
              <RadioGroup value={hasPVC} onValueChange={setHasPVC} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="pvc-yes" />
                  <Label htmlFor="pvc-yes" className="cursor-pointer">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="pvc-no" />
                  <Label htmlFor="pvc-no" className="cursor-pointer">
                    No
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Notes */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Enter any additional information about this member"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push("/admin/members")} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0F5D0B] hover:bg-[#0A4A08]" disabled={isSaving}>
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Update Member
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

