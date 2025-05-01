import { BookingGrid } from "@/components/BookingGrid";
import { DEFAULT_PAYMENT_AMOUNT } from '@/constants';
import { DEFAULT_PAYMENT_CURRENCY } from '@/constants';
import { Heading, Flex, Separator } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex direction='column' gap='4'>
      <Flex direction='column' gap='2'>
        <Heading size='6' className='text-center sm:text-left' color='gray'>
          Book Your Koru Va´a Canoe Adventure
        </Heading>
        <Heading size='3' className='text-center sm:text-left' color='indigo'>
          Select a date and time to rent
        </Heading>
        <Heading size='1' className='text-center sm:text-left' color='indigo'>
          Rental fee: {DEFAULT_PAYMENT_AMOUNT} {DEFAULT_PAYMENT_CURRENCY}
        </Heading>
      </Flex>
      <Separator className='mx-auto' size='4' />

      <BookingGrid />
    </Flex>
  );
}
