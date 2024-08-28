export type TService = {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  __v: number;
};
export type TSlot = {
  _id: string;
  service: TService;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};
