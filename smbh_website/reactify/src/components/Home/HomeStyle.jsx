import { theme } from '../Base/Base'

const styles = theme => ({

    intro: {
        color: 'white',
        fontWeight: 700,
        fontSize: '1.03em',
        [theme.breakpoints.down("md")]: {
          fontSize: '1.4em',
        },
        [theme.breakpoints.down("sm")]: {
          fontSize: '2em',
        },
      },


    dividerStyle: {
      margin: '2%',
    },

    centeralize: {
      textAlign: 'center',
    },

    socialItem: {
      fontSize: '1.5em',
      margin: '5%',
      // color: '#f08a5d',
      color: 'royalblue',
      position: "relative",
      textTransform: "none",
      lineHeight: "20px",
      textDecoration: "none",
      outline: 'none',
      transition: '0.4s',
      display: "inline-flex",
      "&:hover,&:focus": {
        color: "#ffd460",
        // background: "rgba(200, 200, 200, 0.2)",
        background: "inherit",
        outline: 'none',
      },
      [theme.breakpoints.down("md")]: {
        fontSize: '2em',
      },
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 30px)",
        marginLeft: "15px",
        marginBottom: "8px",
        marginTop: "8px",
        textAlign: "left",
        "& > span:first-child": {
          justifyContent: "flex-start"
        },
        fontSize: '2.7em',
      },
    },

    windowSize: {
      minHeight: window.innerHeight,
    },


  });


  export default styles
