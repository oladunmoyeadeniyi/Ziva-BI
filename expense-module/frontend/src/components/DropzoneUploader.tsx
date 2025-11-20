import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { api } from "../api";

const categories = ["Travel","Meals","Office","Other"];
const currencies = ["NGN","USD","EUR"];

export default function DropzoneUploader() {
  const [employeeName, setEmployeeName] = useState("John Doe");
  const [employeeId, setEmployeeId] = useState("E-001");
  const [amount, setAmount] = useState<number | "">("");
  const [currency, setCurrency] = useState("NGN");
  const [category, setCategory] = useState("Travel");
  const [status, setStatus] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    setStatus("Uploading...");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("employee_name", employeeName);
      fd.append("employee_id", employeeId);
      fd.append("amount", String(amount || 0));
      fd.append("currency", currency);
      fd.append("category", category);

      const res = await api.post("/api/expenses", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`Expense submitted (ID: ${res.data.id})`);
      setTimeout(() => window.location.reload(), 800);
    } catch (err: any) {
      console.error(err);
      setStatus(err?.response?.data?.detail || "Upload failed");
    }
  }, [employeeName, employeeId, amount, currency, category]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "application/pdf": [], "image/png": [], "image/jpeg": [] }
  });

  return (
    <div>
      <Box {...getRootProps()} sx={{
        border: "2px dashed",
        borderColor: isDragActive ? "primary.main" : "grey.300",
        p: 3, textAlign: 'center', borderRadius: 2, background: "#fff"
      }}>
        <input {...getInputProps()} />
        <p>Drag & drop a receipt here, or click to select</p>
      </Box>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        <TextField label="Employee Name" value={employeeName} onChange={(e)=>setEmployeeName(e.target.value)} />
        <TextField label="Employee ID" value={employeeId} onChange={(e)=>setEmployeeId(e.target.value)} />
        <TextField label="Amount" type="number" value={amount} onChange={(e)=>setAmount(parseFloat(e.target.value)||"")} />
        <TextField select label="Currency" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
          {currencies.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField select label="Category" value={category} onChange={(e)=>setCategory(e.target.value)}>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <div>{status}</div>
      </Box>
    </div>
  );
}
