declare interface ShipPropsType {
  ship_id: string;
  ship_name: string;
  ship_image: string;
  ship_class: string;
  created_at: Date;
  updated_at: Date;
}

declare interface CabinPropsType {
  cabin_id: string;
  ship_id: string;
  cabin_name: string;
  cabin_image: string;
  ship_name: string;
  created_at: Date;
  updated_at: Date;
}

declare interface CruiseItineraryPropsType {
  cruise_itinerary_id: string;
  cruise_id: string;
  day: string;
  location: string;
  arrive: string; // Time in "HH:mm:ss" format
  depart: string; // Time in "HH:mm:ss" format
  cruise: string;
  created_at: Date;
  updated_at: Date;
}

declare interface CruisePropsType {
  cruise_id: string;
  ship_id: string;
  cruise_destination: string;
  cruise_name: string;
  description: string;
  duration: string;
  embarkation_date: Date;
  disembarkation_date: Date;
  departure_port: string;
  cruise_price: string;
  map_image: string;
  cruise_image: string;
  ship_name: string;
  ship_class: string;
  ship_image: string;
  cruiseItenerary: CruiseItineraryPropsType[];
  created_at: Date;
  updated_at: Date;
}

declare interface PreviousCruiseTotalPricePropsType {
  id: string;
  previous_cruise_total_price: string;
  created_at: Date;
  updated_at: Date;
}

declare interface CruiseBookingPropsType
  extends CustomerPropsType,
  CruisePropsType {
  cruise_booking_number: string;
  customer_id: string;
  cruise_id: string;
  status: string;
  cruise_balance_due: string,
  cruise_number_of_adults: number;
  cruise_number_of_kids: number;
  booked_by: string;
  created_at: Date;
  updated_at: Date;
}

declare interface CruiseBookingPaymentPropsType {
  cruise_booking_payment_id: string;
  cruise_booking_number: string;
  cruise_payment_amount: string;
  cruise_payment_method: string;
  received_by: string;
  created_at: Date;
  updated_at: Date;
}
