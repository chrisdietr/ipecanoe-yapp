import { APP_URL, DEFAULT_PAYMENT_AMOUNT, DEFAULT_PAYMENT_CURRENCY, RECEIVER_ADDRESS, SPOTS_PER_SLOT } from "@/constants";
import { sdk } from "@/lib/sdk";
import { createMemoId } from "@/lib/utils";
import { useBookings } from "@/providers/BookingsProvider";
import { CalendarIcon, Cross2Icon, PersonIcon, TimerIcon } from "@radix-ui/react-icons";
import { Text, Card, Flex, Button, Dialog } from "@radix-ui/themes";
import { isInIframe, PaymentRequestData, PaymentSimple } from "@yodlpay/yapp-sdk";
import { format, parse } from "date-fns";

type BookingSlotProps = {
  date: string;
  bookings: PaymentSimple[];
  time: string;
};

export const BookingSlot = ({ date, bookings, time }: BookingSlotProps) => {
  const { refreshBookings } = useBookings();

  const handleSubmitBooking = async (spotId: number) => {
    try {
      // TODO: data validation

      const memoId = createMemoId(date, time, spotId);

      // Create payment request config
      const paymentConfig: PaymentRequestData = {
        addressOrEns: RECEIVER_ADDRESS,
        amount: DEFAULT_PAYMENT_AMOUNT,
        currency: DEFAULT_PAYMENT_CURRENCY,
        memo: memoId,
      };

      // Only add redirectUrl when not in iframe mode
      if (!isInIframe()) {
        const redirectUrl = APP_URL; // TODO: add param/path for success message?
        console.log("Setting redirect URL:", redirectUrl);
        paymentConfig.redirectUrl = redirectUrl;
      }

      // Request payment
      await sdk.requestPayment(paymentConfig);

      // If we're here, payment was successful
      await refreshBookings();
    } catch (error) {
      console.log("🚀 error:", error);
    }
  };

  const getBookingForSpot = (spotId: number) => {
    return bookings.find(booking => booking.memo === createMemoId(date, time, spotId));
  };

  const getSenderEnsOrAddress = (id: number) => {
    const booking = getBookingForSpot(id);
    return booking?.senderEnsPrimaryName || booking?.senderAddress;
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card className='flex-1'>
          <Flex direction='column' align='center' gap='2' minWidth='100px' justify='center'>
            <Flex align='center' gap='2'>
              <TimerIcon />
              <Text as='p' weight='bold'>
                {time}
              </Text>
            </Flex>
            <Flex align='center' gap='2'>
              <PersonIcon />
              <Text as='p'>
                {bookings.length}/{SPOTS_PER_SLOT}
              </Text>
            </Flex>
          </Flex>
        </Card>
      </Dialog.Trigger>
      <Dialog.Content maxWidth='450px' maxHeight='400px'>
        <Flex justify='between' align='center'>
          <Dialog.Title>
            <Flex align='center' justify='center' gap='2'>
              <CalendarIcon />
              {(() => {
                const parsedDate = parse(date, "yyyy-dd-MM", new Date());
                return format(parsedDate, "MMMM d");
              })()}{" "}
              {time}
            </Flex>
          </Dialog.Title>
          <Dialog.Close>
            <Button size='1' variant='soft' color='gray'>
              <Cross2Icon />
            </Button>
          </Dialog.Close>
        </Flex>
        <Dialog.Description size='2' mb='4'>
          Pick an available spot
        </Dialog.Description>

        <Flex direction='column' gap='2'>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Card key={idx} className={getBookingForSpot(idx + 1) ? "bg-[var(--gray-4)]" : ""}>
              <Flex justify='between'>
                <Text># {idx + 1}</Text>
                {getBookingForSpot(idx + 1) ? (
                  <Text>{getSenderEnsOrAddress(idx + 1)}</Text>
                ) : (
                  <Button onClick={() => handleSubmitBooking(idx + 1)}>Book</Button>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
