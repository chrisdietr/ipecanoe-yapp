"use client";

import { RECEIVER_ADDRESS } from "@/constants";
import { sdk } from "@/lib/sdk";
import { PaymentSimple } from "@yodlpay/yapp-sdk";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type BookingsContextType = {
  isLoading: boolean;
  bookings: PaymentSimple[] | null;
  error: Error | null;
  refreshBookings: () => Promise<void>;
};

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider");
  }
  return context;
}

type BookingsProviderProps = {
  children: ReactNode;
};

export function BookingsProvider({ children }: BookingsProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<PaymentSimple[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const allBookings: PaymentSimple[] = [];
      const perPage = 100;
      let page = 1;
      let hasMoreData = true;

      // Loop through pages until we've fetched all data
      while (hasMoreData) {
        // Get bookings from the payments API
        const response = await sdk.getPayments({
          receiver: RECEIVER_ADDRESS,
          page,
          perPage,
          sortBy: "blockTimestamp",
          sortDir: "desc",
        });

        // Check if the response is an error
        if ("error" in response) throw new Error(response.error);

        if (response.payments.length > 0) {
          allBookings.push(...response.payments);
          page++;
        }
        hasMoreData = response.payments.length === perPage;
      }

      setBookings(allBookings);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch bookings"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const value = {
    isLoading,
    bookings,
    error,
    refreshBookings: fetchBookings,
  };

  return <BookingsContext.Provider value={value}>{children}</BookingsContext.Provider>;
}
