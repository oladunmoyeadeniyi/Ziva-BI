import React from "react";
import DropzoneUploader from "../components/DropzoneUploader";
import { Paper, Typography } from "@mui/material";

export default function UploadPage() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Submit Expense</Typography>
      <DropzoneUploader />
    </Paper>
  );
}
