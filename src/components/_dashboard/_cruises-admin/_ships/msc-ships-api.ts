export type Ship = {
  name: string;
  status: string;
  class: string;
};

export type ShipsClass = {
  class: string;
};

export type CabinNames = {
  name: string;
};

export const mscShipsApi = [
  { name: "MSC Grandiosa", status: "operational", class: "Meraviglia" },
  { name: "MSC Virtuosa", status: "operational", class: "Meraviglia" },
  { name: "MSC Seashore", status: "operational", class: "Seaside" },
  { name: "MSC Seaview", status: "operational", class: "Seaside" },
  { name: "MSC Bellissima", status: "operational", class: "Meraviglia" },
  { name: "MSC Meraviglia", status: "operational", class: "Meraviglia" },
  { name: "MSC Lirica", status: "operational", class: "Lirica" },
  { name: "MSC Armonia", status: "operational", class: "Lirica" },
  { name: "MSC Opera", status: "operational", class: "Lirica" },
  { name: "MSC Sinfonia", status: "operational", class: "Lirica" },
  { name: "MSC Magnifica", status: "operational", class: "Musica" },
  { name: "MSC Divina", status: "operational", class: "Fantasia" },
  { name: "MSC Preziosa", status: "operational", class: "Fantasia" },
  { name: "MSC Splendida", status: "operational", class: "Fantasia" },
  { name: "MSC Fantasia", status: "operational", class: "Fantasia" },
  { name: "MSC Orchestra", status: "operational", class: "Musica" },
  { name: "MSC Poesia", status: "operational", class: "Musica" },
  { name: "MSC World Europa", status: "operational", class: "World" },
  { name: "MSC World America", status: "upcoming", class: "World" },
  { name: "MSC Euribia", status: "operational", class: "World" },
  { name: "MSC Seascape", status: "operational", class: "Seaside" },
  { name: "MSC Musica", status: "operational", class: "Musica" },
];

export const mscShipsClasses = [
  "Meraviglia",
  "Seaside",
  "Lirica",
  "Musica",
  "Fantasia",
  "World",
];

export const mscCabinNames: CabinNames[] = [
  { name: "Inside" },
  { name: "Oceanview" },
  { name: "Balcony" },
  { name: "Suite" },
];
