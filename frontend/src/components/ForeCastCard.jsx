import { Flex, Text, Image } from "@chakra-ui/react";

const ForeCastCard = ({ day }) => {
  return (
    <Flex
      bg="weather.gray"
      borderRadius="10px"
      flexDir="column"
      p="20px"
      pr="40px"
      gap="10px"
      justifyContent="space-between"
    >
      <Text color="white" fontWeight="bold">
        {day.date}
      </Text>
      <Image w={"200px"} src={day.icon} alt="Weather Icon" />
      <Text color="white">Temp: {day.temperature} &#8451;</Text>
      <Text color="white">Wind: {day.wind} M/S</Text>
      <Text color="white">Humidity: {day.humidity}%</Text>
    </Flex>
  );
};

export default ForeCastCard;
