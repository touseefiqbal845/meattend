import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

interface CustomPaginationProps {
  paginationLength: number;
  pageNumber: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  paginationLength,
  pageNumber,
  handlePageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" flexGrow={1}>
      <Pagination
        count={paginationLength}
        shape="rounded"
        color="primary"
        onChange={handlePageChange}
        page={pageNumber}
        sx={{
          "& .MuiPagination-ul": { backgroundColor: "#FFF" },
          "& .MuiPaginationItem-page": {
            color: "#A0A3B5",
            border: "1px solid #A0A3B5",
            borderRadius: 2,
          },
          "& .Mui-selected": {
            backgroundColor: "#FFC000",
            color: "black",
            borderWidth: 0,
            ":hover": {
              backgroundColor: "#FFC000",
            },
          },
          "& .MuiPagination-ul li:last-child": {
            marginLeft: "16px",
          },
          "& .MuiPagination-ul li:last-child button::before": {
            content: "'Next'",
            marginRight: "8px",
            fontWeight: 700,
          },
          "& .MuiPagination-ul li:first-child": {
            marginRight: "16px",
          },
          "& .MuiPagination-ul li:first-child button::after": {
            content: "'Prev'",
            marginLeft: "8px",
            fontWeight: 700,
          },
          "& .MuiPagination-ul > li:first-of-type > button .MuiSvgIcon-root, .MuiPagination-ul > li:last-of-type > button .MuiSvgIcon-root": {
            display: "none",
          },
        }}
      />
    </Box>
  );
};

export default CustomPagination;
