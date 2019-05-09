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
      marginTop: '2%',
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
    midAlign: {
      textAlign: 'center',
    },

    paperRoot: {
      padding: theme.spacing.unit * 3,
      paddingBot: theme.spacing.unit,
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
    },
    paperImage: {
      maxHeight: 300,
      width: '100%',
      // height: '3rem',
      borderRadius: '1%',
    },
    title: {
      color: 'black',
    },
    infoStyle: {
      padding: '3%',
    },

    // Cards
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: 'red',
    },
    superAlign: {
      verticalAlign: 'super',
    },



  });


export default styles;
