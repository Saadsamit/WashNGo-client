const scrollToTop = () => {
  const scrollPxShow =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollPxShow > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, scrollPxShow - scrollPxShow / 8);
  }
};

export default scrollToTop;
