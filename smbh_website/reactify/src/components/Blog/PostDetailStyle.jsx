// import { theme } from '../Base/Base'

const styles = theme => ({
    layout: {
      margin: '5%',
      // width: 'auto',
      // height: 'auto',
    },
    mainGrid: {
      marginTop: theme.spacing.unit * 3,
    },
    dividerStyle: {
      margin: theme.spacing.unit * 3,
    },
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
    sidebarAboutBox: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
      marginTop: theme.spacing.unit * 3,
    },

    media: {
      // ⚠️ object-fit is not supported by IE11.
      objectFit: 'cover',
      borderRadius: 5,
      // boxShadow: '2px 4px 20px 1px #888888',
      width: '100%',
      maxHeight: 600,
    },

    title: {
      fontSize: '2.7em',
      textAlign: 'center',
    },
    content: {
      padding: '2%',
      fontSize: '1em',
    },
    mainCard: {
      padding: '3%',
    },

  });


export default styles
