import { theme } from '../Base/Base'

const styles = theme => ({

    intro: {
        color: 'white',
        fontWeight: 700,
        fontSize: '1em',
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
      transition: '0.4s',
      display: "inline-flex",
      "&:hover,&:focus": {
        color: "#ffd460",
        // background: "rgba(200, 200, 200, 0.2)",
        background: "inherit",
      },
      [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 30px)",
        marginLeft: "15px",
        marginBottom: "8px",
        marginTop: "8px",
        textAlign: "left",
        "& > span:first-child": {
          justifyContent: "flex-start"
        }
      }
    },


  });


  export default styles
