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
    name: "durban",
    location: ["durban", "sea"],
  },

  {
    name: "portuguese island",
    location: ["durban", "portuguese island", "sea"],
  },
];