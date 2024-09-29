declare interface CustomerPropsType {
  customer_id: string;
  first_name: string;
  last_name: string;
  customer_email: string;
  phone_number: string;
  address: string;
  number_of_adults: number;
  number_of_kids: number;
  date_of_birth: Date;
  gender: string;
  created_at: Date;
  updated_at: Date;
  id_number: string;
  passport_number: string;
  passport_issue_date: Date;
  passport_expiry_date: Date;
  passport_country: string;
}

declare interface CruiseBookingPropsType
  extends CustomerPropsType,
    CruisePropsType {
  cruise_booking_number: string;
  customer_id: string;
  cruise_id: string;
  status: string;
  cruise_number_of_adults: number;
  cruise_number_of_kids: number;
  booked_by: string;
  created_at: Date;
  updated_at: Date;
}

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
