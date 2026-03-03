import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function Mysnackbar({ response, error }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (response) {
      setMessage(response);
      setOpen(true);
    } else if (error) {
      setMessage(error);
      setOpen(true);
    }
  }, [response, error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
