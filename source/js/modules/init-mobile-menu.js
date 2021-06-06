const mobileMenuBreakpoint = window.matchMedia('(min-width: 768px)');
const nav = document.querySelector('.main-nav');

const initMobileMenu = () => {
  if (!nav) {
    return;
  }

  const toggle = nav.querySelector('.main-nav__toggle');
  const list = nav.querySelector('.main-nav__list');
  const overlay = nav.querySelector('.main-nav__overlay');

  const onOverlayClick = () => {
    closeMenu();
  };

  const onEscPress = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      closeMenu();
    }
  };

  const onWindowResize = () => {
    if (mobileMenuBreakpoint.matches) {
      closeMenu();
    }
  };

  const openMenu = () => {
    nav.classList.add('open');

    window.disableBodyScroll(nav, {
      reserveScrollBarGap: true,
    });

    overlay.addEventListener('click', onOverlayClick);
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onEscPress);
  };

  const closeMenu = () => {
    nav.classList.remove('open');

    setTimeout(window.enableBodyScroll(nav), 300);

    overlay.removeEventListener('click', onOverlayClick);
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('keydown', onEscPress);
  };

  const onToggleClick = () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const onLinkClick = ({target}) => {
    const link = target.closest('.main-nav__link');

    if (link) {
      closeMenu();
    }
  };

  toggle.addEventListener('click', onToggleClick);
  list.addEventListener('click', onLinkClick);
};

export {initMobileMenu};
