export default {
  slots: {
    root: '',
    container: '',
    header: '',
    meta: '',
    date: '',
    badge: '',
    title: '',
    description: '',
    imageWrapper: '',
    image: '',
    authors: '',
    footer: '',
    indicator: '',
    dot: '',
    dotInner: '',
  },
  variants: {
    body: {
      false: {
        footer: '',
      },
    },
    badge: {
      false: {
        meta: '',
      },
    },
    to: {
      true: {
        title: '',
        image: '',
      },
    },
    hidden: {
      true: {
        date: '',
      },
    },
  },
};
