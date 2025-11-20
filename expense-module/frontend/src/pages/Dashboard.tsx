import React, { useEffect, useState } from "react";
import { api } from "../api";
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

export default function Dashboard() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    api.get("/api/expenses").then(res => setItems(res.data)).catch(console.error);
  }, []);

  const approve = async (id: string) => {
    await api.post(`/api/expenses/${id}/approve`, new URLSearchParams({ comment: "Approved" }));
    setItems(items.map(i => i.id === id ? { ...i, status: "APPROVED" } : i));
  };
  const reject = async (id: string) => {
    await api.post(`/api/expenses/${id}/reject`, new URLSearchParams({ comment: "Rejected" }));
    setItems(items.map(i => i.id === id ? { ...i, status: "REJECTED" } : i));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Recent Expenses</Typography>
      <Table size="small">
        <TableHead>
          <TableRow><TableCell>Employee</TableCell><TableCell>Amount</TableCell><TableCell>Status</TableCell><TableCell>Actions</TableCell></TableRow>
        </TableHead>
        <TableBody>
          {items.map(i => (
            <TableRow key={i.id}>
              <TableCell>{i.employee_name} ({i.employee_id})</TableCell>
              <TableCell>{i.amount} {i.currency}</TableCell>
              <TableCell>{i.status}</TableCell>
              <TableCell>
                <Button size="small" href={`/uploads/${i.file_path}`} target="_blank">View</Button>
                {i.status === "PENDING" && <>
                  <Button size="small" onClick={() => approve(i.id)}>Approve</Button>
                  <Button size="small" color="error" onClick={() => reject(i.id)}>Reject</Button>
                </>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
