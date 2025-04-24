import { BookingGrid } from "@/components/BookingGrid";
import { getTuesdaysAndThursdaysFromNow } from "@/lib/utils";
import { Heading, Flex, Separator } from "@radix-ui/themes";

// const dates = [
//   "2025-24-04",
//   "2025-29-04",
//   "2025-01-05",
//   "2025-06-05",
//   "2025-08-05",
//   "2025-13-05",
//   "2025-15-05",
//   "2025-20-05",
//   "2025-22-05",
//   "2025-27-05",
//   "2025-29-05",
//   "2025-31-05",
// ];

// const dates = getTuesdaysAndThursdaysFromNow(new Date(2025, 4, 31));

export default function Home() {
  return (
    <Flex direction='column' gap='4'>
      <Flex direction='column' gap='2'>
        <Heading size='6' className='text-center sm:text-left' color='gray'>
          Book Your Canoe Adventure
        </Heading>
        <Heading size='3' className='text-center sm:text-left' color='indigo'>
          Select a date and time for your canoe rental
        </Heading>
      </Flex>
      <Separator className='mx-auto' size='4' />

      <BookingGrid />
    </Flex>
  );
}
