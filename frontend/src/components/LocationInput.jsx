import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Divider,
  Text,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

const LocationInput = ({
  handleInputChange,
  cityList,
  setCurrentCity,
  handleSearch,
  setIsUsingLocation,
}) => {
  return (
    <Flex>
      <FormControl>
        <Flex flexDir="column" gap="10px">
          <FormLabel fontSize="1.2rem" fontWeight="bold">
            Enter a City Name
          </FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              variant="outline"
              placeholder="Eg., New York, London, Tokyo"
              bgColor="#F3F4F6"
              border="none"
              borderRadius="10px"
              fontSize="0.875rem"
              fontWeight="400"
              focusBorderColor="gray.400"
              onChange={(e) => {
                handleInputChange(e);
                setCurrentCity(e.target.value);
              }}
            />
            <AutoCompleteList>
              {cityList.map((city) => (
                <AutoCompleteItem
                  key={city.id}
                  value={city.name}
                  onClick={() => {
                    setCurrentCity(city.name);
                  }}
                >
                  {city.name}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
          <Button
            variant="Blue"
            fontWeight="300"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
          <Flex align="center">
            <Divider borderColor="black" />
            <Text px="2" fontSize="0.875rem" color="gray.600">
              Or
            </Text>
            <Divider borderColor="black" />
          </Flex>
          <Button
            variant="Gray"
            onClick={() => setIsUsingLocation(true)}
            fontWeight="300"
          >
            Use Current Location
          </Button>
        </Flex>
      </FormControl>
    </Flex>
  );
};

export default LocationInput;
