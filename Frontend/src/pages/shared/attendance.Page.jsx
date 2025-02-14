import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepickers.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Fab,
} from "@mui/material";
import FloatingButton from "../../utils/floatingACtionSave.jsx";

import {convertTOAMPM,formatDate } from "../../utils/formatDate.js";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

import {exportToExcel} from "./exportToExcel.js";

const AttendanceTable = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [filter, setFilter] = useState({ name: "", section: "" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredData, setFilteredData] = useState([]); // Initially empty array

  const queryClient = useQueryClient();

  // Fetch student logs
  const { data: students_logs, isLoading, error } = useQuery({
    queryKey: ["students_logs"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_URL}/api/student-logs`);
        console.log("🚀 ~ file: attendance.Page.jsx ~ line 47 ~ queryFn ~ response", response);
        console.log(response.data.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching verified users:", error);
        throw new Error("Failed to fetch student logs.");
      }
    },
  });

  // Update filteredData when students_logs is fetched
  useEffect(() => {
    if (students_logs) {
      setFilteredData(students_logs.data);
    }
  }, [students_logs]);

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error loading users.</p>;

  const handleFilterChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleDateChange = (update) => {
    setDateRange(update);
  };

  const handleFilter = () => {
    const [startDate, endDate] = dateRange;

    setFilteredData(
      students_logs.data.filter((entry) => {
        const entryDate = new Date(entry.log_date); // Convert string date to Date object

        // Ensure we don't modify the original Date objects
        const normalizedStartDate = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const normalizedEndDate = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        return (
          (filter.name === "" || entry.name.toLowerCase().includes(filter.name.toLowerCase())) &&
          (filter.section === "" || entry.section === filter.section) &&
          (!startDate || (entryDate >= normalizedStartDate && entryDate <= normalizedEndDate))
        );
      })
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "2px" }}>
        <div style={{ flex: 3 }}>
          <TextField
            label="Search Name"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          />
        </div>
        <div style={{ flex: 2 }}>
          <TextField
            select
            label="Select Section"
            name="section"
            value={filter.section}
            onChange={handleFilterChange}
            variant="outlined"
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            {students_logs.sections.map((section) => {
              return <MenuItem key={section} value={section}>{section}</MenuItem>;
            })}

          </TextField>
        </div>
        <div style={{ flex: 2 }}>
          <DatePicker
            selected={dateRange[0]}
            onChange={handleDateChange}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            selectsRange
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date range"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="custom-datepicker"
          />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button variant="contained" color="primary" sx={{ height: "100%", width: "100%" }} onClick={handleFilter}>
            Filter
          </Button>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Section</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.section}</TableCell>
                <TableCell>{formatDate(row.log_date)}</TableCell>
                <TableCell>{convertTOAMPM(row.time_in)}</TableCell>
                <TableCell>{convertTOAMPM(row.time_out)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <FloatingButton onClick={() => exportToExcel(filteredData)} />

    </div>
  );
};

export default AttendanceTable;
