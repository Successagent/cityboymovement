"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: Date | string | number // Allow different date formats
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Convert targetDate to Date object if it's not already
  const getTargetDate = (): Date => {
    if (targetDate instanceof Date) {
      return targetDate
    }

    // If it's a string or number, convert to Date
    return new Date(targetDate)
  }

  useEffect(() => {
    // Ensure the target date is valid
    const target = getTargetDate()

    if (isNaN(target.getTime())) {
      console.log("Invalid target date provided to CountdownTimer")
      return
    }

    const calculateTimeLeft = () => {
      const difference = target.getTime() - new Date().getTime()

      if (difference <= 0) {
        // If the target date is in the past, set the remaining time to 0
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      // Calculate the remaining time
      setTimeLeft({
        // Convert milliseconds to days
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // Convert milliseconds to hours and get the remainder after days are subtracted
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // Convert milliseconds to minutes and get the remainder after hours are subtracted
        minutes: Math.floor((difference / 1000 / 60) % 60),
        // Convert milliseconds to seconds and get the remainder after minutes are subtracted
        seconds: Math.floor((difference / 1000) % 60),
      })

    }

    // Calculate immediately
    calculateTimeLeft()

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up on unmount
    return () => clearInterval(timer)
  }, [targetDate]) // Re-run effect if targetDate changes

  return (
    <div className="flex space-x-4 text-center">
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-[#0F5D0B]">{timeLeft.days}</span>
        <span className="text-xs uppercase text-gray-500">Days</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-[#0F5D0B]">{timeLeft.hours}</span>
        <span className="text-xs uppercase text-gray-500">Hours</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-[#0F5D0B]">{timeLeft.minutes}</span>
        <span className="text-xs uppercase text-gray-500">Minutes</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl md:text-3xl font-bold text-[#0F5D0B]">{timeLeft.seconds}</span>
        <span className="text-xs uppercase text-gray-500">Seconds</span>
      </div>
    </div>
  )
}

