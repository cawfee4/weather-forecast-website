import { Flex, Heading, Image, Text } from "@chakra-ui/react";

const HistoryCard = ({ history, setWeatherData, setDay, setCurrentCity }) => (
  <Flex
    borderRadius="5px"
    bgColor="weather.blue"
    _hover={{ cursor: "pointer" }}
    padding="10px"
    onClick={() => {
      setCurrentCity(history.city);
      setWeatherData(history);
      setDay(history.day);
    }}
    color="white"
    justifyContent="space-between"
  >
    <Flex flexDir="column">
      <Heading as={"h2"} size="md">
        {history.city}
      </Heading>
      <Text as={"h2"} size="md">
        {history.date}
      </Text>
      <Text as={"h3"} size="sm">
        {history.condition}
      </Text>
    </Flex>

    <Image src={history.icon} alt={history.condition} />
  </Flex>
);

export default HistoryCard;
