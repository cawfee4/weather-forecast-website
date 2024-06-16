import {
  Heading,
  Flex,
  Grid,
  Button,
  FormControl,
  Input,
  FormLabel,
  VStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ForeCastBanner from "./ForeCastBanner";
import ForeCastCard from "./ForeCastCard";
import { subscribeDaily } from "../utils/api";
import WeatherImage from "../assets/WeatherImage.png";

const ForeCast = ({ weatherData, day, handleSearch }) => {
  const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            subscribeDaily({
              address: values.email,
              location: `${latitude},${longitude}`,
            })
              .then(() => {
                console.log("Subscription successful.");
              })
              .catch((error) => {
                console.error("Subscription failed:", error);
              });
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
        resetForm();
        alert("Subscribed successfully!");
      } catch (error) {
        alert("Subscription failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return !isEmptyObject(weatherData) ? (
    <Flex w="100%" flexDir="column" gap="10px">
      <ForeCastBanner weatherData={weatherData} />
      <Heading as="h1" size="lg" color="weather.gray">
        {day}-Day Forecast
      </Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap={[3, 4]}>
        {weatherData.forecast.map((day, index) => (
          <ForeCastCard key={index} day={day} />
        ))}
      </Grid>
      {day <= 12 ? (
        <Button
          paddingY="20px"
          maxW="max-content"
          variant="Gray"
          onClick={() => {
            let increment = true;
            handleSearch(increment);
          }}
        >
          Show more
        </Button>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel fontSize="1.2rem" fontWeight="bold">
            Register to get daily weather forecasts
          </FormLabel>
          <Input
            id="email"
            w="fit-content"
            name="email"
            type="email"
            placeholder="Enter your email here"
            border="1px solid rgba(68,68,68,0.8)"
            borderRadius="8px"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={formik.isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Flex>
  ) : (
    <VStack w="full" justifyContent="center" gap="5px">
      <Image src={WeatherImage} alt="Weather Image" />
      <Text fontWeight="700" fontSize="2rem">
        View a city's weather forecast by searching for it in the search
      </Text>
    </VStack>
  );
};

export default ForeCast;
