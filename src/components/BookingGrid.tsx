"use client";

import { createMemoId, getTuesdaysAndThursdaysFromNow } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Text, Card, Grid, Flex } from "@radix-ui/themes";
import { BookingSlot } from "./BookingSlot";
import { useBookings } from "@/providers/BookingsProvider";
import { EARLY_TIME, LATE_TIME } from "@/constants";

const dates = getTuesdaysAndThursdaysFromNow(new Date(2025, 4, 31));

export const BookingGrid = () => {
  const { bookings, isLoading, error } = useBookings();
  // console.log("🚀 bookings:", bookings);

  const getBookingsForSlot = (date: string, time: string) => {
    // console.log("🚀 date:", date + time);
    // return bookings?.filter(booking => booking.memo.includes(`ipe-canoe-${date}-${time}`)) || [];
    return bookings?.filter(booking => booking.memo.includes(createMemoId(date, time))) || [];
  };

  const getTimeForSlot = (idx: number) => {
    return idx % 2 === 0 ? EARLY_TIME : LATE_TIME;
  };

  return (
    <Grid columns={{ xs: "1", sm: "2", md: "3" }} gap='4'>
      {dates.map((date, idx) => (
        <Card
          key={date}
          size='3'
          variant={idx % 2 === 0 ? "surface" : "classic"}
          className={idx % 2 === 0 ? "bg-[var(--accent-2)]" : "bg-[var(--accent-3)]"}>
          <Flex direction='column' gap='2'>
            <Flex align='center' gap='2' className='font-bold text-lg'>
              <CalendarIcon />
              <Text as='p'>{date}</Text>
            </Flex>
            <Flex gap='8' justify='center'>
              {Array.from({ length: 2 }).map((_, idx) => (
                <BookingSlot key={idx + date} time={getTimeForSlot(idx)} date={date} bookings={getBookingsForSlot(date, getTimeForSlot(idx))} />
              ))}
            </Flex>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};
