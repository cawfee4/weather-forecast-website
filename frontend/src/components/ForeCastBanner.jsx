import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

const ForeCastBanner = ({ weatherData }) => {
  return (
    <Flex bgColor={"weather.blue"} borderRadius="4px" p="20px" w="100%">
      <Flex justifyContent="space-between" w="full">
        <Flex flexDir="column" justifyContent="space-between" gap="20px">
          <Heading as="h2" size="md" color="white">
            {weatherData.city} ({weatherData.date})
          </Heading>
          <Text color="white">
            Temperature: {weatherData.temperature} &#8451;
          </Text>
          <Text color="white">Wind: {weatherData.wind} M/S</Text>
          <Text color="white">Humidity: {weatherData.humidity}%</Text>
        </Flex>
        <Flex
          ml={4}
          flexDir={"column"}
          w={"200px"}
          alignItems="center"
          justifyContent="center"
        >
          <Image src={weatherData.icon} alt="Weather Icon" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ForeCastBanner;
