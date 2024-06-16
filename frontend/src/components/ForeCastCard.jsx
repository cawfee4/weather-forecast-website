import { Flex, Text, Image, useBreakpointValue } from "@chakra-ui/react";

const ForeCastCard = ({ day }) => {
  const paddingRight = useBreakpointValue({
    base: "0px",
    md: "20px",
    lg: "40px",
  });

  return (
    <Flex
      bg="weather.gray"
      borderRadius="10px"
      flexDir="column"
      p="20px"
      pr={paddingRight}
      gap="10px"
      justifyContent="space-between"
    >
      <Text color="white" fontWeight="bold">
        {day.date}
      </Text>
      <Image
        w={{ base: "100px", md: "150px", lg: "200px" }}
        src={day.icon}
        alt="Weather Icon"
      />
      <Text color="white">Temp: {day.temperature} &#8451;</Text>
      <Text color="white">Wind: {day.wind} M/S</Text>
      <Text color="white">Humidity: {day.humidity}%</Text>
    </Flex>
  );
};

export default ForeCastCard;
