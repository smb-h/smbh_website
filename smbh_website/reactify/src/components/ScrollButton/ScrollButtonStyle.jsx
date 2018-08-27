
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

      zIndex: 102,
      border: 'none',
      outline: 'none',
    },
  });

  export default styles;
