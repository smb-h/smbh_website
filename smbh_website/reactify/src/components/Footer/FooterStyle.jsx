

const conatinerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
  };
  const container = {
    ...conatinerFluid,
    "@media (min-width: 576px)": {
      maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
      maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "1140px"
    }
  };



const styles = theme => ({
    typoStyle: {
      // color: "inherit",
      color: 'white',
      // padding: "0.9375rem",
      fontWeight: "500",
      // fontSize: "12px",

      // textTransform: "uppercase",
      // textTransform: "lowercase",
      textTransform: "none",
      borderRadius: "3px",

      textDecoration: "none",
      position: "relative",
      // display: "block",

      transition: '0.4s',

      "&:hover,&:focus": {
        // color: "inherit",
        // color: "#FF9A47",
        color: "#ffd460",
        // background: "rgba(200, 200, 200, 0.2)",
        background: "inherit",

      },


    },
    left: {
      float: "left!important",
      display: "block"
    },
    right: {
      padding: "15px 0",
      margin: "0",
      float: "right!important"
    },
    footer: {
      padding: "0.9375rem 0",
      textAlign: "center",
      display: "flex",
      zIndex: 101,
      position: "relative",
      // backgroundColor: '#212834',
      backgroundColor: '#201E1E',
      color: '#A7A7A7',
    },
    a: {
      color: '#FF9A47',
      textDecoration: "none",
      backgroundColor: "transparent",
      "&:hover,&:focus": {
        // color: "inherit",
        // color: "#FF9A47",
        color: "#ffd460",
        // background: "rgba(200, 200, 200, 0.2)",
        background: "inherit",

      },
    },
    container,
    list: {
      marginBottom: "0",
      padding: "0",
      marginTop: "0"
    },
    inlineBlock: {
      display: "inline-block",
      padding: "0px",
      width: "auto"
    },
    SmbhLogo: {
      color: 'royalblue!important',
    },

    static: {
      color: 'white',
    },

  });

  export default styles;
