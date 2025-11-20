import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from "@mui/material";
import theme from "./theme";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ziva BI — Expense Module</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}><UploadPage /></Box>
          <Box sx={{ flex: 1 }}><Dashboard /></Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
