export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

export const fadeIn = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

export const cardHover = {
  hover: {
    y: -6,
    scale: 1.01,
    transition: {
      duration: 0.2
    }
  }
};
