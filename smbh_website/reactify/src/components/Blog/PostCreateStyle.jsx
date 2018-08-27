import green from '@material-ui/core/colors/green'
import { theme } from '../Base/Base'

const styles = theme => ({
    formContainer: {
        margin: '5%',
        marginLeft: '15%',
        marginRight: '15%'
    },
    formItem: {
        marginBottom: theme.spacing.unit * 3,
    },
    centerPos: {
      textAlign: 'center',
      padding: 'auto',
      margin: 'auto',
      overflow: 'auto',
    },

    checkBoxRoot: {
        color: green[600],
        '&$checked': {
          color: green[500],
        },
      },
    checked: {},
        size: {
        width: 40,
        height: 40,
    },

    imagePad: {
      padding: 20,
    },
    OF: {
      overflow: 'hidden',
    },


});


export default styles;
