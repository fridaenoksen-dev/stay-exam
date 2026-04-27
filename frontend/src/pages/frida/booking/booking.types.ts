export type Booking = {
  id: number;
  userId: number;
  roomId: number;
  fromDate: string;
  toDate: string;
  status: string;
  message: string;
  created: string;
  updated: string;
};

export type Room = {
  id: number;
  name: string;
  pricePrNight: number;
  description: string;
  features: string[];
  maxGuests: number;
  created: string;
  updated: string;
};
