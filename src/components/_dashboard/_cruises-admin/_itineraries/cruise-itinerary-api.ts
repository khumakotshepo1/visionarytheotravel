type cruiseItineraryApiType = {
  name: string;
  location: string[];
};

export const cruiseItineraryApi: cruiseItineraryApiType[] = [
  {
    name: "pomene",
    location: ["durban", "sea", "portuguese island", "pomene"],
  },

  {
    name: "durban2nowhere",
    location: ["durban", "sea"],
  },

  {
    name: "portuguese island",
    location: ["durban", "portuguese island", "sea"],
  },
  {
    name: "cape town",
    location: ["durban", "sea", "cape town"],
  },
];
