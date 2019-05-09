// import { theme } from '../Base/Base'

const styles = theme => ({

    GridRoot: {
        margin: '5%',
        // margin: '5em',
        padding: 'auto',
    },
    GridContainer: {
        justify: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    GridItem: {

    },


    card: {
    //   maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    Right: {
      marginLeft: 'auto',
    //   [theme.breakpoints.up('sm')]: {
    //     marginRight: -8,
    //   },
    },

    favStyle: {
      margin: '2%',
    },


    menuItem: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& $primary, & $icon': {
            color: theme.palette.common.white,
          },
        },
    },

    linkStyle: {
      textTransform: "none",
      textDecoration: "none",
      outline: 'none',
      "&:hover,&:focus": {
        outline: 'none',
      }
    },



  });


  export default styles;
