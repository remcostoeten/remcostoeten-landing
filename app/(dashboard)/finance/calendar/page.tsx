import { Metadata } from "next"

import { Calendar } from "@/components/misc/Calender"

export const metadata: Metadata = {
  title: "Calendar Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
}

const CalendarPage = () => {
  return (
    <>
      <Calendar />
    </>
  )
}

export default CalendarPage
