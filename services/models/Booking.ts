import type { Venue } from "./Venue"
import type { Customer } from "./Customer"

export type Booking = {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  venue?: Venue
  customer?: Customer
}
