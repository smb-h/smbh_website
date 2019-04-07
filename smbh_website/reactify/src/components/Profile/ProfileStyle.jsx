
const styles = theme => ({
  windowSize: {
    // minHeight: window.innerHeight - document.getElementById('Navigation').clientHeight,
    minHeight: window.innerHeight,
  },

  gridRoot: {
      margin: '5%',
      // margin: '5em',
      padding: 'auto',
  },
  gridContainer: {
      justify: 'center',
      alignItems: 'center',
      alignContent: 'center',
  },
  GridItem: {

  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },

  menuItem: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& $primary, & $icon': {
          color: theme.palette.common.white,
        },
      },
  },

  expand: {
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginRight: -8,
  },
},
expandOpen: {
  transform: 'rotate(180deg)',
},

favStyle: {
  margin: '2%',
},

centerAlign: {
  textAlign: 'center',
},

linkStyle: {
  textTransform: "none",
  textDecoration: "none",
  outline: 'none',
  "&:hover,&:focus": {
    outline: 'none',
  }
},

expandIconStyle: {
  padding: 0,
  margin: 0,
  fontSize: '.7em'
}


})


export default styles
