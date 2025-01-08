import React from "react";
import { Divider, Typography, Box } from "@mui/material";


const DividerWithText = ({ text  }) => {
 return (
     <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
         <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
         <Typography sx={{ mx: 2, color: "gray" }}> {text} </Typography>
         <Divider sx={{ flexGrow: 1, borderColor: "gray" }} />
     </Box>
 );
};
export default DividerWithText;