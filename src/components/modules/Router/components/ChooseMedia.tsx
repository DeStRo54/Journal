const routes = ['/journal-desktop', '/journal-mobile'];

export const ChooseMedia = () => {
  const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);
  return routes[isMobile];
};

// const a = window.matchMedia('only screen and (min-width: 1050px)');
