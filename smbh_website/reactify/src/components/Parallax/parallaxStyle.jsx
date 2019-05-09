const parallaxStyle = {
  parallax: {
    // height: "90vh",
    minHeight: '50vh',

    overflow: "hidden",
    position: "relative",
    backgroundPosition: "center center",
    backgroundSize: "cover",

    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',

    margin: "0",
    padding: "0",
    border: "0",
    // display: "flex",
    // alignItems: "center"
  },
  filter: {
    "&:before": {
      background: "rgba(0, 0, 0, 0.5)"
    },
    "&:after,&:before": {
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "block",
      left: "0",
      top: "0",
      content: "''"
    }
  },
  small: {
    height: "380px"
  },

  videoBk: {
    width: '100%',
    objectFit: 'cover',
    opacity: '.7',
  },
  mediaContainer: {
    position: 'relative',
  },
  // Child Positioning
  innerChild: {
    position: 'absolute',
    fontSize: '3vw',
  },
  // Bottom left text
  bottomLeft: {
      position: 'absolute',
      fontSize: '3vw',
      bottom: 8,
      left: 16,
  },
  // Top left text
  topLeft: {
      position: 'absolute',
      fontSize: '3vw',
      top: 8,
      left: 16,
  },
  // Top right text
  topRight: {
      position: 'absolute',
      fontSize: '3vw',
      top: 8,
      right: 16,
  },
  // Bottom right text
  bottomRight: {
      position: 'absolute',
      fontSize: '3vw',
      bottom: 8,
      right: 16,
  },
  // Centered text
  centered: {
      position: 'absolute',
      fontSize: '3vw',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
  },

};

export default parallaxStyle;
