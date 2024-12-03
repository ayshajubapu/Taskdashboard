import React, { useState } from "react";
import { Box, Button } from "@mui/material";

const FilterBar = ({ filter, setFilter }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setIsDropdownOpen(false); // Close dropdown after selecting an option
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      {/* Filter dropdown */}
      <Box sx={{ position: "relative", marginTop: "10px" }}>
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          variant="outlined"
          sx={{ fontWeight: "normal", padding: "10px", marginRight: "10px" }}
        >
          Sort By:{" "}
          {filter === "all"
            ? "All Tasks"
            : filter.charAt(0).toUpperCase() + filter.slice(1)}
        </Button>
        {isDropdownOpen && (
          <Box
            sx={{
              position: "absolute",
              top: "40px",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              width: "150px",
            }}
          >
            <Button
              onClick={() => handleFilterChange("all")}
              fullWidth
              sx={{
                textAlign: "left",
                backgroundColor: filter === "all" ? "#e0e0e0" : "white",
                padding: "10px",
              }}
            >
              All Tasks
            </Button>
            <Button
              onClick={() => handleFilterChange("completed")}
              fullWidth
              sx={{
                textAlign: "left",
                backgroundColor: filter === "completed" ? "#e0e0e0" : "white",
                padding: "10px",
              }}
            >
              Completed
            </Button>
            <Button
              onClick={() => handleFilterChange("pending")}
              fullWidth
              sx={{
                textAlign: "left",
                backgroundColor: filter === "pending" ? "#e0e0e0" : "white",
                padding: "10px",
              }}
            >
              Pending
            </Button>
            <Button
              onClick={() => handleFilterChange("dueDate")}
              fullWidth
              sx={{
                textAlign: "left",
                backgroundColor: filter === "dueDate" ? "#e0e0e0" : "white",
                padding: "10px",
              }}
            >
              Due Date
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FilterBar;
