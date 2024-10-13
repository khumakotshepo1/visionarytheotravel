declare interface PackageBookingPropsType extends CustomerPropsType {
  package_booking_number: string;
  customer_id: string;
  package_id: string;
  status: string;
  number_of_adults: number;
  number_of_kids: number;
  booked_by: string;
  created_at: Date;
  updated_at: Date;
}
