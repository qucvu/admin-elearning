import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {"Copyright © "}
      <Box component="span" sx={{ fontStyle: "italic", fontWeight: "bold" }}>
        E-learning
      </Box>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
