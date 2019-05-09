// import { theme } from '../Base/Base'

const styles = theme => ({
    iconStyle: {
      fontSize: '2em',
    },

    alignment: {
      justify: 'center',
      alignItems: 'center',
      alignContent: 'center',
      verticalAlign: 'middle',
      textAlign: 'center'
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

export default styles
