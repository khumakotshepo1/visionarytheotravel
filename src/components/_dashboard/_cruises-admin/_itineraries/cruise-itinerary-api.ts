type cruiseItineraryApiType = {
  name: string;
  location: string[];
};

export const cruiseItineraryApi: cruiseItineraryApiType[] = [
  {
    name: "pomene",
    location: ["durban", "sea", "pomene"],
  },
  {
    name: "portuguese & pomene",
    location: ["durban", "portuguese island", "pomene", "sea"],
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
