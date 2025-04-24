"use client";

import { Container, Flex, Box } from "@radix-ui/themes";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container size={{ initial: "1", sm: "2", md: "3", lg: "4" }} className='px-4 py-6 min-h-dvh'>
      <Flex direction='column' gap='4' className='mx-auto max-w-screen-lg'>
        <Box className='flex-grow'>{children}</Box>
      </Flex>
    </Container>
  );
}
