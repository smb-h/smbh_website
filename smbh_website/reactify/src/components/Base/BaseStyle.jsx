import { createMuiTheme } from '@material-ui/core/styles'


// Theme
export const theme = createMuiTheme({
  palette: {
      bg: {
        main: '#364f6b',
      },
      primary: {
          // light: will be calculated from palette.primary.main,
          main: '#ffd460',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
      secondary: {
          // light: will be calculated from palette.primary.main,
          main: '#f08a5d',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
      error: {
          // light: will be calculated from palette.primary.main,
          main: '#ff165d',
          // dark: will be calculated from palette.primary.main,
          // contrastText: will be calculated to contast with palette.primary.main
      },
    },
});

// export default theme
