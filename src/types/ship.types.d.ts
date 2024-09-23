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
  map: string;
  day: Date;
  arrive: string; // Time in "HH:mm:ss" format
  depart: string; // Time in "HH:mm:ss" format
  location: string;
}
