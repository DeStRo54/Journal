const routes = ['/journal-desktop', '/journal-mobile'];
const isMobile = Number(window.matchMedia('screen and (max-width: 1050px)').matches);

export const ChooseMedia = routes[isMobile];
