import { APP_URL, DEFAULT_PAYMENT_AMOUNT, DEFAULT_PAYMENT_CURRENCY, RECEIVER_ADDRESS, SPOTS_PER_SLOT } from "@/constants";
import { sdk } from "@/lib/sdk";
import { createMemoId } from "@/lib/utils";
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
  console.log("🚀 bookings:", bookings);

  const handleBooking = async (spotId: number) => {
    console.log("Booking...");

    try {
      // TODO: data validation

      const memoId = createMemoId(date, time, spotId);
      console.log("🚀 memoId chars", memoId.length); // max 32 (bytes = utf-8 chars)

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

        // Log the expected redirect URL for debugging
        const expectedUrl = new URL(redirectUrl);
        expectedUrl.searchParams.set("memo", memoId);
        expectedUrl.searchParams.set("amount", DEFAULT_PAYMENT_AMOUNT.toString());
        expectedUrl.searchParams.set("currency", DEFAULT_PAYMENT_CURRENCY);
        console.log("Expected redirect URL:", expectedUrl.toString());
      }

      // Request payment
      const { chainId, txHash } = await sdk.requestPayment(paymentConfig);

      console.log("🚀 txHash:", txHash);
      console.log("🚀 chainId:", chainId);
      // If we're here, payment was successful
      // onPaymentComplete();
    } catch (error) {
      console.log("🚀 error:", error);
      //     let errorMessage = "Payment failed. Please try again.";
      //     if ((error as Error).message === 'Payment was cancelled') {
      //       errorMessage = "Payment was cancelled by user";
      //     } else if ((error as Error).message === 'Payment request timed out') {
      //       errorMessage = "Payment request timed out";
      //     } else if ((error as Error).message.includes('ENS name not found')) {
      //       errorMessage = "Payment recipient not found";
      //     } else if ((error as Error).message.includes('Redirect URL is required')) {
      //       errorMessage = "Redirect URL is required when not in iframe mode";
      //     } else {
      //       console.error("Payment error:", error);
      //     }
      //     toast({
      //       title: "Payment Error",
      //       description: errorMessage,
      //       variant: "destructive",
      //     });
      //     setProcessing(false);
      //   }
    }
  };

  const getBookingForSpot = (spotId: number) => {
    return bookings.find(booking => booking.memo === createMemoId(date, time, spotId));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Card className='flex-1'>
          <Flex direction='column' align='center' gap='2' minWidth='100px'>
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
                // Parse the date string from "YYYY-DD-MM" format
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
                <Text># {idx + bookings.length}</Text>
                {getBookingForSpot(idx + 1) ? (
                  <Text>{getBookingForSpot(idx + 1)?.receiverEnsPrimaryName}</Text>
                ) : (
                  <Button onClick={() => handleBooking(idx + 1)}>Book</Button>
                )}
              </Flex>
            </Card>
          ))}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
