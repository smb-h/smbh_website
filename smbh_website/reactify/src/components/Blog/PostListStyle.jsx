import { theme } from '../Base/Base'

const styles = theme => ({

    tagMargin: {
        marginRight: 8,
    },
    GridContainer: {
        margin: '5%',
        justify: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    GridItem: {

    },

    Right: {
      marginLeft: 'auto',
    //   [theme.breakpoints.up('sm')]: {
    //     marginRight: -8,
    //   },
    },

    menuItem: {
        '&:focus': {
          backgroundColor: theme.palette.primary.main,
          '& $primary, & $icon': {
            color: theme.palette.common.white,
          },
        },
    },

    favStyle: {
      margin: '2%',
    },

    linkStyle: {
      textTransform: "none",
      textDecoration: "none",
      outline: 'none',
      "&:hover,&:focus": {
        outline: 'none',
      }
    },

    rightAlign: {
      textAlign: 'right',
    },

    paperRoot: {
      padding: theme.spacing.unit * 3,
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
    },
    paperImage: {
      width: '100%',
      // height: '100%',
      borderRadius: '5%',
    },
    title: {
      color: 'black',
    },
    infoStyle: {
      padding: '3%',
    },



  });


export default styles;
