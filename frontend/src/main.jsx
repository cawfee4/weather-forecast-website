import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import theme from "./theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={extendTheme(theme)}>
    <App />
  </ChakraProvider>
);
