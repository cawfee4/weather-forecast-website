import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system";

export default {
  colors: {
    weather: {
      background: "#e3f2fd",
      blue: "#5372f0",
      gray: "#6c757d",
    },
  },
  fonts: {
    body: "Rubik, sans-serif",
    heading: "Rubik, sans-serif",
  },
  components: {
    Button: {
      variants: {
        Blue: {
          color: "white",
          paddingX: "40px",
          bg: "weather.blue",
          _hover: {
            bg: "gray.400",
          },
        },
        Gray: {
          color: "white",
          paddingX: "40px",
          bg: "weather.gray",
          _hover: {
            bg: "#495057",
          },
        },
      },
    },
  },
};
