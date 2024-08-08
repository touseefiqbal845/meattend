import { PaletteOptions, createTheme } from "@mui/material";

import "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    upload: Palette["primary"];
    border: Palette["primary"];
    gray: {
      main: string;
      secondary: string;
      tertiary: string;
      quat: string;
      graphTitle: string;
    };
    bgColor: Palette["primary"];
    DataGrid_Design_ToolKit: {
      bg_color: string;
      Page_Header: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
      };
      DataGrid_Header: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
      };
      DataGrid_data: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
        letterSpacing: string;
      };
      DataGrid_Avator: {
        height: string;
      };
      DataGrid_status: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        square_radius: string;
        chip_bg_danger: string;
        chip_bg_orange: string;
        chip_bg_green: string;
        chip_text_danger: string;
        chip_text_orange: string;
        chip_text_green: string;
      };
      DataGrid_View: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
        viewButtonHeight: string;
      };
    };
  }
  interface PaletteOptions {
    upload: PaletteOptions["primary"];
    border: PaletteOptions["primary"];
    gray: {
      main: string;
      secondary: string;
      tertiary: string;
      quat: string;
      graphTitle: string;
    };
    bgColor: PaletteOptions["primary"];
    DataGrid_Design_ToolKit: {
      bg_color: string;
      Page_Header: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
      };
      DataGrid_Header: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
      };
      DataGrid_data: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
        letterSpacing: string;
      };
      DataGrid_Avator: {
        height: string;
      };
      DataGrid_status: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        square_radius: string;
        chip_bg_danger: string;
        chip_bg_orange: string;
        chip_bg_green: string;
        chip_text_danger: string;
        chip_text_orange: string;
        chip_text_green: string;
      };
      DataGrid_View: {
        fontSize: string;
        lineHeight: string;
        fontWeight: number;
        color: string;
        fontFamily: string;
        viewButtonHeight: string;
      };
    };
  }
}

const typography = {
  typography: {
    fontFamily: [
      "Mulish",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
};
const lightTheme = createTheme({
  ...typography,
  palette: {
    mode: "light",
    primary: {
      main: "#FFC000",
    },
    secondary: {
      main: "#DE9300",
    },
    text: {
      primary: "#262A45",
      secondary: "black",
    },
    divider: "#C7CADA",
    upload: {
      main: "#E6E8F0",
    },
    border: {
      main: "#C7CADA",
    },
    gray: {
      main: "#84858D",
      secondary: "#84858D",
      tertiary: "#3F435E",
      quat: "#A0A3B5",
      graphTitle: "#000315",
    },
    bgColor: {
      main: "#E6E8F0",
    },


    DataGrid_Design_ToolKit: {
      // bg_color: "#F3F4F9",
      bg_color:"#FBFBFB",
      Page_Header: {
        fontSize: "30px",
        lineHeight: "36px",
        fontWeight: 700,
        color: "#000315",
        fontFamily: "Mulish",
      },
      DataGrid_Header: {
        fontSize: "16px",
        lineHeight: "26px",
        fontWeight: 900,
        color: "#000315",
        fontFamily: "Mulish",
      },
      DataGrid_data: {
        fontSize: "16px",
        lineHeight: "19px",
        fontWeight: 400,
        color: "#84858D",
        fontFamily: "Mulish",
        letterSpacing: "0.5px",
      },
      DataGrid_Avator: {
        height: "30px",
      },
      DataGrid_status: {
        fontSize: "10px",
        lineHeight: "12.5px",
        fontWeight: 700,
        square_radius: "6px",
        chip_bg_danger: "#FFDBDB",
        chip_bg_orange: "#FFF7DD",
        chip_bg_green: "#CEF9EC",
        chip_text_danger: "#FD1F1F",
        chip_text_orange: "#DE9300",
        chip_text_green: "#039A36",
      },
      DataGrid_View: {
        fontSize: "14px",
        lineHeight: "17.57px",
        fontWeight: 900,
        color: "#DE9300",
        fontFamily: "Mulish",
        viewButtonHeight: "30px",
      },
    },
  },

});

// Define custom colors for dark mode
const darkTheme = createTheme({
  ...typography,
  palette: {
    mode: "dark",
    primary: {
      main: "#FFC000", // Light blue
    },
    secondary: {
      main: "#DE9300", // Pink
    },
    text: {
      primary: "#262A45",
      secondary: "black",
    },
    upload: {
      main: "#E6E8F0",
    },
    border: {
      main: "red",
    },
    gray: {
      main: "#84858D",
      secondary: "#84858D",
      tertiary: "#3F435E",
      quat: "#A0A3B5",
      graphTitle: "#000315",
    },
    bgColor: {
      main: "#F3F4F9",
    },
    DataGrid_Design_ToolKit: {
      bg_color: "#F3F4F9",
      Page_Header: {
        fontSize: "30px",
        lineHeight: "36px",
        fontWeight: 700,
        color: "#000315",
        fontFamily: "Mulish",
      },
      DataGrid_Header: {
        fontSize: "16px",
        lineHeight: "26px",
        fontWeight: 600,
        color: "#000315",
        fontFamily: "Mulish",
      },
      DataGrid_data: {
        fontSize: "16px",
        lineHeight: "19px",
        fontWeight: 400,
        color: "#84858D",
        fontFamily: "Mulish",
        letterSpacing: "0.5px",
      },
      DataGrid_Avator: {
        height: "30px",
      },
      DataGrid_status: {
        fontSize: "10px",
        lineHeight: "12.5px",
        fontWeight: 700,
        square_radius: "6px",
        chip_bg_danger: "#FFDBDB",
        chip_bg_orange: "#FFF7DD",
        chip_bg_green: "#CEF9EC",
        chip_text_danger: "#FD1F1F",
        chip_text_orange: "#DE9300",
        chip_text_green: "#039A36",
      },
      DataGrid_View: {
        fontSize: "14px",
        lineHeight: "17.57px",
        fontWeight: 900,
        color: "#DE9300",
        fontFamily: "Mulish",
        viewButtonHeight: "30px",
      },
    },
  },
});

export { lightTheme, darkTheme };
