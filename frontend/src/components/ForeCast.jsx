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
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ForeCastBanner from "./ForeCastBanner";
import ForeCastCard from "./ForeCastCard";
import { subscribeDaily } from "../utils/api";
import WeatherImage from "../assets/WeatherImage.png";

const ForeCast = ({ weatherData, day, handleSearch }) => {
  const toast = useToast();
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
              .then((res) => {
                console.log(res);
                if (
                  res.data &&
                  res.data.message &&
                  res.data.message === "Subscribe successful"
                ) {
                  toast({
                    title: "Subscribe successful",
                    description:
                      "You will receive email about weather forecast daily.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: "Unsubscribe successful",
                    description:
                      "You won't receive email about weather forecast daily anymore.",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              })
              .catch((error) => {
                console.error("Subscription failed:", error);
              });
          });
        } else {
          console.log("Geolocation is not available in your browser.");
        }
        resetForm();
      } catch (error) {
        alert("Subscription failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Flex w="100%" flexDir="column" gap="10px">
      {!isEmptyObject(weatherData) && (
        <>
          <ForeCastBanner weatherData={weatherData} />
          <Heading as="h1" size="lg" color="black">
            {day}-Day Forecast
          </Heading>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={[3, 4]}
          >
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
        </>
      )}
      {isEmptyObject(weatherData) && (
        <VStack w="full" justifyContent="center" gap="5px">
          <Image src={WeatherImage} alt="Weather Image" />
          <Text fontWeight="700" fontSize="2rem" color="weather.gray">
            View a city's weather forecast by searching for it in the search
          </Text>
        </VStack>
      )}
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.email && formik.errors.email}>
          <FormLabel fontSize="1rem" color="weather.gray" fontWeight="700">
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
          Subscribe/Unsubscribe
        </Button>
      </form>
    </Flex>
  );
};

export default ForeCast;
