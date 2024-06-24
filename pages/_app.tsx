import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import theme from "./theme";

export default function App({ Component, pageProps }: AppProps) {
  return   <ThemeProvider theme={theme}>
  <CssBaseline />
  <SnackbarProvider maxSnack={3}>
    <Component {...pageProps} />
  </SnackbarProvider>
</ThemeProvider>
}
