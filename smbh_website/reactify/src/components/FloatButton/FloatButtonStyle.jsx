
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
    FloatingButton: {
      // display: 'none', 
      display: 'block', 
      position: 'fixed', 

      bottom: 20, 
      right: 30,

      // zIndex: 99,
      zIndex: 3,
      border: 'none', 
      outline: 'none', 
    },
  });

  export default styles;
  