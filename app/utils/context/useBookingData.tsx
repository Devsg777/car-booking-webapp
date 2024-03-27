import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingStore {
  tripData: tripData | null;
  carData: carData | null;
  amountData: amountData | null;
  paymentIntentId: string | null;
  clientSecret: string | undefined;
  source: {
    lat: number;
    lng: number;
    name: string;
  };
  destination: {
    lat: number;
    lng: number;
    name: string;
  };
  setTripData: (tripData: tripData) => void;
  setCarData: (carData: carData) => void;
  setAmountData: (amountData: amountData) => void;
  setPaymentIntentId: (paymentIntentId: string) => void;
  setClientSecret: (clientSecret: string) => void;
  setSource: (source: { lat: number; lng: number; name: string }) => void;
  setDestination: (destination: {
    lat: number;
    lng: number;
    name: string;
  }) => void;
  reset: () => void;
}

type tripData = {
  serviceType: string | null;
  tripType: string | null;
  pickUpLocation: string | null;
  dropOutLocation: string | null;
  startTime: string | null;
  endTime: string | null;
  rentalPackage: string | null;
  airportTaxi: string | null;
};

type carData = {
  id: string | null;
  price: number | null;
  name: string | null;
  model: string | null;
  image: string | null;
  seats: number | null;
  description: string | null;
};
type amountData = {
  distance: number | null;
  amount: number | null;
};

const useBookingData = create<BookingStore>()(
  persist(
    (set) => ({
      tripData: null,
      carData: null,
      amountData: null,
      paymentIntentId: null,
      clientSecret: undefined,
      source: { lat: 0, lng: 0, name: "" },
      destination: { lat: 0, lng: 0, name: "" },
      setTripData: (data: tripData) => set({ tripData: data }),
      setCarData: (data: carData) => set({ carData: data }),
      setAmountData: (data: amountData) => set({ amountData: data }),
      setClientSecret: (data: string) => set({ clientSecret: data }),
      setPaymentIntentId: (paymentIntentId: string) => set({ paymentIntentId }),
      setSource: (source: { lat: number; lng: number; name: string }) =>
        set({ source: source }),
      setDestination: (destination: {
        lat: number;
        lng: number;
        name: string;
      }) => set({ destination: destination }),
      reset: () =>
        set({
          tripData: null,
          carData: null,
          amountData: null,
          paymentIntentId: null,
          clientSecret: undefined,
          source: { lat: 0, lng: 0, name: "" },
          destination: { lat: 0, lng: 0, name: "" },
        }),
    }),
    { name: "bookingStore" }
  )
);

export default useBookingData;
