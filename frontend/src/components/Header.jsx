import { Box, Flex, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box bg="weather.blue" w="100%" p={4} color="white">
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Heading as="h1" size="lg">
          Weather Dashboard
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
