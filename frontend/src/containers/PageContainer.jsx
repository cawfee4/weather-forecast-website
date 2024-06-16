import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import LocationInput from "../components/LocationInput";
import Header from "../components/Header";
import ForeCast from "../components/ForeCast";
import { getWeather, getForecast } from "../utils/api";
import { useEffect, useState } from "react";
import HistoryCard from "../components/HistoryCard";

const PageContainer = () => {
  const [input, setInput] = useState("");
  const [cityList, setCityList] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [isUsingLocation, setIsUsingLocation] = useState(false);
  const [location, setLocation] = useState(null);
  const [day, setDay] = useState(4);
  const [weatherHistory, setWeatherHistory] = useState([]);

  useEffect(() => {
    // Load weather history from localStorage when the component mounts
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setWeatherHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (isUsingLocation) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
      if (location) {
        setLocation(location);
      }
      setIsUsingLocation(false);
    }
  }, [isUsingLocation]);

  useEffect(() => {
    const fetchData = async () => {
      getForecast({
        city: `${location.latitude},${location.longitude}`,
        day: 4,
      }).then((data) => {
        setCurrentCity(data.city);
        setDay(4);
        addHistory(data, 4);
        setWeatherData(data);
      });
    };
    if (location && location.latitude && location.longitude) {
      fetchData();
    }
  }, [location]);

  useEffect(() => {
    async function fetchData() {
      setCityList([]);
      try {
        const data = await getWeather(input);
        if (Array.isArray(data)) {
          setCityList(data);
        } else {
          setCityList([]);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setCityList([]);
      }
    }
    if (input) {
      fetchData();
    }
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addHistory = (data, day) => {
    let history = { ...data, day };
    if (
      weatherHistory.some(
        (historyItem) =>
          historyItem.city === history.city && historyItem.day === history.day
      )
    ) {
      return;
    } else if (
      weatherHistory.some(
        (historyItem) =>
          historyItem.city === history.city && historyItem.day !== history.day
      )
    ) {
      let newHistory = weatherHistory.filter(
        (historyItem) => historyItem.city !== history.city
      );
      newHistory.push(history);
      localStorage.setItem("history", JSON.stringify(newHistory));
      setWeatherHistory(newHistory);
    } else {
      let newHistory = [...weatherHistory, history];
      setWeatherHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
  };

  const handleSearch = (increment) => {
    const getDay = (increment) => {
      if (increment) {
        return day === 12 ? 14 : day + 4;
      }
      return 4;
    };
    if (currentCity) {
      const newDay = getDay(increment);
      setDay(newDay);
      getForecast({ city: currentCity, day: newDay }).then((data) => {
        localStorage.setItem("history", JSON.stringify(weatherHistory));
        setWeatherData(data);
        addHistory(data, newDay);
      });
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem("history");
    setWeatherHistory([]);
    setDay(4);
    setCityList([]);
    setWeatherData({});
    setCurrentCity(null);
  };

  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  return (
    <Flex flexDir="column" bg="weather.background" minH="100vh" w="full">
      <Header />
      <Flex
        p="20px"
        flexDir={isLargerThan768 ? "row" : "column"}
        gap={isLargerThan768 ? "50px" : "20px"}
      >
        <Flex flexDir="column" gap="20px">
          <LocationInput
            handleInputChange={handleInputChange}
            cityList={cityList}
            setCurrentCity={setCurrentCity}
            handleSearch={handleSearch}
            setIsUsingLocation={setIsUsingLocation}
          />
          <Flex flexDir="column">
            <Flex
              spacing="10px"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text fontSize="1.2rem" fontWeight="bold">
                Search History
              </Text>
              <Text
                fontSize="0.875rem"
                fontWeight="300"
                _hover={{
                  color: "blue.500",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={handleClearHistory}
              >
                Clear History
              </Text>
            </Flex>
            <Flex flexDir="column" gap="10px">
              {weatherHistory.map((history, index) => (
                <HistoryCard
                  key={index}
                  setCurrentCity={setCurrentCity}
                  history={history}
                  setWeatherData={setWeatherData}
                  setDay={setDay}
                />
              ))}
            </Flex>
          </Flex>
        </Flex>
        <ForeCast
          weatherData={weatherData}
          day={day}
          setDay={setDay}
          handleSearch={handleSearch}
        />
      </Flex>
    </Flex>
  );
};

export default PageContainer;
