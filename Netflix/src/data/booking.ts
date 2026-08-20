export type Booking = {
  movie: string;
  seats: string;
  date: string;
  time: string;
  total: string;
};

export let latestBooking: Booking | null = null;

export function saveBooking(booking: Booking) {
  latestBooking = booking;
}
