import React from "react";
import { Container, Box, Typography } from "@mui/material";
import Todolist from "./Todolist";

export default function TodoDesign() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: "#1e1e2f",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          color: "#fff",
        }}
      >
        {/* عنوان Todo List */}
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          My Todo List
        </Typography>
        <Todolist />
      </Box>
    </Container>
  );
}
