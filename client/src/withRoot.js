import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// import purple from "@material-ui/core/colors/purple";
// import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import blueGrey from "@material-ui/core/colors/blueGrey";
import CssBaseline from "@material-ui/core/CssBaseline";

// A theme with custom primary and secondary color.
const theme = createMuiTheme({
    palette: {
      // primary: {
      //   light: blueGrey[300],
      //   main: blueGrey[500],
      //   dark: blueGrey[700]
      // },
      primary: '#192734',
      secondary: 'violet'
      // secondary: {
      //   light: yellow[300],
      //   main: yellow[500],
      //   dark: yellow[700]
      // }
    },
    typography: {
      useNextVariants: true
    }
  });

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
