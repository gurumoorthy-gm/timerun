import { green } from "@mui/material/colors";
import { styled, TableBody, TableCell } from "@mui/material";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "0",
        },
      },
    },
  },
});

export const tableStyles = {
  bgcolor: "background.paper",
  m: 1,
  border: 5,
  borderTop: 0,
  borderColor: green["A700"],
  width: "4rem",
  height: "25rem",
  minWidth: 450,
  margin: "1% 10% 5% 10%",
};

export const tableHeaderStyles = {
  display: "flex",
  justifyContent: "center",
  color: "white",
  fontSize: "larger"
};

export const CustomTableBody = styled(TableBody)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  flexWrap: "nowrap",
  alignItems: "center",
  height: "20rem",
  width: "100%",
});

export const titleDateStyles = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  marginLeft: "37%",
};

export const logoHeaderStyles = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  height: "5rem",
  marginLeft: "30%",
  padding: "12 12 12 0",
};

export const titleStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "70%",
  paddingLeft: "5",
  alignItems: "flex-start",
  marginTop: "3%",
  marginBottom: "3%",
};

export const CustomTableCell = styled(TableCell)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
