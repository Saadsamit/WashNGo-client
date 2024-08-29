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
export type TCustomer = {
  _id: string;
  name: string;
  email: string;
  phone: number;
  role: string;
  address: string;
};
export type TBooking = {
  _id: string;
  service: TService;
  customer: TCustomer;
  slot: TSlot;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
};
export type TReview = {
  _id: string;
  user: TCustomer;
  feedback: string;
  rating: number;
};
