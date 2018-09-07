import { container, title } from "../../assets/jss/material-kit-react"
import tooltip from "../../assets/jss/tooltipsStyle"


const navBarStyle = theme => ({
  section: {
    padding: "70px 0",
    paddingTop: "0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  navbar: {
    marginBottom: "-20px",
    zIndex: "100",
    position: "relative",
    overflow: "hidden",
    "& header": {
      borderRadius: "0"
    }
  },
  navigation: {
    backgroundPosition: "center center",
    backgroundSize: "cover",
    marginTop: "0",
    minHeight: "740px"
  },
  formControl: {
    margin: "0 !important",
    paddingTop: "0"
  },
  inputRootCustomClasses: {
    margin: "0!important"
  },
  searchIcon: {
    width: "20px",
    height: "20px",
    color: "inherit"
  },
  img: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },
  imageDropdownButton: {
    padding: "0px",
    top: "4px",
    borderRadius: "50%",
    marginLeft: "5px"
  },

  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  // primary: {},
  // icon: {},

  // Smbh Logo
  HColor: {
    color: 'royalblue!important',
  },
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  list: {
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit"
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block",
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5"
      }
    }
  },
  listItemText: {
    padding: "0 !important"
  },
  navLink: {
    color: "inherit",
    position: "relative",
    // padding: "0.9375rem",
    padding: "0.4rem",
    fontWeight: "500",
    // fontSize: "12px",
    // textTransform: "uppercase",

    textTransform: "none",

    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    outline: 'none',
    margin: "0px",
    // margin: "1px",

    transition: '0.4s',

    display: "inline-flex",
    "&:hover,&:focus": {
      color: "#ffd460",
      // background: "rgba(200, 200, 200, 0.2)",
      background: "inherit",
      outline: 'none',
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
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex"
  },
  navLinkActive: {
    // color: "inherit",
    color: "royalblue",
    // backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px"
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px",
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: "5px"
  },
  // Menu list item
  menuListItem: {
    color: "inherit",
    position: "relative",
    // padding: "0.9375rem",
    padding: "0.4rem",
    fontWeight: "500",
    // fontSize: "12px",
    // textTransform: "uppercase",

    textTransform: "none",

    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    outline: 'none',
    margin: "0px",
    // margin: "1px",

    transition: '0.4s',

    display: "inline-flex",
    // "&:hover,&:focus": {
    "&:focus": {
      color: "#ffd460",
      // background: "rgba(200, 200, 200, 0.2)",
      // background: "inherit",
      outline: 'none',
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

export default navBarStyle
