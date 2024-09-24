declare interface ShipPropsType {
  ship_id: string;
  ship_name: string;
  ship_image: string;
  ship_class: string;
}

declare interface CabinPropsType {
  cabin_id: string;
  ship_id: string;
  cabin_name: string;
  cabin_image: string;
  ship_name: string;
}

declare interface CruiseItineraryPropsType {
  cruise_itinerary_id: string;
  cruise_id: string;
  day: string;
  location: string;
  arrive: string; // Time in "HH:mm:ss" format
  depart: string; // Time in "HH:mm:ss" format
  cruise: string;
}

declare interface CruisePropsType {
  cruise_id: string;
  ship_id: string;
  cruise_name: string;
  description: string;
  duration: string;
  embarkation_date: Date;
  disembarkation_date: Date;
  departure_port: string;
  cruise_price: string;
  map: string;
  ship_name: string;
  ship_class: string;
  ship_image: string;
  cruiseItenerary: CruiseItineraryPropsType[];
}
