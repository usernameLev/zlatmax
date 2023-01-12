'use strict';

new Swiper('.main-block__slider', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Optional parameters
  // autoHeight: true,
  observer: true,
  observeParents: true,
  slidesPerView: 1,
  spaceBetween: 150,
  speed: 800,
  loop: true,

  // If we need pagination
  pagination: {
    el: '.controller-main-block__dots',
    clickable: true,
  },

  on: {
    init: function (swiper) {
      const allSlides = document.querySelector('.fraction-controller__all');
      const allSlidesItems = document.querySelectorAll(
        '.main-block__slide.swiper-slide:not(.swiper-slide-duplicate)',
      );

      allSlides.innerHTML =
        allSlidesItems.length < 10
          ? `0${allSlidesItems.length}`
          : allSlidesItems.length;
    },

    slideChange: function (swiper) {
      const currentSlide = document.querySelector(
        '.fraction-controller__current',
      );

      currentSlide.innerHTML =
        swiper.realIndex + 1 < 10
          ? `0${swiper.realIndex + 1}`
          : swiper.realIndex + 1;

      console.log(swiper);
    },
  },
});

new Swiper('.products-slider__slider', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Optional parameters
  // autoHeight: true,
  observer: true,
  watchOverflow: true,
  observeParents: true,
  slidesPerView: 4,
  spaceBetween: 30,
  speed: 800,
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.products-slider__dots',
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    1370: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },

  on: {},
});

new Swiper('.products-new__slider', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // Optional parameters
  // autoHeight: true,
  observer: true,
  watchOverflow: true,
  observeParents: true,
  slidesPerView: 3,
  spaceBetween: 30,
  speed: 800,
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.products-new__dots',
    clickable: true,
    dynamicBullets: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    992: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1330: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },

  on: {},
});

const thubmsSwiper = new Swiper('.thumbs-images', {
  loop: true,
  spaceBetween: 16,

  breakpoints: {
    320: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    768: {
      slidesPerView: 3,
    },

    992: {
      slidesPerView: 3,
    },

    1330: {
      slidesPerView: 4,
    },
  },
});

new Swiper('.images-product__slider', {
  thumbs: {
    swiper: thubmsSwiper,
  },

  loop: true,
});
document.addEventListener('click', documentActions);

const menuBlocks = document.querySelectorAll('.sub-menu-catalog__block');

if (menuBlocks.length) {
  menuBlocks.forEach((menuBlock) => {
    const menuBlockItems = menuBlock.querySelectorAll(
      '.sub-menu-catalog__category',
    ).length;
    menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
  });
}

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest('[data-parent]')) {
    const subMenuId = targetElement.dataset.parent
      ? targetElement.dataset.parent
      : null;
    const subMenu = document.querySelector(`[data-submenu="${subMenuId}"]`);

    if (subMenu) {
      const activeLink = document.querySelector('._sub-menu-active');
      const activeBlock = document.querySelector('._sub-menu-open');

      if (activeLink && activeLink !== targetElement) {
        activeLink.classList.remove('_sub-menu-active');
        activeBlock.classList.remove('_sub-menu-open');
        document.documentElement.classList.remove('_sub-menu-open');
      }

      document.documentElement.classList.toggle('_sub-menu-open');
      targetElement.classList.toggle('_sub-menu-active');
      subMenu.classList.toggle('_sub-menu-open');
    } else {
      console.log('Ой ой, нет такого подменю :(');
    }
    e.preventDefault();
  }

  if (targetElement.closest('.menu-top-header__link_catalog')) {
    document.documentElement.classList.add('catalog-open');
    e.preventDefault();
  }

  if (targetElement.closest('.menu-catalog__back')) {
    document.documentElement.classList.remove('catalog-open');

    document.querySelector('._sub-menu-active')
      ? document
          .querySelector('._sub-menu-active')
          .classList.remove('_sub-menu-active')
      : null;
    document.querySelector('._sub-menu-open')
      ? document
          .querySelector('._sub-menu-open')
          .classList.remove('_sub-menu-open')
      : null;

    e.preventDefault();
  }

  if (targetElement.closest('.sub-menu-catalog__back')) {
    document.documentElement.classList.remove('_sub-menu-open');
    document.querySelector('._sub-menu-active')
      ? document
          .querySelector('._sub-menu-active')
          .classList.remove('_sub-menu-active')
      : null;
    document.querySelector('._sub-menu-open')
      ? document
          .querySelector('._sub-menu-open')
          .classList.remove('_sub-menu-open')
      : null;

    e.preventDefault();
  }
}

if (document.querySelector('.filter-catalog__title')) {
  document
    .querySelector('.filter-catalog__title')
    .addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        document
          .querySelector('.filter-catalog__items')
          .classList.toggle('_active');
      }
    });
}
console.log(3)
// Класс Popup
class Popup {
  constructor(options) {
    let config = {
      logging: true,
      init: true,
      // Для кнопок
      attributeOpenButton: 'data-popup', // Атрибут для кнопки, которая вызывает попап
      attributeCloseButton: 'data-close', // Атрибут для кнопки, которая закрывает попап
      // Для сторонних объектов
      fixElementSelector: '[data-lp]', // Атрибут для элементов с левым паддингом (которые fixed)
      // Для объекта попапа
      youtubeAttribute: 'data-popup-youtube', // Атрибут для кода youtube
      youtubePlaceAttribute: 'data-popup-youtube-place', // Атрибут для вставки ролика youtube
      setAutoplayYoutube: true,
      // Изменение классов
      classes: {
        popup: 'popup',
        // popupWrapper: 'popup__wrapper',
        popupContent: 'popup__content',
        popupActive: 'popup_show', // Добавляется для попапа, когда он открывается
        bodyActive: 'popup-show', // Добавляется для боди, когда попап открыт
      },
      focusCatch: true, // Фокус внутри попапа зациклен
      closeEsc: true, // Закрытие по ESC
      bodyLock: true, // Блокировка скролла
      hashSettings: {
        location: true, // Хэш в адресной строке
        goHash: true, // Переход по наличию в адресной строке
      },
      on: {
        // События
        beforeOpen: function () {},
        afterOpen: function () {},
        beforeClose: function () {},
        afterClose: function () {},
      },
    };
    this.youTubeCode;
    this.isOpen = false;
    // Текущее окно
    this.targetOpen = {
      selector: false,
      element: false,
    };
    // Предыдущее открытое
    this.previousOpen = {
      selector: false,
      element: false,
    };
    // Последнее закрытое
    this.lastClosed = {
      selector: false,
      element: false,
    };
    this._dataValue = false;
    this.hash = false;

    this._reopen = false;
    this._selectorOpen = false;

    this.lastFocusEl = false;
    this._focusEl = [
      'a[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'area[href]',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])',
    ];
    //this.options = Object.assign(config, options);
    this.options = {
      ...config,
      ...options,
      classes: {
        ...config.classes,
        ...options?.classes,
      },
      hashSettings: {
        ...config.hashSettings,
        ...options?.hashSettings,
      },
      on: {
        ...config.on,
        ...options?.on,
      },
    };
    this.bodyLock = false;
    this.options.init ? this.initPopups() : null;
  }
  initPopups() {
    this.popupLogging(`Проснулся`);
    this.eventsPopup();
  }
  eventsPopup() {
    // Клик на всем документе
    document.addEventListener(
      'click',
      function (e) {
        // Клик по кнопке "открыть"
        const buttonOpen = e.target.closest(
          `[${this.options.attributeOpenButton}]`,
        );
        if (buttonOpen) {
          e.preventDefault();
          this._dataValue = buttonOpen.getAttribute(
            this.options.attributeOpenButton,
          )
            ? buttonOpen.getAttribute(this.options.attributeOpenButton)
            : 'error';
          this.youTubeCode = buttonOpen.getAttribute(
            this.options.youtubeAttribute,
          )
            ? buttonOpen.getAttribute(this.options.youtubeAttribute)
            : null;
          if (this._dataValue !== 'error') {
            if (!this.isOpen) this.lastFocusEl = buttonOpen;
            this.targetOpen.selector = `${this._dataValue}`;
            this._selectorOpen = true;
            this.open();
            return;
          } else
            this.popupLogging(
              `Ой ой, не заполнен атрибут у ${buttonOpen.classList}`,
            );

          return;
        }
        // Закрытие на пустом месте (popup__wrapper) и кнопки закрытия (popup__close) для закрытия
        const buttonClose = e.target.closest(
          `[${this.options.attributeCloseButton}]`,
        );
        if (
          buttonClose ||
          (!e.target.closest(`.${this.options.classes.popupContent}`) &&
            this.isOpen)
        ) {
          e.preventDefault();
          this.close();
          return;
        }
      }.bind(this),
    );
    // Закрытие по ESC
    document.addEventListener(
      'keydown',
      function (e) {
        if (
          this.options.closeEsc &&
          e.which == 27 &&
          e.code === 'Escape' &&
          this.isOpen
        ) {
          e.preventDefault();
          this.close();
          return;
        }
        if (this.options.focusCatch && e.which == 9 && this.isOpen) {
          this._focusCatch(e);
          return;
        }
      }.bind(this),
    );

    // Открытие по хешу
    if (this.options.hashSettings.goHash) {
      // Проверка изменения адресной строки
      window.addEventListener(
        'hashchange',
        function () {
          if (window.location.hash) {
            this._openToHash();
          } else {
            this.close(this.targetOpen.selector);
          }
        }.bind(this),
      );

      window.addEventListener(
        'load',
        function () {
          if (window.location.hash) {
            this._openToHash();
          }
        }.bind(this),
      );
    }
  }
  open(selectorValue) {
    if (bodyLockStatus) {
      // Если перед открытием попапа был режим lock
      this.bodyLock =
        document.documentElement.classList.contains('lock') && !this.isOpen
          ? true
          : false;

      // Если ввести значение селектора (селектор настраивается в options)
      if (
        selectorValue &&
        typeof selectorValue === 'string' &&
        selectorValue.trim() !== ''
      ) {
        this.targetOpen.selector = selectorValue;
        this._selectorOpen = true;
      }
      if (this.isOpen) {
        this._reopen = true;
        this.close();
      }
      if (!this._selectorOpen)
        this.targetOpen.selector = this.lastClosed.selector;
      if (!this._reopen) this.previousActiveElement = document.activeElement;

      this.targetOpen.element = document.querySelector(
        this.targetOpen.selector,
      );

      if (this.targetOpen.element) {
        // YouTube
        if (this.youTubeCode) {
          const codeVideo = this.youTubeCode;
          const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`;
          const iframe = document.createElement('iframe');
          iframe.setAttribute('allowfullscreen', '');

          const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : '';
          iframe.setAttribute('allow', `${autoplay}; encrypted-media`);

          iframe.setAttribute('src', urlVideo);

          if (
            !this.targetOpen.element.querySelector(
              `[${this.options.youtubePlaceAttribute}]`,
            )
          ) {
            const youtubePlace = this.targetOpen.element
              .querySelector('.popup__text')
              .setAttribute(`${this.options.youtubePlaceAttribute}`, '');
          }
          this.targetOpen.element
            .querySelector(`[${this.options.youtubePlaceAttribute}]`)
            .appendChild(iframe);
        }
        if (this.options.hashSettings.location) {
          // Получение хэша и его выставление
          this._getHash();
          this._setHash();
        }

        // До открытия
        this.options.on.beforeOpen(this);
        // Создаем свое событие после открытия попапа
        document.dispatchEvent(
          new CustomEvent('beforePopupOpen', {
            detail: {
              popup: this,
            },
          }),
        );

        this.targetOpen.element.classList.add(this.options.classes.popupActive);
        document.documentElement.classList.add(this.options.classes.bodyActive);

        if (!this._reopen) {
          !this.bodyLock ? bodyLock() : null;
        } else this._reopen = false;

        this.targetOpen.element.setAttribute('aria-hidden', 'false');

        // Запоминаю это открытое окно. Оно будет последним открытым
        this.previousOpen.selector = this.targetOpen.selector;
        this.previousOpen.element = this.targetOpen.element;

        this._selectorOpen = false;

        this.isOpen = true;

        setTimeout(() => {
          this._focusTrap();
        }, 50);

        // После открытия
        this.options.on.afterOpen(this);
        // Создаем свое событие после открытия попапа
        document.dispatchEvent(
          new CustomEvent('afterPopupOpen', {
            detail: {
              popup: this,
            },
          }),
        );
        this.popupLogging(`Открыл попап`);
      } else
        this.popupLogging(
          `Ой ой, такого попапа нет.Проверьте корректность ввода. `,
        );
    }
  }
  close(selectorValue) {
    if (
      selectorValue &&
      typeof selectorValue === 'string' &&
      selectorValue.trim() !== ''
    ) {
      this.previousOpen.selector = selectorValue;
    }
    if (!this.isOpen || !bodyLockStatus) {
      return;
    }
    // До закрытия
    this.options.on.beforeClose(this);
    // Создаем свое событие перед закрытием попапа
    document.dispatchEvent(
      new CustomEvent('beforePopupClose', {
        detail: {
          popup: this,
        },
      }),
    );

    // YouTube
    if (this.youTubeCode) {
      if (
        this.targetOpen.element.querySelector(
          `[${this.options.youtubePlaceAttribute}]`,
        )
      )
        this.targetOpen.element.querySelector(
          `[${this.options.youtubePlaceAttribute}]`,
        ).innerHTML = '';
    }
    this.previousOpen.element.classList.remove(
      this.options.classes.popupActive,
    );
    // aria-hidden
    this.previousOpen.element.setAttribute('aria-hidden', 'true');
    if (!this._reopen) {
      document.documentElement.classList.remove(
        this.options.classes.bodyActive,
      );
      !this.bodyLock ? bodyUnlock() : null;
      this.isOpen = false;
    }
    // Очищение адресной строки
    this._removeHash();
    if (this._selectorOpen) {
      this.lastClosed.selector = this.previousOpen.selector;
      this.lastClosed.element = this.previousOpen.element;
    }
    // После закрытия
    this.options.on.afterClose(this);
    // Создаем свое событие после закрытия попапа
    document.dispatchEvent(
      new CustomEvent('afterPopupClose', {
        detail: {
          popup: this,
        },
      }),
    );

    setTimeout(() => {
      this._focusTrap();
    }, 50);

    this.popupLogging(`Закрыл попап`);
  }
  // Получение хэша
  _getHash() {
    if (this.options.hashSettings.location) {
      this.hash = this.targetOpen.selector.includes('#')
        ? this.targetOpen.selector
        : this.targetOpen.selector.replace('.', '#');
    }
  }
  _openToHash() {
    let classInHash = document.querySelector(
      `.${window.location.hash.replace('#', '')}`,
    )
      ? `.${window.location.hash.replace('#', '')}`
      : document.querySelector(`${window.location.hash}`)
      ? `${window.location.hash}`
      : null;

    const buttons = document.querySelector(
      `[${this.options.attributeOpenButton} = "${classInHash}"]`,
    )
      ? document.querySelector(
          `[${this.options.attributeOpenButton} = "${classInHash}"]`,
        )
      : document.querySelector(
          `[${this.options.attributeOpenButton} = "${classInHash.replace(
            '.',
            '#',
          )}"]`,
        );
    if (buttons && classInHash) this.open(classInHash);
  }
  // Утсановка хэша
  _setHash() {
    history.pushState('', '', this.hash);
  }
  _removeHash() {
    history.pushState('', '', window.location.href.split('#')[0]);
  }
  _focusCatch(e) {
    const focusable = this.targetOpen.element.querySelectorAll(this._focusEl);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }
  _focusTrap() {
    const focusable = this.previousOpen.element.querySelectorAll(this._focusEl);
    if (!this.isOpen && this.lastFocusEl) {
      this.lastFocusEl.focus();
    } else {
      focusable[0].focus();
    }
  }
  // Функция вывода в консоль
  popupLogging(message) {
    this.options.logging ? FLS(`[Попапос]: ${message}`) : null;
  }
}
// Запускаем и добавляем в объект модулей
// flsModules.popup = new Popup({});
new Popup({});
'use strict';
function DynamicAdapt(type) {
  this.type = type;
}
DynamicAdapt.prototype.init = function () {
  const _this = this;

  // массив объектов
  this.оbjects = [];
  this.daClassname = '_dynamic_adapt_';

  // массив DOM-элементов
  this.nodes = document.querySelectorAll('[data-da]');

  // наполнение оbjects объктами
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(',');
    const оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
    оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }
  this.arraySort(this.оbjects);

  // массив уникальных медиа-запросов
  this.mediaQueries = Array.prototype.map.call(
    this.оbjects,
    function (item) {
      return (
        '(' +
        this.type +
        '-width: ' +
        item.breakpoint +
        'px),' +
        item.breakpoint
      );
    },
    this,
  );
  this.mediaQueries = Array.prototype.filter.call(
    this.mediaQueries,
    function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    },
  );

  // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];

    // массив объектов с подходящим брейкпоинтом
    const оbjectsFilter = Array.prototype.filter.call(
      this.оbjects,
      function (item) {
        return item.breakpoint === mediaBreakpoint;
      },
    );
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    this.mediaHandler(matchMedia, оbjectsFilter);
  }
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < оbjects.length; i++) {
      const оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    //for (let i = 0; i < оbjects.length; i++) {
    for (let i = оbjects.length - 1; i >= 0; i--) {
      const оbject = оbjects[i];
      if (оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(оbject.parent, оbject.element, оbject.index);
      }
    }
  }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === 'min') {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return -1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return 1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};
const da = new DynamicAdapt('max');
da.init();
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');

if (iconMenu) {
  iconMenu.addEventListener('click', function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle('_active');
    menuBody.classList.toggle('_active');

    if (document.documentElement.classList.contains('catalog-open')) {
      document.documentElement.classList.remove('catalog-open');
    }

    if (document.documentElement.classList.contains('_sub-menu-open')) {
      document.documentElement.classList.remove('_sub-menu-open');
    }
  });
}

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;

    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotBlockValue =
        gotoBlock.getBoundingClientRect().top +
        pageYOffset -
        document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconMenu.classList.remove('_active');
        menuBody.classList.remove('_active');
      }

      window.scrollTo({
        top: gotBlockValue,
        behavior: 'smooth',
      });

      e.preventDefault();
    }
  }
}
// Подключение списка активных модулей
// import { flsModules } from '../modules.js';
// Вспомогательные функции
// import {
//   isMobile,
//   _slideUp,
//   _slideDown,
//   _slideToggle,
//   FLS,
// } from '../functions.js';
// Модуль прокрутки к блоку
// import { gotoBlock } from '../scroll/gotoblock.js';
//================================================================================================================================================================================================================================================================================================================================

/*
Документация: https://template.fls.guru/template-docs/rabota-s-formami.html
*/

// Работа с полями формы. Добавление классов, работа с placeholder
function formFieldsInit(options = { viewPass: false }) {
  // Если включено, добавляем функционал "скрыть плейсходлер при фокусе"
  const formFields = document.querySelectorAll(
    'input[placeholder],textarea[placeholder]',
  );
  if (formFields.length) {
    formFields.forEach((formField) => {
      if (!formField.hasAttribute('data-placeholder-nohide')) {
        formField.dataset.placeholder = formField.placeholder;
      }
    });
  }
  document.body.addEventListener('focusin', function (e) {
    const targetElement = e.target;
    if (
      targetElement.tagName === 'INPUT' ||
      targetElement.tagName === 'TEXTAREA'
    ) {
      if (targetElement.dataset.placeholder) {
        targetElement.placeholder = '';
      }
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.add('_form-focus');
        targetElement.parentElement.classList.add('_form-focus');
      }
      formValidate.removeError(targetElement);
    }
  });
  document.body.addEventListener('focusout', function (e) {
    const targetElement = e.target;
    if (
      targetElement.tagName === 'INPUT' ||
      targetElement.tagName === 'TEXTAREA'
    ) {
      if (targetElement.dataset.placeholder) {
        targetElement.placeholder = targetElement.dataset.placeholder;
      }
      if (!targetElement.hasAttribute('data-no-focus-classes')) {
        targetElement.classList.remove('_form-focus');
        targetElement.parentElement.classList.remove('_form-focus');
      }
      // Моментальная валидация
      if (targetElement.hasAttribute('data-validate')) {
        formValidate.validateInput(targetElement);
      }
    }
  });

  // Если включено, добавляем функционал "Показать пароль"
  if (options.viewPass) {
    document.addEventListener('click', function (e) {
      let targetElement = e.target;
      if (targetElement.closest('[class*="__viewpass"]')) {
        let inputType = targetElement.classList.contains('_viewpass-active')
          ? 'password'
          : 'text';
        targetElement.parentElement
          .querySelector('input')
          .setAttribute('type', inputType);
        targetElement.classList.toggle('_viewpass-active');
      }
    });
  }
}
formFieldsInit({ viewPass: false });

// Валидация форм
let formValidate = {
  getErrors(form) {
    let error = 0;
    let formRequiredItems = form.querySelectorAll('*[data-required]');
    if (formRequiredItems.length) {
      formRequiredItems.forEach((formRequiredItem) => {
        if (
          (formRequiredItem.offsetParent !== null ||
            formRequiredItem.tagName === 'SELECT') &&
          !formRequiredItem.disabled
        ) {
          error += this.validateInput(formRequiredItem);
        }
      });
    }
    return error;
  },
  validateInput(formRequiredItem) {
    let error = 0;
    if (formRequiredItem.dataset.required === 'email') {
      formRequiredItem.value = formRequiredItem.value.replace(' ', '');
      if (this.emailTest(formRequiredItem)) {
        this.addError(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
      }
    } else if (
      formRequiredItem.type === 'checkbox' &&
      !formRequiredItem.checked
    ) {
      this.addError(formRequiredItem);
      error++;
    } else {
      if (!formRequiredItem.value.trim()) {
        this.addError(formRequiredItem);
        error++;
      } else {
        this.removeError(formRequiredItem);
      }
    }
    return error;
  },
  addError(formRequiredItem) {
    formRequiredItem.classList.add('_form-error');
    formRequiredItem.parentElement.classList.add('_form-error');
    let inputError =
      formRequiredItem.parentElement.querySelector('.form__error');
    if (inputError) formRequiredItem.parentElement.removeChild(inputError);
    if (formRequiredItem.dataset.error) {
      formRequiredItem.parentElement.insertAdjacentHTML(
        'beforeend',
        `<div class="form__error">${formRequiredItem.dataset.error}</div>`,
      );
    }
  },
  removeError(formRequiredItem) {
    formRequiredItem.classList.remove('_form-error');
    formRequiredItem.parentElement.classList.remove('_form-error');
    if (formRequiredItem.parentElement.querySelector('.form__error')) {
      formRequiredItem.parentElement.removeChild(
        formRequiredItem.parentElement.querySelector('.form__error'),
      );
    }
  },
  formClean(form) {
    form.reset();
    setTimeout(() => {
      let inputs = form.querySelectorAll('input,textarea');
      for (let index = 0; index < inputs.length; index++) {
        const el = inputs[index];
        el.parentElement.classList.remove('_form-focus');
        el.classList.remove('_form-focus');
        formValidate.removeError(el);
      }
      let checkboxes = form.querySelectorAll('.checkbox__input');
      if (checkboxes.length > 0) {
        for (let index = 0; index < checkboxes.length; index++) {
          const checkbox = checkboxes[index];
          checkbox.checked = false;
        }
      }
      if (flsModules.select) {
        let selects = form.querySelectorAll('.select');
        if (selects.length) {
          for (let index = 0; index < selects.length; index++) {
            const select = selects[index].querySelector('select');
            flsModules.select.selectBuild(select);
          }
        }
      }
    }, 0);
  },
  emailTest(formRequiredItem) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(
      formRequiredItem.value,
    );
  },
};
/* Отправка форм */
function formSubmit(options = { validate: true }) {
  const forms = document.forms;
  if (forms.length) {
    for (const form of forms) {
      form.addEventListener('submit', function (e) {
        const form = e.target;
        formSubmitAction(form, e);
      });
      form.addEventListener('reset', function (e) {
        const form = e.target;
        formValidate.formClean(form);
      });
    }
  }
  async function formSubmitAction(form, e) {
    const error = !form.hasAttribute('data-no-validate')
      ? formValidate.getErrors(form)
      : 0;
    if (error === 0) {
      const ajax = form.hasAttribute('data-ajax');
      if (ajax) {
        // Если режим ajax
        e.preventDefault();
        const formAction = form.getAttribute('action')
          ? form.getAttribute('action').trim()
          : '#';
        const formMethod = form.getAttribute('method')
          ? form.getAttribute('method').trim()
          : 'GET';
        const formData = new FormData(form);

        form.classList.add('_sending');
        const response = await fetch(formAction, {
          method: formMethod,
          body: formData,
        });
        if (response.ok) {
          let responseResult = await response.json();
          form.classList.remove('_sending');
          formSent(form, responseResult);
        } else {
          alert('Ошибка');
          form.classList.remove('_sending');
        }
      } else if (form.hasAttribute('data-dev')) {
        // Если режим разработки
        e.preventDefault();
        formSent(form);
      }
    } else {
      e.preventDefault();
      const formError = form.querySelector('._form-error');
      if (formError && form.hasAttribute('data-goto-error')) {
        gotoBlock(formError, true, 1000);
      }
    }
  }
  // Действия после отправки формы
  function formSent(form, responseResult = ``) {
    // Создаем событие отправки формы
    document.dispatchEvent(
      new CustomEvent('formSent', {
        detail: {
          form: form,
        },
      }),
    );
    // Показываем попап, если подключен модуль попапов
    // и для формы указана настройка
    setTimeout(() => {
      if (flsModules.popup) {
        const popup = form.dataset.popupMessage;
        popup ? flsModules.popup.open(popup) : null;
      }
    }, 0);
    // Очищаем форму
    formValidate.formClean(form);
    // Сообщаем в консоль
    formLogging(`Форма отправлена!`);
  }
  function formLogging(message) {
    FLS(`[Формы]: ${message}`);
  }
}
formSubmit();

/* Модуь формы "колличество" */
function formQuantity() {
  document.addEventListener('click', function (e) {
    let targetElement = e.target;
    if (targetElement.closest('.quantity__button')) {
      let value = parseInt(
        targetElement.closest('.quantity').querySelector('input').value,
      );
      if (targetElement.classList.contains('quantity__button_plus')) {
        value++;
      } else {
        --value;
        if (value < 1) value = 1;
      }
      targetElement.closest('.quantity').querySelector('input').value = value;
    }
  });
}
/* Модуь звездного рейтинга */
function formRating() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }
  // Основная функция
  function initRatings() {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    // Инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);

      setRatingActiveWidth();

      if (rating.classList.contains('rating_set')) {
        setRating(rating);
      }
    }
    // Инициализайция переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }
    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', function (e) {
          // Обновление переменных
          initRatingVars(rating);
          // Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener('mouseleave', function (e) {
          // Обновление активных звезд
          setRatingActiveWidth();
        });
        ratingItem.addEventListener('click', function (e) {
          // Обновление переменных
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            // "Отправить" на сервер
            setRatingValue(ratingItem.value, rating);
          } else {
            // Отобразить указанную оцнку
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });
      }
    }
    async function setRatingValue(value, rating) {
      if (!rating.classList.contains('rating_sending')) {
        rating.classList.add('rating_sending');

        // Отправика данных (value) на сервер
        let response = await fetch('rating.json', {
          method: 'GET',

          //body: JSON.stringify({
          //	userRating: value
          //}),
          //headers: {
          //	'content-type': 'application/json'
          //}
        });
        if (response.ok) {
          const result = await response.json();

          // Получаем новый рейтинг
          const newRating = result.newRating;

          // Вывод нового среднего результата
          ratingValue.innerHTML = newRating;

          // Обновление активных звезд
          setRatingActiveWidth();

          rating.classList.remove('rating_sending');
        } else {
          alert('Ошибка');

          rating.classList.remove('rating_sending');
        }
      }
    }
  }
}
// const block = document.querySelector('body');
// const img = document.querySelectorAll('[data-prix-mouse]');
// const circle = document.querySelector('.icons-main-block__circle_1');

// block.addEventListener('mousemove', function (e) {
//   let x = e.clientX / innerWidth;
//   let y = e.clientY / innerHeight;

//   img.forEach((el) => {
//     el.setAttribute(
//       'style',
//       'margin-left:' + -x * 2 + '%;' + 'margin-top:' + -y * 2 + '%',
//     );
//   });

//   circle.setAttribute(
//     'style',
//     'margin-right:' + x * 2 + '%;' + 'margin-top:' + -y * 2 + '%',
//   );
// });

// block.addEventListener('mouseout', function (e) {
//   img.forEach((el) => {
//     el.setAttribute('style', 'margin:' + 0);
//   });

//   circle.setAttribute('style', 'margin' + 0);
// });
// Переменная контроля добавления события window scroll.
let addWindowScrollEvent = false;
//====================================================================================================================================================================================================================================================================================================
// Плавная навигация по странице
function pageNavigation() {
  // data-goto - указать ID блока
  // data-goto-header - учитывать header
  // data-goto-top - недокрутить на указанный размер
  // data-goto-speed - скорость (только если используется доп плагин)
  // Работаем при клике на пункт
  document.addEventListener('click', pageNavigationAction);
  // Если подключен scrollWatcher, подсвечиваем текущий пукт меню
  document.addEventListener('watcherCallback', pageNavigationAction);
  // Основная функция
  function pageNavigationAction(e) {
    if (e.type === 'click') {
      const targetElement = e.target;
      if (targetElement.closest('[data-goto]')) {
        const gotoLink = targetElement.closest('[data-goto]');
        const gotoLinkSelector = gotoLink.dataset.goto
          ? gotoLink.dataset.goto
          : '';
        const noHeader = gotoLink.hasAttribute('data-goto-header')
          ? true
          : false;
        const gotoSpeed = gotoLink.dataset.gotoSpeed
          ? gotoLink.dataset.gotoSpeed
          : 500;
        const offsetTop = gotoLink.dataset.gotoTop
          ? parseInt(gotoLink.dataset.gotoTop)
          : 0;
        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        e.preventDefault();
      }
    } else if (e.type === 'watcherCallback' && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      // Обработка пунктов навигации, если указано значение navigator подсвечиваем текущий пукт меню
      if (targetElement.dataset.watch === 'navigator') {
        const navigatorActiveItem = document.querySelector(
          `[data-goto]._navigator-active`,
        );
        let navigatorCurrentItem;
        if (
          targetElement.id &&
          document.querySelector(`[data-goto="#${targetElement.id}"]`)
        ) {
          navigatorCurrentItem = document.querySelector(
            `[data-goto="#${targetElement.id}"]`,
          );
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-goto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(
                `[data-goto=".${element}"]`,
              );
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          // Видим объект
          // navigatorActiveItem ? navigatorActiveItem.classList.remove('_navigator-active') : null;
          navigatorCurrentItem
            ? navigatorCurrentItem.classList.add('_navigator-active')
            : null;
        } else {
          // Не видим объект
          navigatorCurrentItem
            ? navigatorCurrentItem.classList.remove('_navigator-active')
            : null;
        }
      }
    }
  }
  // Прокрутка по хешу
  if (getHash()) {
    let goToHash;
    if (document.querySelector(`#${getHash()}`)) {
      goToHash = `#${getHash()}`;
    } else if (document.querySelector(`.${getHash()}`)) {
      goToHash = `.${getHash()}`;
    }
    goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
  }
}
// Работа с шапкой при скроле
function headerScroll() {
  addWindowScrollEvent = true;
  const header = document.querySelector('header.header');
  const headerShow = header.hasAttribute('data-scroll-show');
  const headerShowTimer = header.dataset.scrollShow
    ? header.dataset.scrollShow
    : 500;
  const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
  let scrollDirection = 0;
  let timer;
  document.addEventListener('windowScroll', function (e) {
    const scrollTop = window.scrollY;
    clearTimeout(timer);
    if (scrollTop >= startPoint) {
      !header.classList.contains('_header-scroll')
        ? header.classList.add('_header-scroll')
        : null;
      if (headerShow) {
        if (scrollTop > scrollDirection) {
          // downscroll code
          header.classList.contains('_header-show')
            ? header.classList.remove('_header-show')
            : null;
        } else {
          // upscroll code
          !header.classList.contains('_header-show')
            ? header.classList.add('_header-show')
            : null;
        }
        timer = setTimeout(() => {
          !header.classList.contains('_header-show')
            ? header.classList.add('_header-show')
            : null;
        }, headerShowTimer);
      }
    } else {
      header.classList.contains('_header-scroll')
        ? header.classList.remove('_header-scroll')
        : null;
      if (headerShow) {
        header.classList.contains('_header-show')
          ? header.classList.remove('_header-show')
          : null;
      }
    }
    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
  });
}
// Прилипающий блок
function stickyBlock() {
  addWindowScrollEvent = true;
  // data-sticky для родителя внутри которого прилипает блок *
  // data-sticky-header для родителя, учитываем высоту хедера
  // data-sticky-top="" для родителя, можно указать отступ сверху
  // data-sticky-bottom="" для родителя, можно указать отступ снизу
  // data-sticky-item для прилипающего блока *
  function stickyBlockInit() {
    const stickyParents = document.querySelectorAll('[data-sticky]');
    if (stickyParents.length) {
      stickyParents.forEach((stickyParent) => {
        let stickyConfig = {
          media: stickyParent.dataset.sticky
            ? parseInt(stickyParent.dataset.sticky)
            : null,
          top: stickyParent.dataset.stickyTop
            ? parseInt(stickyParent.dataset.stickyTop)
            : 0,
          bottom: stickyParent.dataset.stickyBottom
            ? parseInt(stickyParent.dataset.stickyBottom)
            : 0,
          header: stickyParent.hasAttribute('data-sticky-header')
            ? document.querySelector('header.header').offsetHeight
            : 0,
        };
        stickyBlockItem(stickyParent, stickyConfig);
      });
    }
  }
  function stickyBlockItem(stickyParent, stickyConfig) {
    const stickyBlockItem = stickyParent.querySelector('[data-sticky-item]');
    const headerHeight = stickyConfig.header;
    const offsetTop = headerHeight + stickyConfig.top;
    const startPoint =
      stickyBlockItem.getBoundingClientRect().top + scrollY - offsetTop;

    document.addEventListener('windowScroll', stickyBlockActions);
    //window.addEventListener("resize", stickyBlockActions);

    function stickyBlockActions(e) {
      const endPoint =
        stickyParent.offsetHeight +
        stickyParent.getBoundingClientRect().top +
        scrollY -
        (offsetTop + stickyBlockItem.offsetHeight + stickyConfig.bottom);
      let stickyItemValues = {
        position: 'relative',
        bottom: 'auto',
        top: '0px',
        left: '0px',
        width: 'auto',
      };
      if (!stickyConfig.media || stickyConfig.media < window.innerWidth) {
        if (
          offsetTop + stickyConfig.bottom + stickyBlockItem.offsetHeight <
          window.innerHeight
        ) {
          if (scrollY >= startPoint && scrollY <= endPoint) {
            stickyItemValues.position = `fixed`;
            stickyItemValues.bottom = `auto`;
            stickyItemValues.top = `${offsetTop}px`;
            stickyItemValues.left = `${
              stickyBlockItem.getBoundingClientRect().left
            }px`; // Учесть разницу в ширине экрана?
            stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
          } else if (scrollY >= endPoint) {
            stickyItemValues.position = `absolute`;
            stickyItemValues.bottom = `${stickyConfig.bottom}px`;
            stickyItemValues.top = `auto`;
            stickyItemValues.left = `0px`;
            stickyItemValues.width = `${stickyBlockItem.offsetWidth}px`;
          }
        }
      }
      stickyBlockType(stickyBlockItem, stickyItemValues);
    }
  }
  function stickyBlockType(stickyBlockItem, stickyItemValues) {
    stickyBlockItem.style.cssText = `position:${stickyItemValues.position};bottom:${stickyItemValues.bottom};top:${stickyItemValues.top};left:${stickyItemValues.left};width:${stickyItemValues.width};`;
  }
  stickyBlockInit();
}
// При подключении модуля обработчик события запустится автоматически
setTimeout(() => {
  if (addWindowScrollEvent) {
    let windowScroll = new Event('windowScroll');
    window.addEventListener('scroll', function (e) {
      document.dispatchEvent(windowScroll);
    });
  }
}, 0);
headerScroll();
/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
/* Проверка мобильного браузера */
let isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
/* Добавление класса touch для HTML если браузер мобильный */
function addTouchClass() {
  // Добавление класса _touch для HTML если браузер мобильный
  if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
function addLoadedClass() {
  window.addEventListener('load', function () {
    setTimeout(function () {
      document.documentElement.classList.add('loaded');
    }, 0);
  });
}
// Получение хеша в адресе сайта
function getHash() {
  if (location.hash) {
    return location.hash.replace('#', '');
  }
}
// Указание хеша в адресе сайта
function setHash(hash) {
  hash = hash ? `#${hash}` : window.location.href.split('#')[0];
  history.pushState('', '', hash);
}
// Учет плавающей панели на мобильных устройствах при 100vh
function fullVHfix() {
  const fullScreens = document.querySelectorAll('[data-fullscreen]');
  if (fullScreens.length && isMobile.any()) {
    window.addEventListener('resize', fixHeight);
    function fixHeight() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    fixHeight();
  }
}
// Вспомогательные модули плавного расскрытия и закрытия объекта ======================================================================================================================================================================
let _slideUp = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
      target.hidden = !showmore ? true : false;
      !showmore ? target.style.removeProperty('height') : null;
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      !showmore ? target.style.removeProperty('overflow') : null;
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideUpDone', {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    target.hidden = target.hidden ? false : null;
    showmore ? target.style.removeProperty('height') : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = showmore ? `${showmore}px` : `0px`;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
      // Создаем событие
      document.dispatchEvent(
        new CustomEvent('slideDownDone', {
          detail: {
            target: target,
          },
        }),
      );
    }, duration);
  }
};
let _slideToggle = (target, duration = 500) => {
  if (target.hidden) {
    return _slideDown(target, duration);
  } else {
    return _slideUp(target, duration);
  }
};
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
let bodyLockStatus = true;
let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
let bodyUnlock = (delay = 500) => {
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]');
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      document.documentElement.classList.remove('lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
let bodyLock = (delay = 500) => {
  let body = document.querySelector('body');
  if (bodyLockStatus) {
    let lock_padding = document.querySelectorAll('[data-lp]');
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
    }
    body.style.paddingRight =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add('lock');

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
// Модуль работы со спойлерами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-spojlery.html
Сниппет (HTML): spollers
*/
function spollers() {
  const spollersArray = document.querySelectorAll('[data-spollers]');
  if (spollersArray.length > 0) {
    // Получение обычных слойлеров
    const spollersRegular = Array.from(spollersArray).filter(function (
      item,
      index,
      self,
    ) {
      return !item.dataset.spollers.split(',')[0];
    });
    // Инициализация обычных слойлеров
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(spollersArray, 'spollers');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    // Инициализация
    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add('_spoller-init');
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener('click', setSpollerAction);
        } else {
          spollersBlock.classList.remove('_spoller-init');
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener('click', setSpollerAction);
        }
      });
    }
    // Работа с контентом
    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
      if (spollerTitles.length) {
        spollerTitles = Array.from(spollerTitles).filter(
          (item) => item.closest('[data-spollers]') === spollersBlock,
        );
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute('tabindex');
            if (!spollerTitle.classList.contains('_spoller-active')) {
              spollerTitle.nextElementSibling.hidden = true;
            }
          } else {
            spollerTitle.setAttribute('tabindex', '-1');
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.closest('[data-spoller]')) {
        const spollerTitle = el.closest('[data-spoller]');
        const spollersBlock = spollerTitle.closest('[data-spollers]');
        const oneSpoller = spollersBlock.hasAttribute('data-one-spoller');
        const spollerSpeed = spollersBlock.dataset.spollersSpeed
          ? parseInt(spollersBlock.dataset.spollersSpeed)
          : 500;
        if (!spollersBlock.querySelectorAll('._slide').length) {
          if (
            oneSpoller &&
            !spollerTitle.classList.contains('_spoller-active')
          ) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle('_spoller-active');
          _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
        }
        e.preventDefault();
      }
    }
    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector(
        '[data-spoller]._spoller-active',
      );
      const spollerSpeed = spollersBlock.dataset.spollersSpeed
        ? parseInt(spollersBlock.dataset.spollersSpeed)
        : 500;
      if (
        spollerActiveTitle &&
        !spollersBlock.querySelectorAll('._slide').length
      ) {
        spollerActiveTitle.classList.remove('_spoller-active');
        _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
      }
    }
    // Закрытие при клике вне спойлера
    const spollersClose = document.querySelectorAll('[data-spoller-close]');
    if (spollersClose.length) {
      document.addEventListener('click', function (e) {
        const el = e.target;
        if (!el.closest('[data-spollers]')) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest('[data-spollers]');
            const spollerSpeed = spollersBlock.dataset.spollersSpeed
              ? parseInt(spollersBlock.dataset.spollersSpeed)
              : 500;
            spollerClose.classList.remove('_spoller-active');
            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
          });
        }
      });
    }
  }
}
// Модуь работы с табами =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-taby.html
Сниппет (HTML): tabs
*/
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener('click', setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, 'tabs');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems = Array.from(tabsContentItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-titles]>._tab-active',
      );
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden =
          !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (
        !tabTitle.classList.contains('_tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-title]._tab-active',
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              (item) => item.closest('[data-tabs]') === tabsBlock,
            ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('_tab-active')
          : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/menu-burger.html
Сниппет (HTML): menu
*/
function menuInit() {
  if (document.querySelector('.icon-menu')) {
    document.addEventListener('click', function (e) {
      if (bodyLockStatus && e.target.closest('.icon-menu')) {
        bodyLockToggle();
        document.documentElement.classList.toggle('menu-open');
      }
    });
  }
}
function menuOpen() {
  bodyLock();
  document.documentElement.classList.add('menu-open');
}
function menuClose() {
  bodyUnlock();
  document.documentElement.classList.remove('menu-open');
}
// Модуль "показать еще" =======================================================================================================================================================================================================================
/*
Документация по работе в шаблоне: https://template.fls.guru/template-docs/modul-pokazat-eshhjo.html
Сниппет (HTML): showmore
*/
function showMore() {
  window.addEventListener('load', function (e) {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]');
    let showMoreBlocksRegular;
    let mdQueriesArray;
    if (showMoreBlocks.length) {
      // Получение обычных объектов
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (
        item,
        index,
        self,
      ) {
        return !item.dataset.showmoreMedia;
      });
      // Инициализация обычных объектов
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null;

      document.addEventListener('click', showMoreActions);
      window.addEventListener('resize', showMoreActions);

      // Получение объектов с медиа запросами
      mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia');
      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach((mdQueriesItem) => {
          // Событие
          mdQueriesItem.matchMedia.addEventListener('change', function () {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
          });
        });
        initItemsMedia(mdQueriesArray);
      }
    }
    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach((showMoreBlock) => {
        initItem(showMoreBlock, matchMedia);
      });
    }
    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock;
      let showMoreContent = showMoreBlock.querySelectorAll(
        '[data-showmore-content]',
      );
      let showMoreButton = showMoreBlock.querySelectorAll(
        '[data-showmore-button]',
      );
      showMoreContent = Array.from(showMoreContent).filter(
        (item) => item.closest('[data-showmore]') === showMoreBlock,
      )[0];
      showMoreButton = Array.from(showMoreButton).filter(
        (item) => item.closest('[data-showmore]') === showMoreBlock,
      )[0];
      const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          _slideUp(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = false;
        } else {
          _slideDown(showMoreContent, 0, hiddenHeight);
          showMoreButton.hidden = true;
        }
      } else {
        _slideDown(showMoreContent, 0, hiddenHeight);
        showMoreButton.hidden = true;
      }
    }
    function getHeight(showMoreBlock, showMoreContent) {
      let hiddenHeight = 0;
      const showMoreType = showMoreBlock.dataset.showmore
        ? showMoreBlock.dataset.showmore
        : 'size';
      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 3;
        const showMoreItems = showMoreContent.children;
        for (let index = 1; index < showMoreItems.length; index++) {
          const showMoreItem = showMoreItems[index - 1];
          hiddenHeight += showMoreItem.offsetHeight;
          if (index == showMoreTypeValue) break;
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent
          ? showMoreContent.dataset.showmoreContent
          : 150;
        hiddenHeight = showMoreTypeValue;
      }
      return hiddenHeight;
    }
    function getOriginalHeight(showMoreContent) {
      let parentHidden;
      let hiddenHeight = showMoreContent.offsetHeight;
      showMoreContent.style.removeProperty('height');
      if (showMoreContent.closest(`[hidden]`)) {
        parentHidden = showMoreContent.closest(`[hidden]`);
        parentHidden.hidden = false;
      }
      let originalHeight = showMoreContent.offsetHeight;
      parentHidden ? (parentHidden.hidden = true) : null;
      showMoreContent.style.height = `${hiddenHeight}px`;
      return originalHeight;
    }
    function showMoreActions(e) {
      const targetEvent = e.target;
      const targetType = e.type;
      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]');
          const showMoreBlock = showMoreButton.closest('[data-showmore]');
          const showMoreContent = showMoreBlock.querySelector(
            '[data-showmore-content]',
          );
          const showMoreSpeed = showMoreBlock.dataset.showmoreButton
            ? showMoreBlock.dataset.showmoreButton
            : '500';
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent);
          if (!showMoreContent.classList.contains('_slide')) {
            showMoreBlock.classList.contains('_showmore-active')
              ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight);
            showMoreBlock.classList.toggle('_showmore-active');
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length
          ? initItems(showMoreBlocksRegular)
          : null;
        mdQueriesArray && mdQueriesArray.length
          ? initItemsMedia(mdQueriesArray)
          : null;
      }
    }
  });
}
//================================================================================================================================================================================================================================================================================================================
// Прочие полезные функции ================================================================================================================================================================================================================================================================================================================
//================================================================================================================================================================================================================================================================================================================
// FLS (Full Logging System)
function FLS(message) {
  setTimeout(() => {
    if (window.FLS) {
      console.log(message);
    }
  }, 0);
}
// Получить цифры из строки
function getDigFromString(item) {
  return parseInt(item.replace(/[^\d]/g, ''));
}
// Форматирование цифр типа 100 000 000
function getDigFormat(item) {
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
// Убрать класс из всех элементов массива
function removeClasses(array, className) {
  for (var i = 0; i < array.length; i++) {
    array[i].classList.remove(className);
  }
}
// Уникализация массива
function uniqArray(array) {
  return array.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });
}
// Функция получения индекса внутри родителя
function indexInParent(parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
}
// Обработа медиа запросов из атрибутов
function dataMediaQueries(array, dataSetValue) {
  // Получение объектов с медиа запросами
  const media = Array.from(array).filter(function (item, index, self) {
    if (item.dataset[dataSetValue]) {
      return item.dataset[dataSetValue].split(',')[0];
    }
  });
  // Инициализация объектов с медиа запросами
  if (media.length) {
    const breakpointsArray = [];
    media.forEach((item) => {
      const params = item.dataset[dataSetValue];
      const breakpoint = {};
      const paramsArray = params.split(',');
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    // Получаем уникальные брейкпоинты
    let mdQueries = breakpointsArray.map(function (item) {
      return (
        '(' +
        item.type +
        '-width: ' +
        item.value +
        'px),' +
        item.value +
        ',' +
        item.type
      );
    });
    mdQueries = uniqArray(mdQueries);
    const mdQueriesArray = [];

    if (mdQueries.length) {
      // Работаем с каждым брейкпоинтом
      mdQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(',');
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);
        // Объекты с нужными условиями
        const itemsArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });
        mdQueriesArray.push({
          itemsArray,
          matchMedia,
        });
      });
      return mdQueriesArray;
    }
  }
}

spollers();
// Подключение из node_modules
// import tippy from 'tippy.js';

// import tippy from 'tippy.js';
// import '../css/style.css';
// import 'tippy.js/dist/tippy.css'; // optional for styling

tippy('[data-tippy-content]');

// Подключение cтилей из src/assets/scss/
// import '../../scss/components/tippy.scss';
// Подключение cтилей из node_modules
// import 'tippy.js/dist/tippy.css';

// // Запускаем и добавляем в объект модулей
// flsModules.tippy = tippy('[data-tippy-content]', {});
function formRating() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }
  // Основная функция
  function initRatings() {
    let ratingActive, ratingValue;
    // "Бегаем" по всем рейтингам на странице
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    // Инициализируем конкретный рейтинг
    function initRating(rating) {
      initRatingVars(rating);

      setRatingActiveWidth();

      if (rating.classList.contains('rating_set')) {
        setRating(rating);
      }
    }
    // Инициализайция переменных
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }
    // Изменяем ширину активных звезд
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
    // Возможность указать оценку
    function setRating(rating) {
      const ratingItems = rating.querySelectorAll('.rating__item');
      for (let index = 0; index < ratingItems.length; index++) {
        const ratingItem = ratingItems[index];
        ratingItem.addEventListener('mouseenter', function (e) {
          // Обновление переменных
          initRatingVars(rating);
          // Обновление активных звезд
          setRatingActiveWidth(ratingItem.value);
        });
        ratingItem.addEventListener('mouseleave', function (e) {
          // Обновление активных звезд
          setRatingActiveWidth();
        });
        ratingItem.addEventListener('click', function (e) {
          // Обновление переменных
          initRatingVars(rating);

          if (rating.dataset.ajax) {
            // "Отправить" на сервер
            setRatingValue(ratingItem.value, rating);
          } else {
            // Отобразить указанную оцнку
            ratingValue.innerHTML = index + 1;
            setRatingActiveWidth();
          }
        });
      }
    }
    async function setRatingValue(value, rating) {
      if (!rating.classList.contains('rating_sending')) {
        rating.classList.add('rating_sending');

        // Отправика данных (value) на сервер
        let response = await fetch('rating.json', {
          method: 'GET',

          //body: JSON.stringify({
          //	userRating: value
          //}),
          //headers: {
          //	'content-type': 'application/json'
          //}
        });
        if (response.ok) {
          const result = await response.json();

          // Получаем новый рейтинг
          const newRating = result.newRating;

          // Вывод нового среднего результата
          ratingValue.innerHTML = newRating;

          // Обновление активных звезд
          setRatingActiveWidth();

          rating.classList.remove('rating_sending');
        } else {
          alert('Ошибка');

          rating.classList.remove('rating_sending');
        }
      }
    }
  }
}

formRating();
/*
// Настройки
Для селекта (select):
class="имя класса" - модификатор к конкретному селекту
multiple - мультивыбор
data-class-modif= "имя модификатора"
data-tags - режим тегов, только для (только для multiple)
data-scroll - включит прокрутку для выпадающего списка, дополнительно можно подключить кастомный скролл simplebar в app.js. Указанное число для атрибута ограничит высоту
data-checkbox - стилизация элементов по checkbox (только для multiple)
data-show-selected - отключает скрытие выбранного элемента
data-search - позволяет искать по выпадающему списку
data-open - селект открыт сразу
data-submit - отправляет форму при изменении селекта

data-one-select - селекты внутри оболочки с атрибутом будут показываться только по одному
data-pseudo-label - добавляет псевдоэлемент к заголовку селекта с указанным текстом

Для плейсхолдера (Плейсхолдер - это option с value=""):
data-label для плейсхолдера, добавляет label к селекту
data-show для плейсхолдера, показывает его в списке (только для единичного выбора)

Для элемента (option):
data-class="имя класса" - добавляет класс
data-asset="путь к картинке или текст" - добавляет структуру 2х колонок и данными
data-href="адрес ссылки" - добавляет ссылку в элемент списка
data-href-blank - откроет ссылку в новом окне
*/

/*
// Возможные доработки:
попап на мобилке
*/

// Класс построения Select
class SelectConstructor {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true,
      logging: true,
    };
    this.config = Object.assign(defaultConfig, props);
    // CSS классы модуля
    this.selectClasses = {
      classSelect: 'select', // Главный блок
      classSelectBody: 'select__body', // Тело селекта
      classSelectTitle: 'select__title', // Заголовок
      classSelectValue: 'select__value', // Значение в заголовке
      classSelectLabel: 'select__label', // Лабел
      classSelectInput: 'select__input', // Поле ввода
      classSelectText: 'select__text', // Оболочка текстовых данных
      classSelectLink: 'select__link', // Ссылка в элементе
      classSelectOptions: 'select__options', // Выпадающий список
      classSelectOptionsScroll: 'select__scroll', // Оболочка при скролле
      classSelectOption: 'select__option', // Пункт
      classSelectContent: 'select__content', // Оболочка контента в заголовке
      classSelectRow: 'select__row', // Ряд
      classSelectData: 'select__asset', // Дополнительные данные
      classSelectDisabled: '_select-disabled', // Запрешен
      classSelectTag: '_select-tag', // Класс тега
      classSelectOpen: '_select-open', // Список открыт
      classSelectActive: '_select-active', // Список выбран
      classSelectFocus: '_select-focus', // Список в фокусе
      classSelectMultiple: '_select-multiple', // Мультивыбор
      classSelectCheckBox: '_select-checkbox', // Стиль чекбокса
      classSelectOptionSelected: '_select-selected', // Выбранный пункт
      classSelectPseudoLabel: '_select-pseudo-label', // Псевдолейбл
    };
    this._this = this;
    // Запуск инициализации
    if (this.config.init) {
      // Получение всех select на странице
      const selectItems = data
        ? document.querySelectorAll(data)
        : document.querySelectorAll('select');
      if (selectItems.length) {
        this.selectsInit(selectItems);
        this.setLogging(
          `Проснулся, построил селектов: (${selectItems.length})`,
        );
      } else {
        this.setLogging('Сплю, нет ни одного select zzZZZzZZz');
      }
    }
  }
  // Конструктор CSS класса
  getSelectClass(className) {
    return `.${className}`;
  }
  // Геттер элементов псевдоселекта
  getSelectElement(selectItem, className) {
    return {
      originalSelect: selectItem.querySelector('select'),
      selectElement: selectItem.querySelector(this.getSelectClass(className)),
    };
  }
  // Функция инициализации всех селектов
  selectsInit(selectItems) {
    selectItems.forEach((originalSelect, index) => {
      this.selectInit(originalSelect, index + 1);
    });
    // Обработчики событий...
    // ...при клике
    document.addEventListener(
      'click',
      function (e) {
        this.selectsActions(e);
      }.bind(this),
    );
    // ...при нажатии клавиши
    document.addEventListener(
      'keydown',
      function (e) {
        this.selectsActions(e);
      }.bind(this),
    );
    // ...при фокусе
    document.addEventListener(
      'focusin',
      function (e) {
        this.selectsActions(e);
      }.bind(this),
    );
    // ...при потере фокуса
    document.addEventListener(
      'focusout',
      function (e) {
        this.selectsActions(e);
      }.bind(this),
    );
  }
  // Функция инициализации конкретного селекта
  selectInit(originalSelect, index) {
    const _this = this;
    // Создаем оболочку
    let selectItem = document.createElement('div');
    selectItem.classList.add(this.selectClasses.classSelect);
    // Выводим оболочку перед оригинальным селектом
    originalSelect.parentNode.insertBefore(selectItem, originalSelect);
    // Помещаем оригинальный селект в оболочку
    selectItem.appendChild(originalSelect);
    // Скрываем оригинальный селект
    originalSelect.hidden = true;
    // Присваиваем уникальный ID
    index ? (originalSelect.dataset.id = index) : null;

    // Работа с плейсхолдером
    if (this.getSelectPlaceholder(originalSelect)) {
      // Запоминаем плейсхолдер
      originalSelect.dataset.placeholder =
        this.getSelectPlaceholder(originalSelect).value;
      // Если включен режим label
      if (this.getSelectPlaceholder(originalSelect).label.show) {
        const selectItemTitle = this.getSelectElement(
          selectItem,
          this.selectClasses.classSelectTitle,
        ).selectElement;
        selectItemTitle.insertAdjacentHTML(
          'afterbegin',
          `<span class="${this.selectClasses.classSelectLabel}">${
            this.getSelectPlaceholder(originalSelect).label.text
              ? this.getSelectPlaceholder(originalSelect).label.text
              : this.getSelectPlaceholder(originalSelect).value
          }</span>`,
        );
      }
    }
    // Конструктор основных элементов
    selectItem.insertAdjacentHTML(
      'beforeend',
      `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
    );
    // Запускаем конструктор псевдоселекта
    this.selectBuild(originalSelect);

    // Запоминаем скорость
    originalSelect.dataset.speed = originalSelect.dataset.speed
      ? originalSelect.dataset.speed
      : '150';
    // Событие при изменении оригинального select
    originalSelect.addEventListener('change', function (e) {
      _this.selectChange(e);
    });
  }
  // Конструктор псевдоселекта
  selectBuild(originalSelect) {
    const selectItem = originalSelect.parentElement;
    // Добавляем ID селекта
    selectItem.dataset.id = originalSelect.dataset.id;
    // Получаем класс оригинального селекта, создаем модификатор и добавляем его
    originalSelect.dataset.classModif
      ? selectItem.classList.add(`select_${originalSelect.dataset.classModif}`)
      : null;
    // Если множественный выбор, добавляем класс
    originalSelect.multiple
      ? selectItem.classList.add(this.selectClasses.classSelectMultiple)
      : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
    // Cтилизация элементов под checkbox (только для multiple)
    originalSelect.hasAttribute('data-checkbox') && originalSelect.multiple
      ? selectItem.classList.add(this.selectClasses.classSelectCheckBox)
      : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
    // Сеттер значения заголовка селекта
    this.setSelectTitleValue(selectItem, originalSelect);
    // Сеттер элементов списка (options)
    this.setOptions(selectItem, originalSelect);
    // Если включена опция поиска data-search, запускаем обработчик
    originalSelect.hasAttribute('data-search')
      ? this.searchActions(selectItem)
      : null;
    // Если указана настройка data-open, открываем селект
    originalSelect.hasAttribute('data-open')
      ? this.selectAction(selectItem)
      : null;
    // Обработчик disabled
    this.selectDisabled(selectItem, originalSelect);
  }
  // Функция реакций на события
  selectsActions(e) {
    const targetElement = e.target;
    const targetType = e.type;
    if (
      targetElement.closest(
        this.getSelectClass(this.selectClasses.classSelect),
      ) ||
      targetElement.closest(
        this.getSelectClass(this.selectClasses.classSelectTag),
      )
    ) {
      const selectItem = targetElement.closest('.select')
        ? targetElement.closest('.select')
        : document.querySelector(
            `.${this.selectClasses.classSelect}[data-id="${
              targetElement.closest(
                this.getSelectClass(this.selectClasses.classSelectTag),
              ).dataset.selectId
            }"]`,
          );
      const originalSelect = this.getSelectElement(selectItem).originalSelect;
      if (targetType === 'click') {
        if (!originalSelect.disabled) {
          if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTag),
            )
          ) {
            // Обработка клика на тег
            const targetTag = targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTag),
            );
            const optionItem = document.querySelector(
              `.${this.selectClasses.classSelect}[data-id="${targetTag.dataset.selectId}"] .select__option[data-value="${targetTag.dataset.value}"]`,
            );
            this.optionAction(selectItem, originalSelect, optionItem);
          } else if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectTitle),
            )
          ) {
            // Обработка клика на заголовок селекта
            this.selectAction(selectItem);
          } else if (
            targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectOption),
            )
          ) {
            // Обработка клика на элемент селекта
            const optionItem = targetElement.closest(
              this.getSelectClass(this.selectClasses.classSelectOption),
            );
            this.optionAction(selectItem, originalSelect, optionItem);
          }
        }
      } else if (targetType === 'focusin' || targetType === 'focusout') {
        if (
          targetElement.closest(
            this.getSelectClass(this.selectClasses.classSelect),
          )
        ) {
          targetType === 'focusin'
            ? selectItem.classList.add(this.selectClasses.classSelectFocus)
            : selectItem.classList.remove(this.selectClasses.classSelectFocus);
        }
      } else if (targetType === 'keydown' && e.code === 'Escape') {
        this.selectsСlose();
      }
    } else {
      this.selectsСlose();
    }
  }
  // Функция закрытия всех селектов
  selectsСlose(selectOneGroup) {
    const selectsGroup = selectOneGroup ? selectOneGroup : document;
    const selectActiveItems = selectsGroup.querySelectorAll(
      `${this.getSelectClass(
        this.selectClasses.classSelect,
      )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
    );
    if (selectActiveItems.length) {
      selectActiveItems.forEach((selectActiveItem) => {
        this.selectСlose(selectActiveItem);
      });
    }
  }
  // Функция закрытия конкретного селекта
  selectСlose(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;
    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.remove(this.selectClasses.classSelectOpen);
      _slideUp(selectOptions, originalSelect.dataset.speed);
    }
  }
  // Функция открытия/закрытия конкретного селекта
  selectAction(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;

    // Если селекты помещенны в элемент с дата атрибутом data-one-select
    // закрываем все открытые селекты
    if (originalSelect.closest('[data-one-select]')) {
      const selectOneGroup = originalSelect.closest('[data-one-select]');
      this.selectsСlose(selectOneGroup);
    }

    if (!selectOptions.classList.contains('_slide')) {
      selectItem.classList.toggle(this.selectClasses.classSelectOpen);
      _slideToggle(selectOptions, originalSelect.dataset.speed);
    }
  }
  // Сеттер значения заголовка селекта
  setSelectTitleValue(selectItem, originalSelect) {
    const selectItemBody = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectBody,
    ).selectElement;
    const selectItemTitle = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectTitle,
    ).selectElement;
    if (selectItemTitle) selectItemTitle.remove();
    selectItemBody.insertAdjacentHTML(
      'afterbegin',
      this.getSelectTitleValue(selectItem, originalSelect),
    );
  }
  // Конструктор значения заголовка
  getSelectTitleValue(selectItem, originalSelect) {
    // Получаем выбранные текстовые значения
    let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
    // Обработка значений мультивыбора
    // Если включен режим тегов (указана настройка data-tags)
    if (originalSelect.multiple && originalSelect.hasAttribute('data-tags')) {
      selectTitleValue = this.getSelectedOptionsData(originalSelect)
        .elements.map(
          (option) =>
            `<span role="button" data-select-id="${
              selectItem.dataset.id
            }" data-value="${
              option.value
            }" class="_select-tag">${this.getSelectElementContent(
              option,
            )}</span>`,
        )
        .join('');
      // Если вывод тегов во внешний блок
      if (
        originalSelect.dataset.tags &&
        document.querySelector(originalSelect.dataset.tags)
      ) {
        document.querySelector(originalSelect.dataset.tags).innerHTML =
          selectTitleValue;
        if (originalSelect.hasAttribute('data-search'))
          selectTitleValue = false;
      }
    }
    // Значение(я) или плейсхолдер
    selectTitleValue = selectTitleValue.length
      ? selectTitleValue
      : originalSelect.dataset.placeholder
      ? originalSelect.dataset.placeholder
      : '';
    // Если включен режим pseudo
    let pseudoAttribute = '';
    let pseudoAttributeClass = '';
    if (originalSelect.hasAttribute('data-pseudo-label')) {
      pseudoAttribute = originalSelect.dataset.pseudoLabel
        ? ` data-pseudo-label="${originalSelect.dataset.pseudoLabel}"`
        : ` data-pseudo-label="Заполните атрибут"`;
      pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
    }
    // Если есть значение, добавляем класс
    this.getSelectedOptionsData(originalSelect).values.length
      ? selectItem.classList.add(this.selectClasses.classSelectActive)
      : selectItem.classList.remove(this.selectClasses.classSelectActive);
    // Возвращаем поле ввода для поиска или текст
    if (originalSelect.hasAttribute('data-search')) {
      // Выводим поле ввода для поиска
      return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
    } else {
      // Если выбран элемент со своим классом
      const customClass =
        this.getSelectedOptionsData(originalSelect).elements.length &&
        this.getSelectedOptionsData(originalSelect).elements[0].dataset.class
          ? ` ${
              this.getSelectedOptionsData(originalSelect).elements[0].dataset
                .class
            }`
          : '';
      // Выводим текстовое значение
      return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
    }
  }
  // Конструктор данных для значения заголовка
  getSelectElementContent(selectOption) {
    // Если для элемента указан вывод картинки или текста, перестраиваем конструкцию
    const selectOptionData = selectOption.dataset.asset
      ? `${selectOption.dataset.asset}`
      : '';
    const selectOptionDataHTML =
      selectOptionData.indexOf('img') >= 0
        ? `<img src="${selectOptionData}" alt="">`
        : selectOptionData;
    let selectOptionContentHTML = ``;
    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectRow}">`
      : '';
    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectData}">`
      : '';
    selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData
      ? `<span class="${this.selectClasses.classSelectText}">`
      : '';
    selectOptionContentHTML += selectOption.textContent;
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    selectOptionContentHTML += selectOptionData ? `</span>` : '';
    return selectOptionContentHTML;
  }
  // Получение данных плейсхолдера
  getSelectPlaceholder(originalSelect) {
    const selectPlaceholder = Array.from(originalSelect.options).find(
      (option) => !option.value,
    );
    if (selectPlaceholder) {
      return {
        value: selectPlaceholder.textContent,
        show: selectPlaceholder.hasAttribute('data-show'),
        label: {
          show: selectPlaceholder.hasAttribute('data-label'),
          text: selectPlaceholder.dataset.label,
        },
      };
    }
  }
  // Получение данных из выбранных элементов
  getSelectedOptionsData(originalSelect, type) {
    // Получаем все выбранные объекты из select
    let selectedOptions = [];
    if (originalSelect.multiple) {
      // Если мультивыбор
      // Убираем плейсхолдер, получаем остальные выбранные элементы
      selectedOptions = Array.from(originalSelect.options)
        .filter((option) => option.value)
        .filter((option) => option.selected);
    } else {
      // Если единичный выбор
      selectedOptions.push(
        originalSelect.options[originalSelect.selectedIndex],
      );
    }
    return {
      elements: selectedOptions.map((option) => option),
      values: selectedOptions
        .filter((option) => option.value)
        .map((option) => option.value),
      html: selectedOptions.map((option) =>
        this.getSelectElementContent(option),
      ),
    };
  }
  // Конструктор элементов списка
  getOptions(originalSelect) {
    // Настрока скролла элементов
    let selectOptionsScroll = originalSelect.hasAttribute('data-scroll')
      ? `data-simplebar`
      : '';
    let selectOptionsScrollHeight = originalSelect.dataset.scroll
      ? `style="max-height:${originalSelect.dataset.scroll}px"`
      : '';
    // Получаем элементы списка
    let selectOptions = Array.from(originalSelect.options);
    if (selectOptions.length > 0) {
      let selectOptionsHTML = ``;
      // Если указана настройка data-show, показываем плейсхолдер в списке
      if (
        (this.getSelectPlaceholder(originalSelect) &&
          !this.getSelectPlaceholder(originalSelect).show) ||
        originalSelect.multiple
      ) {
        selectOptions = selectOptions.filter((option) => option.value);
      }
      // Строим и выводим основную конструкцию
      selectOptionsHTML += selectOptionsScroll
        ? `<div ${selectOptionsScroll} ${selectOptionsScrollHeight} class="${this.selectClasses.classSelectOptionsScroll}">`
        : '';
      selectOptions.forEach((selectOption) => {
        // Получаем конструкцию конкретного элемента списка
        selectOptionsHTML += this.getOption(selectOption, originalSelect);
      });
      selectOptionsHTML += selectOptionsScroll ? `</div>` : '';
      return selectOptionsHTML;
    }
  }
  // Конструктор конкретного элемента списка
  getOption(selectOption, originalSelect) {
    // Если элемент выбран и включен режим мультивыбора, добавляем класс
    const selectOptionSelected =
      selectOption.selected && originalSelect.multiple
        ? ` ${this.selectClasses.classSelectOptionSelected}`
        : '';
    // Если элемент выбрани и нет настройки data-show-selected, скрываем элемент
    const selectOptionHide =
      selectOption.selected &&
      !originalSelect.hasAttribute('data-show-selected') &&
      !originalSelect.multiple
        ? `hidden`
        : ``;
    // Если для элемента указан класс добавляем
    const selectOptionClass = selectOption.dataset.class
      ? ` ${selectOption.dataset.class}`
      : '';
    // Если указан режим ссылки
    const selectOptionLink = selectOption.dataset.href
      ? selectOption.dataset.href
      : false;
    const selectOptionLinkTarget = selectOption.hasAttribute('data-href-blank')
      ? `target="_blank"`
      : '';
    // Строим и возвращаем конструкцию элемента
    let selectOptionHTML = ``;
    selectOptionHTML += selectOptionLink
      ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">`
      : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-value="${selectOption.value}" type="button">`;
    selectOptionHTML += this.getSelectElementContent(selectOption);
    selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
    return selectOptionHTML;
  }
  // Сеттер элементов списка (options)
  setOptions(selectItem, originalSelect) {
    // Получаем объект тела псевдоселекта
    const selectItemOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;
    // Запускаем конструктор элементов списка (options) и добавляем в тело псевдоселекта
    selectItemOptions.innerHTML = this.getOptions(originalSelect);
  }
  // Обработчик клика на элемент списка
  optionAction(selectItem, originalSelect, optionItem) {
    if (originalSelect.multiple) {
      // Если мультивыбор
      // Выделяем классом элемент
      optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
      // Очищаем выбранные элементы
      const originalSelectSelectedItems =
        this.getSelectedOptionsData(originalSelect).elements;
      originalSelectSelectedItems.forEach((originalSelectSelectedItem) => {
        originalSelectSelectedItem.removeAttribute('selected');
      });
      // Выбираем элементы
      const selectSelectedItems = selectItem.querySelectorAll(
        this.getSelectClass(this.selectClasses.classSelectOptionSelected),
      );
      selectSelectedItems.forEach((selectSelectedItems) => {
        originalSelect
          .querySelector(`option[value="${selectSelectedItems.dataset.value}"]`)
          .setAttribute('selected', 'selected');
      });
    } else {
      // Если единичный выбор
      // Если не указана настройка data-show-selected, скрываем выбранный элемент
      if (!originalSelect.hasAttribute('data-show-selected')) {
        // Сначала все показать
        if (
          selectItem.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption,
            )}[hidden]`,
          )
        ) {
          selectItem.querySelector(
            `${this.getSelectClass(
              this.selectClasses.classSelectOption,
            )}[hidden]`,
          ).hidden = false;
        }
        // Скрываем выбранную
        optionItem.hidden = true;
      }
      originalSelect.value = optionItem.hasAttribute('data-value')
        ? optionItem.dataset.value
        : optionItem.textContent;
      this.selectAction(selectItem);
    }
    // Обновляем заголовок селекта
    this.setSelectTitleValue(selectItem, originalSelect);
    // Вызываем реакцию на изменение селекта
    this.setSelectChange(originalSelect);
  }
  // Реакция на измененение оригинального select
  selectChange(e) {
    const originalSelect = e.target;
    this.selectBuild(originalSelect);
    this.setSelectChange(originalSelect);
  }
  // Обработчик изменения в селекте
  setSelectChange(originalSelect) {
    // Моментальная валидация селекта
    if (originalSelect.hasAttribute('data-validate')) {
      formValidate.validateInput(originalSelect);
    }
    // При изменении селекта отправляем форму
    if (originalSelect.hasAttribute('data-submit') && originalSelect.value) {
      let tempButton = document.createElement('button');
      tempButton.type = 'submit';
      originalSelect.closest('form').append(tempButton);
      tempButton.click();
      tempButton.remove();
    }
    const selectItem = originalSelect.parentElement;
    // Вызов коллбэк функции
    this.selectCallback(selectItem, originalSelect);
  }
  // Обработчик disabled
  selectDisabled(selectItem, originalSelect) {
    if (originalSelect.disabled) {
      selectItem.classList.add(this.selectClasses.classSelectDisabled);
      this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle,
      ).selectElement.disabled = true;
    } else {
      selectItem.classList.remove(this.selectClasses.classSelectDisabled);
      this.getSelectElement(
        selectItem,
        this.selectClasses.classSelectTitle,
      ).selectElement.disabled = false;
    }
  }
  // Обработчик поиска по элементам списка
  searchActions(selectItem) {
    const originalSelect = this.getSelectElement(selectItem).originalSelect;
    const selectInput = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectInput,
    ).selectElement;
    const selectOptions = this.getSelectElement(
      selectItem,
      this.selectClasses.classSelectOptions,
    ).selectElement;
    const selectOptionsItems = selectOptions.querySelectorAll(
      `.${this.selectClasses.classSelectOption}`,
    );
    const _this = this;
    selectInput.addEventListener('input', function () {
      selectOptionsItems.forEach((selectOptionsItem) => {
        if (
          selectOptionsItem.textContent
            .toUpperCase()
            .indexOf(selectInput.value.toUpperCase()) >= 0
        ) {
          selectOptionsItem.hidden = false;
        } else {
          selectOptionsItem.hidden = true;
        }
      });
      // Если список закрыт открываем
      selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
    });
  }
  // Коллбэк функция
  selectCallback(selectItem, originalSelect) {
    document.dispatchEvent(
      new CustomEvent('selectCallback', {
        detail: {
          select: originalSelect,
        },
      }),
    );
  }
  // Логгинг в консоль
  setLogging(message) {
    this.config.logging ? FLS(`[select]: ${message}`) : null;
  }
}
// Запускаем и добавляем в объект модулей
// flsModules.select = new SelectConstructor({});
new SelectConstructor({});
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.noUiSlider = {})));
})(this, function (exports) {
  'use strict';

  exports.PipsMode = void 0;
  (function (PipsMode) {
    PipsMode['Range'] = 'range';
    PipsMode['Steps'] = 'steps';
    PipsMode['Positions'] = 'positions';
    PipsMode['Count'] = 'count';
    PipsMode['Values'] = 'values';
  })(exports.PipsMode || (exports.PipsMode = {}));
  exports.PipsType = void 0;
  (function (PipsType) {
    PipsType[(PipsType['None'] = -1)] = 'None';
    PipsType[(PipsType['NoValue'] = 0)] = 'NoValue';
    PipsType[(PipsType['LargeValue'] = 1)] = 'LargeValue';
    PipsType[(PipsType['SmallValue'] = 2)] = 'SmallValue';
  })(exports.PipsType || (exports.PipsType = {}));
  //region Helper Methods
  function isValidFormatter(entry) {
    return isValidPartialFormatter(entry) && typeof entry.from === 'function';
  }
  function isValidPartialFormatter(entry) {
    // partial formatters only need a to function and not a from function
    return typeof entry === 'object' && typeof entry.to === 'function';
  }
  function removeElement(el) {
    el.parentElement.removeChild(el);
  }
  function isSet(value) {
    return value !== null && value !== undefined;
  }
  // Bindable version
  function preventDefault(e) {
    e.preventDefault();
  }
  // Removes duplicates from an array.
  function unique(array) {
    return array.filter(function (a) {
      return !this[a] ? (this[a] = true) : false;
    }, {});
  }
  // Round a value to the closest 'to'.
  function closest(value, to) {
    return Math.round(value / to) * to;
  }
  // Current position of an element relative to the document.
  function offset(elem, orientation) {
    var rect = elem.getBoundingClientRect();
    var doc = elem.ownerDocument;
    var docElem = doc.documentElement;
    var pageOffset = getPageOffset(doc);
    // getBoundingClientRect contains left scroll in Chrome on Android.
    // I haven't found a feature detection that proves this. Worst case
    // scenario on mis-match: the 'tap' feature on horizontal sliders breaks.
    if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) {
      pageOffset.x = 0;
    }
    return orientation
      ? rect.top + pageOffset.y - docElem.clientTop
      : rect.left + pageOffset.x - docElem.clientLeft;
  }
  // Checks whether a value is numerical.
  function isNumeric(a) {
    return typeof a === 'number' && !isNaN(a) && isFinite(a);
  }
  // Sets a class and removes it after [duration] ms.
  function addClassFor(element, className, duration) {
    if (duration > 0) {
      addClass(element, className);
      setTimeout(function () {
        removeClass(element, className);
      }, duration);
    }
  }
  // Limits a value to 0 - 100
  function limit(a) {
    return Math.max(Math.min(a, 100), 0);
  }
  // Wraps a variable as an array, if it isn't one yet.
  // Note that an input array is returned by reference!
  function asArray(a) {
    return Array.isArray(a) ? a : [a];
  }
  // Counts decimals
  function countDecimals(numStr) {
    numStr = String(numStr);
    var pieces = numStr.split('.');
    return pieces.length > 1 ? pieces[1].length : 0;
  }
  // http://youmightnotneedjquery.com/#add_class
  function addClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
  }
  // http://youmightnotneedjquery.com/#remove_class
  function removeClass(el, className) {
    if (el.classList && !/\s/.test(className)) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  }
  // https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
  function hasClass(el, className) {
    return el.classList
      ? el.classList.contains(className)
      : new RegExp('\\b' + className + '\\b').test(el.className);
  }
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY#Notes
  function getPageOffset(doc) {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (doc.compatMode || '') === 'CSS1Compat';
    var x = supportPageOffset
      ? window.pageXOffset
      : isCSS1Compat
      ? doc.documentElement.scrollLeft
      : doc.body.scrollLeft;
    var y = supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? doc.documentElement.scrollTop
      : doc.body.scrollTop;
    return {
      x: x,
      y: y,
    };
  }
  // we provide a function to compute constants instead
  // of accessing window.* as soon as the module needs it
  // so that we do not compute anything if not needed
  function getActions() {
    // Determine the events to bind. IE11 implements pointerEvents without
    // a prefix, which breaks compatibility with the IE10 implementation.
    return window.navigator.pointerEnabled
      ? {
          start: 'pointerdown',
          move: 'pointermove',
          end: 'pointerup',
        }
      : window.navigator.msPointerEnabled
      ? {
          start: 'MSPointerDown',
          move: 'MSPointerMove',
          end: 'MSPointerUp',
        }
      : {
          start: 'mousedown touchstart',
          move: 'mousemove touchmove',
          end: 'mouseup touchend',
        };
  }
  // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
  // Issue #785
  function getSupportsPassive() {
    var supportsPassive = false;
    /* eslint-disable */
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function () {
          supportsPassive = true;
        },
      });
      // @ts-ignore
      window.addEventListener('test', null, opts);
    } catch (e) {}
    /* eslint-enable */
    return supportsPassive;
  }
  function getSupportsTouchActionNone() {
    return window.CSS && CSS.supports && CSS.supports('touch-action', 'none');
  }
  //endregion
  //region Range Calculation
  // Determine the size of a sub-range in relation to a full range.
  function subRangeRatio(pa, pb) {
    return 100 / (pb - pa);
  }
  // (percentage) How many percent is this value of this range?
  function fromPercentage(range, value, startRange) {
    return (value * 100) / (range[startRange + 1] - range[startRange]);
  }
  // (percentage) Where is this value on this range?
  function toPercentage(range, value) {
    return fromPercentage(
      range,
      range[0] < 0 ? value + Math.abs(range[0]) : value - range[0],
      0,
    );
  }
  // (value) How much is this percentage on this range?
  function isPercentage(range, value) {
    return (value * (range[1] - range[0])) / 100 + range[0];
  }
  function getJ(value, arr) {
    var j = 1;
    while (value >= arr[j]) {
      j += 1;
    }
    return j;
  }
  // (percentage) Input a value, find where, on a scale of 0-100, it applies.
  function toStepping(xVal, xPct, value) {
    if (value >= xVal.slice(-1)[0]) {
      return 100;
    }
    var j = getJ(value, xVal);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return pa + toPercentage([va, vb], value) / subRangeRatio(pa, pb);
  }
  // (value) Input a percentage, find where it is on the specified range.
  function fromStepping(xVal, xPct, value) {
    // There is no range group that fits 100
    if (value >= 100) {
      return xVal.slice(-1)[0];
    }
    var j = getJ(value, xPct);
    var va = xVal[j - 1];
    var vb = xVal[j];
    var pa = xPct[j - 1];
    var pb = xPct[j];
    return isPercentage([va, vb], (value - pa) * subRangeRatio(pa, pb));
  }
  // (percentage) Get the step that applies at a certain value.
  function getStep(xPct, xSteps, snap, value) {
    if (value === 100) {
      return value;
    }
    var j = getJ(value, xPct);
    var a = xPct[j - 1];
    var b = xPct[j];
    // If 'snap' is set, steps are used as fixed points on the slider.
    if (snap) {
      // Find the closest position, a or b.
      if (value - a > (b - a) / 2) {
        return b;
      }
      return a;
    }
    if (!xSteps[j - 1]) {
      return value;
    }
    return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
  }
  //endregion
  //region Spectrum
  var Spectrum = /** @class */ (function () {
    function Spectrum(entry, snap, singleStep) {
      this.xPct = [];
      this.xVal = [];
      this.xSteps = [];
      this.xNumSteps = [];
      this.xHighestCompleteStep = [];
      this.xSteps = [singleStep || false];
      this.xNumSteps = [false];
      this.snap = snap;
      var index;
      var ordered = [];
      // Map the object keys to an array.
      Object.keys(entry).forEach(function (index) {
        ordered.push([asArray(entry[index]), index]);
      });
      // Sort all entries by value (numeric sort).
      ordered.sort(function (a, b) {
        return a[0][0] - b[0][0];
      });
      // Convert all entries to subranges.
      for (index = 0; index < ordered.length; index++) {
        this.handleEntryPoint(ordered[index][1], ordered[index][0]);
      }
      // Store the actual step values.
      // xSteps is sorted in the same order as xPct and xVal.
      this.xNumSteps = this.xSteps.slice(0);
      // Convert all numeric steps to the percentage of the subrange they represent.
      for (index = 0; index < this.xNumSteps.length; index++) {
        this.handleStepPoint(index, this.xNumSteps[index]);
      }
    }
    Spectrum.prototype.getDistance = function (value) {
      var distances = [];
      for (var index = 0; index < this.xNumSteps.length - 1; index++) {
        distances[index] = fromPercentage(this.xVal, value, index);
      }
      return distances;
    };
    // Calculate the percentual distance over the whole scale of ranges.
    // direction: 0 = backwards / 1 = forwards
    Spectrum.prototype.getAbsoluteDistance = function (
      value,
      distances,
      direction,
    ) {
      var xPct_index = 0;
      // Calculate range where to start calculation
      if (value < this.xPct[this.xPct.length - 1]) {
        while (value > this.xPct[xPct_index + 1]) {
          xPct_index++;
        }
      } else if (value === this.xPct[this.xPct.length - 1]) {
        xPct_index = this.xPct.length - 2;
      }
      // If looking backwards and the value is exactly at a range separator then look one range further
      if (!direction && value === this.xPct[xPct_index + 1]) {
        xPct_index++;
      }
      if (distances === null) {
        distances = [];
      }
      var start_factor;
      var rest_factor = 1;
      var rest_rel_distance = distances[xPct_index];
      var range_pct = 0;
      var rel_range_distance = 0;
      var abs_distance_counter = 0;
      var range_counter = 0;
      // Calculate what part of the start range the value is
      if (direction) {
        start_factor =
          (value - this.xPct[xPct_index]) /
          (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
      } else {
        start_factor =
          (this.xPct[xPct_index + 1] - value) /
          (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
      }
      // Do until the complete distance across ranges is calculated
      while (rest_rel_distance > 0) {
        // Calculate the percentage of total range
        range_pct =
          this.xPct[xPct_index + 1 + range_counter] -
          this.xPct[xPct_index + range_counter];
        // Detect if the margin, padding or limit is larger then the current range and calculate
        if (
          distances[xPct_index + range_counter] * rest_factor +
            100 -
            start_factor * 100 >
          100
        ) {
          // If larger then take the percentual distance of the whole range
          rel_range_distance = range_pct * start_factor;
          // Rest factor of relative percentual distance still to be calculated
          rest_factor =
            (rest_rel_distance - 100 * start_factor) /
            distances[xPct_index + range_counter];
          // Set start factor to 1 as for next range it does not apply.
          start_factor = 1;
        } else {
          // If smaller or equal then take the percentual distance of the calculate percentual part of that range
          rel_range_distance =
            ((distances[xPct_index + range_counter] * range_pct) / 100) *
            rest_factor;
          // No rest left as the rest fits in current range
          rest_factor = 0;
        }
        if (direction) {
          abs_distance_counter = abs_distance_counter - rel_range_distance;
          // Limit range to first range when distance becomes outside of minimum range
          if (this.xPct.length + range_counter >= 1) {
            range_counter--;
          }
        } else {
          abs_distance_counter = abs_distance_counter + rel_range_distance;
          // Limit range to last range when distance becomes outside of maximum range
          if (this.xPct.length - range_counter >= 1) {
            range_counter++;
          }
        }
        // Rest of relative percentual distance still to be calculated
        rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
      }
      return value + abs_distance_counter;
    };
    Spectrum.prototype.toStepping = function (value) {
      value = toStepping(this.xVal, this.xPct, value);
      return value;
    };
    Spectrum.prototype.fromStepping = function (value) {
      return fromStepping(this.xVal, this.xPct, value);
    };
    Spectrum.prototype.getStep = function (value) {
      value = getStep(this.xPct, this.xSteps, this.snap, value);
      return value;
    };
    Spectrum.prototype.getDefaultStep = function (value, isDown, size) {
      var j = getJ(value, this.xPct);
      // When at the top or stepping down, look at the previous sub-range
      if (value === 100 || (isDown && value === this.xPct[j - 1])) {
        j = Math.max(j - 1, 1);
      }
      return (this.xVal[j] - this.xVal[j - 1]) / size;
    };
    Spectrum.prototype.getNearbySteps = function (value) {
      var j = getJ(value, this.xPct);
      return {
        stepBefore: {
          startValue: this.xVal[j - 2],
          step: this.xNumSteps[j - 2],
          highestStep: this.xHighestCompleteStep[j - 2],
        },
        thisStep: {
          startValue: this.xVal[j - 1],
          step: this.xNumSteps[j - 1],
          highestStep: this.xHighestCompleteStep[j - 1],
        },
        stepAfter: {
          startValue: this.xVal[j],
          step: this.xNumSteps[j],
          highestStep: this.xHighestCompleteStep[j],
        },
      };
    };
    Spectrum.prototype.countStepDecimals = function () {
      var stepDecimals = this.xNumSteps.map(countDecimals);
      return Math.max.apply(null, stepDecimals);
    };
    Spectrum.prototype.hasNoSize = function () {
      return this.xVal[0] === this.xVal[this.xVal.length - 1];
    };
    // Outside testing
    Spectrum.prototype.convert = function (value) {
      return this.getStep(this.toStepping(value));
    };
    Spectrum.prototype.handleEntryPoint = function (index, value) {
      var percentage;
      // Covert min/max syntax to 0 and 100.
      if (index === 'min') {
        percentage = 0;
      } else if (index === 'max') {
        percentage = 100;
      } else {
        percentage = parseFloat(index);
      }
      // Check for correct input.
      if (!isNumeric(percentage) || !isNumeric(value[0])) {
        throw new Error("noUiSlider: 'range' value isn't numeric.");
      }
      // Store values.
      this.xPct.push(percentage);
      this.xVal.push(value[0]);
      var value1 = Number(value[1]);
      // NaN will evaluate to false too, but to keep
      // logging clear, set step explicitly. Make sure
      // not to override the 'step' setting with false.
      if (!percentage) {
        if (!isNaN(value1)) {
          this.xSteps[0] = value1;
        }
      } else {
        this.xSteps.push(isNaN(value1) ? false : value1);
      }
      this.xHighestCompleteStep.push(0);
    };
    Spectrum.prototype.handleStepPoint = function (i, n) {
      // Ignore 'false' stepping.
      if (!n) {
        return;
      }
      // Step over zero-length ranges (#948);
      if (this.xVal[i] === this.xVal[i + 1]) {
        this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
        return;
      }
      // Factor to range ratio
      this.xSteps[i] =
        fromPercentage([this.xVal[i], this.xVal[i + 1]], n, 0) /
        subRangeRatio(this.xPct[i], this.xPct[i + 1]);
      var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
      var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
      var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
      this.xHighestCompleteStep[i] = step;
    };
    return Spectrum;
  })();
  //endregion
  //region Options
  /*	Every input option is tested and parsed. This will prevent
      endless validation in internal methods. These tests are
      structured with an item for every option available. An
      option can be marked as required by setting the 'r' flag.
      The testing function is provided with three arguments:
          - The provided value for the option;
          - A reference to the options object;
          - The name for the option;

      The testing function returns false when an error is detected,
      or true when everything is OK. It can also modify the option
      object, to make sure all values can be correctly looped elsewhere. */
  //region Defaults
  var defaultFormatter = {
    to: function (value) {
      return value === undefined ? '' : value.toFixed(2);
    },
    from: Number,
  };
  var cssClasses = {
    target: 'target',
    base: 'base',
    origin: 'origin',
    handle: 'handle',
    handleLower: 'handle-lower',
    handleUpper: 'handle-upper',
    touchArea: 'touch-area',
    horizontal: 'horizontal',
    vertical: 'vertical',
    background: 'background',
    connect: 'connect',
    connects: 'connects',
    ltr: 'ltr',
    rtl: 'rtl',
    textDirectionLtr: 'txt-dir-ltr',
    textDirectionRtl: 'txt-dir-rtl',
    draggable: 'draggable',
    drag: 'state-drag',
    tap: 'state-tap',
    active: 'active',
    tooltip: 'tooltip',
    pips: 'pips',
    pipsHorizontal: 'pips-horizontal',
    pipsVertical: 'pips-vertical',
    marker: 'marker',
    markerHorizontal: 'marker-horizontal',
    markerVertical: 'marker-vertical',
    markerNormal: 'marker-normal',
    markerLarge: 'marker-large',
    markerSub: 'marker-sub',
    value: 'value',
    valueHorizontal: 'value-horizontal',
    valueVertical: 'value-vertical',
    valueNormal: 'value-normal',
    valueLarge: 'value-large',
    valueSub: 'value-sub',
  };
  // Namespaces of internal event listeners
  var INTERNAL_EVENT_NS = {
    tooltips: '.__tooltips',
    aria: '.__aria',
  };
  //endregion
  function testStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'step' is not numeric.");
    }
    // The step option can still be used to set stepping
    // for linear sliders. Overwritten if set in 'range'.
    parsed.singleStep = entry;
  }
  function testKeyboardPageMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    }
    parsed.keyboardPageMultiplier = entry;
  }
  function testKeyboardMultiplier(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    }
    parsed.keyboardMultiplier = entry;
  }
  function testKeyboardDefaultStep(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    }
    parsed.keyboardDefaultStep = entry;
  }
  function testRange(parsed, entry) {
    // Filter incorrect input.
    if (typeof entry !== 'object' || Array.isArray(entry)) {
      throw new Error("noUiSlider: 'range' is not an object.");
    }
    // Catch missing start or end.
    if (entry.min === undefined || entry.max === undefined) {
      throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    }
    parsed.spectrum = new Spectrum(
      entry,
      parsed.snap || false,
      parsed.singleStep,
    );
  }
  function testStart(parsed, entry) {
    entry = asArray(entry);
    // Validate input. Values aren't tested, as the public .val method
    // will always provide a valid location.
    if (!Array.isArray(entry) || !entry.length) {
      throw new Error("noUiSlider: 'start' option is incorrect.");
    }
    // Store the number of handles.
    parsed.handles = entry.length;
    // When the slider is initialized, the .val method will
    // be called with the start options.
    parsed.start = entry;
  }
  function testSnap(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'snap' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.snap = entry;
  }
  function testAnimate(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error("noUiSlider: 'animate' option must be a boolean.");
    }
    // Enforce 100% stepping within subranges.
    parsed.animate = entry;
  }
  function testAnimationDuration(parsed, entry) {
    if (typeof entry !== 'number') {
      throw new Error(
        "noUiSlider: 'animationDuration' option must be a number.",
      );
    }
    parsed.animationDuration = entry;
  }
  function testConnect(parsed, entry) {
    var connect = [false];
    var i;
    // Map legacy options
    if (entry === 'lower') {
      entry = [true, false];
    } else if (entry === 'upper') {
      entry = [false, true];
    }
    // Handle boolean options
    if (entry === true || entry === false) {
      for (i = 1; i < parsed.handles; i++) {
        connect.push(entry);
      }
      connect.push(false);
    }
    // Reject invalid input
    else if (
      !Array.isArray(entry) ||
      !entry.length ||
      entry.length !== parsed.handles + 1
    ) {
      throw new Error(
        "noUiSlider: 'connect' option doesn't match handle count.",
      );
    } else {
      connect = entry;
    }
    parsed.connect = connect;
  }
  function testOrientation(parsed, entry) {
    // Set orientation to an a numerical value for easy
    // array selection.
    switch (entry) {
      case 'horizontal':
        parsed.ort = 0;
        break;
      case 'vertical':
        parsed.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }
  function testMargin(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'margin' option must be numeric.");
    }
    // Issue #582
    if (entry === 0) {
      return;
    }
    parsed.margin = parsed.spectrum.getDistance(entry);
  }
  function testLimit(parsed, entry) {
    if (!isNumeric(entry)) {
      throw new Error("noUiSlider: 'limit' option must be numeric.");
    }
    parsed.limit = parsed.spectrum.getDistance(entry);
    if (!parsed.limit || parsed.handles < 2) {
      throw new Error(
        "noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.",
      );
    }
  }
  function testPadding(parsed, entry) {
    var index;
    if (!isNumeric(entry) && !Array.isArray(entry)) {
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
      );
    }
    if (
      Array.isArray(entry) &&
      !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))
    ) {
      throw new Error(
        "noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.",
      );
    }
    if (entry === 0) {
      return;
    }
    if (!Array.isArray(entry)) {
      entry = [entry, entry];
    }
    // 'getDistance' returns false for invalid values.
    parsed.padding = [
      parsed.spectrum.getDistance(entry[0]),
      parsed.spectrum.getDistance(entry[1]),
    ];
    for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) {
      // last "range" can't contain step size as it is purely an endpoint.
      if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) {
        throw new Error(
          "noUiSlider: 'padding' option must be a positive number(s).",
        );
      }
    }
    var totalPadding = entry[0] + entry[1];
    var firstValue = parsed.spectrum.xVal[0];
    var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
    if (totalPadding / (lastValue - firstValue) > 1) {
      throw new Error(
        "noUiSlider: 'padding' option must not exceed 100% of the range.",
      );
    }
  }
  function testDirection(parsed, entry) {
    // Set direction as a numerical value for easy parsing.
    // Invert connection for RTL sliders, so that the proper
    // handles get the connect/background classes.
    switch (entry) {
      case 'ltr':
        parsed.dir = 0;
        break;
      case 'rtl':
        parsed.dir = 1;
        break;
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
  }
  function testBehaviour(parsed, entry) {
    // Make sure the input is a string.
    if (typeof entry !== 'string') {
      throw new Error(
        "noUiSlider: 'behaviour' must be a string containing options.",
      );
    }
    // Check if the string contains any keywords.
    // None are required.
    var tap = entry.indexOf('tap') >= 0;
    var drag = entry.indexOf('drag') >= 0;
    var fixed = entry.indexOf('fixed') >= 0;
    var snap = entry.indexOf('snap') >= 0;
    var hover = entry.indexOf('hover') >= 0;
    var unconstrained = entry.indexOf('unconstrained') >= 0;
    var dragAll = entry.indexOf('drag-all') >= 0;
    var smoothSteps = entry.indexOf('smooth-steps') >= 0;
    if (fixed) {
      if (parsed.handles !== 2) {
        throw new Error(
          "noUiSlider: 'fixed' behaviour must be used with 2 handles",
        );
      }
      // Use margin to enforce fixed state
      testMargin(parsed, parsed.start[1] - parsed.start[0]);
    }
    if (unconstrained && (parsed.margin || parsed.limit)) {
      throw new Error(
        "noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit",
      );
    }
    parsed.events = {
      tap: tap || snap,
      drag: drag,
      dragAll: dragAll,
      smoothSteps: smoothSteps,
      fixed: fixed,
      snap: snap,
      hover: hover,
      unconstrained: unconstrained,
    };
  }
  function testTooltips(parsed, entry) {
    if (entry === false) {
      return;
    }
    if (entry === true || isValidPartialFormatter(entry)) {
      parsed.tooltips = [];
      for (var i = 0; i < parsed.handles; i++) {
        parsed.tooltips.push(entry);
      }
    } else {
      entry = asArray(entry);
      if (entry.length !== parsed.handles) {
        throw new Error('noUiSlider: must pass a formatter for all handles.');
      }
      entry.forEach(function (formatter) {
        if (
          typeof formatter !== 'boolean' &&
          !isValidPartialFormatter(formatter)
        ) {
          throw new Error(
            "noUiSlider: 'tooltips' must be passed a formatter or 'false'.",
          );
        }
      });
      parsed.tooltips = entry;
    }
  }
  function testHandleAttributes(parsed, entry) {
    if (entry.length !== parsed.handles) {
      throw new Error('noUiSlider: must pass a attributes for all handles.');
    }
    parsed.handleAttributes = entry;
  }
  function testAriaFormat(parsed, entry) {
    if (!isValidPartialFormatter(entry)) {
      throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    }
    parsed.ariaFormat = entry;
  }
  function testFormat(parsed, entry) {
    if (!isValidFormatter(entry)) {
      throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    }
    parsed.format = entry;
  }
  function testKeyboardSupport(parsed, entry) {
    if (typeof entry !== 'boolean') {
      throw new Error(
        "noUiSlider: 'keyboardSupport' option must be a boolean.",
      );
    }
    parsed.keyboardSupport = entry;
  }
  function testDocumentElement(parsed, entry) {
    // This is an advanced option. Passed values are used without validation.
    parsed.documentElement = entry;
  }
  function testCssPrefix(parsed, entry) {
    if (typeof entry !== 'string' && entry !== false) {
      throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    }
    parsed.cssPrefix = entry;
  }
  function testCssClasses(parsed, entry) {
    if (typeof entry !== 'object') {
      throw new Error("noUiSlider: 'cssClasses' must be an object.");
    }
    if (typeof parsed.cssPrefix === 'string') {
      parsed.cssClasses = {};
      Object.keys(entry).forEach(function (key) {
        parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
      });
    } else {
      parsed.cssClasses = entry;
    }
  }
  // Test all developer settings and parse to assumption-safe values.
  function testOptions(options) {
    // To prove a fix for #537, freeze options here.
    // If the object is modified, an error will be thrown.
    // Object.freeze(options);
    var parsed = {
      margin: null,
      limit: null,
      padding: null,
      animate: true,
      animationDuration: 300,
      ariaFormat: defaultFormatter,
      format: defaultFormatter,
    };
    // Tests are executed in the order they are presented here.
    var tests = {
      step: { r: false, t: testStep },
      keyboardPageMultiplier: { r: false, t: testKeyboardPageMultiplier },
      keyboardMultiplier: { r: false, t: testKeyboardMultiplier },
      keyboardDefaultStep: { r: false, t: testKeyboardDefaultStep },
      start: { r: true, t: testStart },
      connect: { r: true, t: testConnect },
      direction: { r: true, t: testDirection },
      snap: { r: false, t: testSnap },
      animate: { r: false, t: testAnimate },
      animationDuration: { r: false, t: testAnimationDuration },
      range: { r: true, t: testRange },
      orientation: { r: false, t: testOrientation },
      margin: { r: false, t: testMargin },
      limit: { r: false, t: testLimit },
      padding: { r: false, t: testPadding },
      behaviour: { r: true, t: testBehaviour },
      ariaFormat: { r: false, t: testAriaFormat },
      format: { r: false, t: testFormat },
      tooltips: { r: false, t: testTooltips },
      keyboardSupport: { r: true, t: testKeyboardSupport },
      documentElement: { r: false, t: testDocumentElement },
      cssPrefix: { r: true, t: testCssPrefix },
      cssClasses: { r: true, t: testCssClasses },
      handleAttributes: { r: false, t: testHandleAttributes },
    };
    var defaults = {
      connect: false,
      direction: 'ltr',
      behaviour: 'tap',
      orientation: 'horizontal',
      keyboardSupport: true,
      cssPrefix: 'noUi-',
      cssClasses: cssClasses,
      keyboardPageMultiplier: 5,
      keyboardMultiplier: 1,
      keyboardDefaultStep: 10,
    };
    // AriaFormat defaults to regular format, if any.
    if (options.format && !options.ariaFormat) {
      options.ariaFormat = options.format;
    }
    // Run all options through a testing mechanism to ensure correct
    // input. It should be noted that options might get modified to
    // be handled properly. E.g. wrapping integers in arrays.
    Object.keys(tests).forEach(function (name) {
      // If the option isn't set, but it is required, throw an error.
      if (!isSet(options[name]) && defaults[name] === undefined) {
        if (tests[name].r) {
          throw new Error("noUiSlider: '" + name + "' is required.");
        }
        return;
      }
      tests[name].t(
        parsed,
        !isSet(options[name]) ? defaults[name] : options[name],
      );
    });
    // Forward pips options
    parsed.pips = options.pips;
    // All recent browsers accept unprefixed transform.
    // We need -ms- for IE9 and -webkit- for older Android;
    // Assume use of -webkit- if unprefixed and -ms- are not supported.
    // https://caniuse.com/#feat=transforms2d
    var d = document.createElement('div');
    var msPrefix = d.style.msTransform !== undefined;
    var noPrefix = d.style.transform !== undefined;
    parsed.transformRule = noPrefix
      ? 'transform'
      : msPrefix
      ? 'msTransform'
      : 'webkitTransform';
    // Pips don't move, so we can place them using left/top.
    var styles = [
      ['left', 'top'],
      ['right', 'bottom'],
    ];
    parsed.style = styles[parsed.dir][parsed.ort];
    return parsed;
  }
  //endregion
  function scope(target, options, originalOptions) {
    var actions = getActions();
    var supportsTouchActionNone = getSupportsTouchActionNone();
    var supportsPassive = supportsTouchActionNone && getSupportsPassive();
    // All variables local to 'scope' are prefixed with 'scope_'
    // Slider DOM Nodes
    var scope_Target = target;
    var scope_Base;
    var scope_Handles;
    var scope_Connects;
    var scope_Pips;
    var scope_Tooltips;
    // Slider state values
    var scope_Spectrum = options.spectrum;
    var scope_Values = [];
    var scope_Locations = [];
    var scope_HandleNumbers = [];
    var scope_ActiveHandlesCount = 0;
    var scope_Events = {};
    // Document Nodes
    var scope_Document = target.ownerDocument;
    var scope_DocumentElement =
      options.documentElement || scope_Document.documentElement;
    var scope_Body = scope_Document.body;
    // For horizontal sliders in standard ltr documents,
    // make .noUi-origin overflow to the left so the document doesn't scroll.
    var scope_DirOffset =
      scope_Document.dir === 'rtl' || options.ort === 1 ? 0 : 100;
    // Creates a node, adds it to target, returns the new node.
    function addNodeTo(addTarget, className) {
      var div = scope_Document.createElement('div');
      if (className) {
        addClass(div, className);
      }
      addTarget.appendChild(div);
      return div;
    }
    // Append a origin to the base
    function addOrigin(base, handleNumber) {
      var origin = addNodeTo(base, options.cssClasses.origin);
      var handle = addNodeTo(origin, options.cssClasses.handle);
      addNodeTo(handle, options.cssClasses.touchArea);
      handle.setAttribute('data-handle', String(handleNumber));
      if (options.keyboardSupport) {
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
        // 0 = focusable and reachable
        handle.setAttribute('tabindex', '0');
        handle.addEventListener('keydown', function (event) {
          return eventKeydown(event, handleNumber);
        });
      }
      if (options.handleAttributes !== undefined) {
        var attributes_1 = options.handleAttributes[handleNumber];
        Object.keys(attributes_1).forEach(function (attribute) {
          handle.setAttribute(attribute, attributes_1[attribute]);
        });
      }
      handle.setAttribute('role', 'slider');
      handle.setAttribute(
        'aria-orientation',
        options.ort ? 'vertical' : 'horizontal',
      );
      if (handleNumber === 0) {
        addClass(handle, options.cssClasses.handleLower);
      } else if (handleNumber === options.handles - 1) {
        addClass(handle, options.cssClasses.handleUpper);
      }
      return origin;
    }
    // Insert nodes for connect elements
    function addConnect(base, add) {
      if (!add) {
        return false;
      }
      return addNodeTo(base, options.cssClasses.connect);
    }
    // Add handles to the slider base.
    function addElements(connectOptions, base) {
      var connectBase = addNodeTo(base, options.cssClasses.connects);
      scope_Handles = [];
      scope_Connects = [];
      scope_Connects.push(addConnect(connectBase, connectOptions[0]));
      // [::::O====O====O====]
      // connectOptions = [0, 1, 1, 1]
      for (var i = 0; i < options.handles; i++) {
        // Keep a list of all added handles.
        scope_Handles.push(addOrigin(base, i));
        scope_HandleNumbers[i] = i;
        scope_Connects.push(addConnect(connectBase, connectOptions[i + 1]));
      }
    }
    // Initialize a single slider.
    function addSlider(addTarget) {
      // Apply classes and data to the target.
      addClass(addTarget, options.cssClasses.target);
      if (options.dir === 0) {
        addClass(addTarget, options.cssClasses.ltr);
      } else {
        addClass(addTarget, options.cssClasses.rtl);
      }
      if (options.ort === 0) {
        addClass(addTarget, options.cssClasses.horizontal);
      } else {
        addClass(addTarget, options.cssClasses.vertical);
      }
      var textDirection = getComputedStyle(addTarget).direction;
      if (textDirection === 'rtl') {
        addClass(addTarget, options.cssClasses.textDirectionRtl);
      } else {
        addClass(addTarget, options.cssClasses.textDirectionLtr);
      }
      return addNodeTo(addTarget, options.cssClasses.base);
    }
    function addTooltip(handle, handleNumber) {
      if (!options.tooltips || !options.tooltips[handleNumber]) {
        return false;
      }
      return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
    }
    function isSliderDisabled() {
      return scope_Target.hasAttribute('disabled');
    }
    // Disable the slider dragging if any handle is disabled
    function isHandleDisabled(handleNumber) {
      var handleOrigin = scope_Handles[handleNumber];
      return handleOrigin.hasAttribute('disabled');
    }
    function removeTooltips() {
      if (scope_Tooltips) {
        removeEvent('update' + INTERNAL_EVENT_NS.tooltips);
        scope_Tooltips.forEach(function (tooltip) {
          if (tooltip) {
            removeElement(tooltip);
          }
        });
        scope_Tooltips = null;
      }
    }
    // The tooltips option is a shorthand for using the 'update' event.
    function tooltips() {
      removeTooltips();
      // Tooltips are added with options.tooltips in original order.
      scope_Tooltips = scope_Handles.map(addTooltip);
      bindEvent(
        'update' + INTERNAL_EVENT_NS.tooltips,
        function (values, handleNumber, unencoded) {
          if (!scope_Tooltips || !options.tooltips) {
            return;
          }
          if (scope_Tooltips[handleNumber] === false) {
            return;
          }
          var formattedValue = values[handleNumber];
          if (options.tooltips[handleNumber] !== true) {
            formattedValue = options.tooltips[handleNumber].to(
              unencoded[handleNumber],
            );
          }
          scope_Tooltips[handleNumber].innerHTML = formattedValue;
        },
      );
    }
    function aria() {
      removeEvent('update' + INTERNAL_EVENT_NS.aria);
      bindEvent(
        'update' + INTERNAL_EVENT_NS.aria,
        function (values, handleNumber, unencoded, tap, positions) {
          // Update Aria Values for all handles, as a change in one changes min and max values for the next.
          scope_HandleNumbers.forEach(function (index) {
            var handle = scope_Handles[index];
            var min = checkHandlePosition(
              scope_Locations,
              index,
              0,
              true,
              true,
              true,
            );
            var max = checkHandlePosition(
              scope_Locations,
              index,
              100,
              true,
              true,
              true,
            );
            var now = positions[index];
            // Formatted value for display
            var text = String(options.ariaFormat.to(unencoded[index]));
            // Map to slider range values
            min = scope_Spectrum.fromStepping(min).toFixed(1);
            max = scope_Spectrum.fromStepping(max).toFixed(1);
            now = scope_Spectrum.fromStepping(now).toFixed(1);
            handle.children[0].setAttribute('aria-valuemin', min);
            handle.children[0].setAttribute('aria-valuemax', max);
            handle.children[0].setAttribute('aria-valuenow', now);
            handle.children[0].setAttribute('aria-valuetext', text);
          });
        },
      );
    }
    function getGroup(pips) {
      // Use the range.
      if (
        pips.mode === exports.PipsMode.Range ||
        pips.mode === exports.PipsMode.Steps
      ) {
        return scope_Spectrum.xVal;
      }
      if (pips.mode === exports.PipsMode.Count) {
        if (pips.values < 2) {
          throw new Error(
            "noUiSlider: 'values' (>= 2) required for mode 'count'.",
          );
        }
        // Divide 0 - 100 in 'count' parts.
        var interval = pips.values - 1;
        var spread = 100 / interval;
        var values = [];
        // List these parts and have them handled as 'positions'.
        while (interval--) {
          values[interval] = interval * spread;
        }
        values.push(100);
        return mapToRange(values, pips.stepped);
      }
      if (pips.mode === exports.PipsMode.Positions) {
        // Map all percentages to on-range values.
        return mapToRange(pips.values, pips.stepped);
      }
      if (pips.mode === exports.PipsMode.Values) {
        // If the value must be stepped, it needs to be converted to a percentage first.
        if (pips.stepped) {
          return pips.values.map(function (value) {
            // Convert to percentage, apply step, return to value.
            return scope_Spectrum.fromStepping(
              scope_Spectrum.getStep(scope_Spectrum.toStepping(value)),
            );
          });
        }
        // Otherwise, we can simply use the values.
        return pips.values;
      }
      return []; // pips.mode = never
    }
    function mapToRange(values, stepped) {
      return values.map(function (value) {
        return scope_Spectrum.fromStepping(
          stepped ? scope_Spectrum.getStep(value) : value,
        );
      });
    }
    function generateSpread(pips) {
      function safeIncrement(value, increment) {
        // Avoid floating point variance by dropping the smallest decimal places.
        return Number((value + increment).toFixed(7));
      }
      var group = getGroup(pips);
      var indexes = {};
      var firstInRange = scope_Spectrum.xVal[0];
      var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
      var ignoreFirst = false;
      var ignoreLast = false;
      var prevPct = 0;
      // Create a copy of the group, sort it and filter away all duplicates.
      group = unique(
        group.slice().sort(function (a, b) {
          return a - b;
        }),
      );
      // Make sure the range starts with the first element.
      if (group[0] !== firstInRange) {
        group.unshift(firstInRange);
        ignoreFirst = true;
      }
      // Likewise for the last one.
      if (group[group.length - 1] !== lastInRange) {
        group.push(lastInRange);
        ignoreLast = true;
      }
      group.forEach(function (current, index) {
        // Get the current step and the lower + upper positions.
        var step;
        var i;
        var q;
        var low = current;
        var high = group[index + 1];
        var newPct;
        var pctDifference;
        var pctPos;
        var type;
        var steps;
        var realSteps;
        var stepSize;
        var isSteps = pips.mode === exports.PipsMode.Steps;
        // When using 'steps' mode, use the provided steps.
        // Otherwise, we'll step on to the next subrange.
        if (isSteps) {
          step = scope_Spectrum.xNumSteps[index];
        }
        // Default to a 'full' step.
        if (!step) {
          step = high - low;
        }
        // If high is undefined we are at the last subrange. Make sure it iterates once (#1088)
        if (high === undefined) {
          high = low;
        }
        // Make sure step isn't 0, which would cause an infinite loop (#654)
        step = Math.max(step, 0.0000001);
        // Find all steps in the subrange.
        for (i = low; i <= high; i = safeIncrement(i, step)) {
          // Get the percentage value for the current step,
          // calculate the size for the subrange.
          newPct = scope_Spectrum.toStepping(i);
          pctDifference = newPct - prevPct;
          steps = pctDifference / (pips.density || 1);
          realSteps = Math.round(steps);
          // This ratio represents the amount of percentage-space a point indicates.
          // For a density 1 the points/percentage = 1. For density 2, that percentage needs to be re-divided.
          // Round the percentage offset to an even number, then divide by two
          // to spread the offset on both sides of the range.
          stepSize = pctDifference / realSteps;
          // Divide all points evenly, adding the correct number to this subrange.
          // Run up to <= so that 100% gets a point, event if ignoreLast is set.
          for (q = 1; q <= realSteps; q += 1) {
            // The ratio between the rounded value and the actual size might be ~1% off.
            // Correct the percentage offset by the number of points
            // per subrange. density = 1 will result in 100 points on the
            // full range, 2 for 50, 4 for 25, etc.
            pctPos = prevPct + q * stepSize;
            indexes[pctPos.toFixed(5)] = [
              scope_Spectrum.fromStepping(pctPos),
              0,
            ];
          }
          // Determine the point type.
          type =
            group.indexOf(i) > -1
              ? exports.PipsType.LargeValue
              : isSteps
              ? exports.PipsType.SmallValue
              : exports.PipsType.NoValue;
          // Enforce the 'ignoreFirst' option by overwriting the type for 0.
          if (!index && ignoreFirst && i !== high) {
            type = 0;
          }
          if (!(i === high && ignoreLast)) {
            // Mark the 'type' of this point. 0 = plain, 1 = real value, 2 = step value.
            indexes[newPct.toFixed(5)] = [i, type];
          }
          // Update the percentage count.
          prevPct = newPct;
        }
      });
      return indexes;
    }
    function addMarking(spread, filterFunc, formatter) {
      var _a, _b;
      var element = scope_Document.createElement('div');
      var valueSizeClasses =
        ((_a = {}),
        (_a[exports.PipsType.None] = ''),
        (_a[exports.PipsType.NoValue] = options.cssClasses.valueNormal),
        (_a[exports.PipsType.LargeValue] = options.cssClasses.valueLarge),
        (_a[exports.PipsType.SmallValue] = options.cssClasses.valueSub),
        _a);
      var markerSizeClasses =
        ((_b = {}),
        (_b[exports.PipsType.None] = ''),
        (_b[exports.PipsType.NoValue] = options.cssClasses.markerNormal),
        (_b[exports.PipsType.LargeValue] = options.cssClasses.markerLarge),
        (_b[exports.PipsType.SmallValue] = options.cssClasses.markerSub),
        _b);
      var valueOrientationClasses = [
        options.cssClasses.valueHorizontal,
        options.cssClasses.valueVertical,
      ];
      var markerOrientationClasses = [
        options.cssClasses.markerHorizontal,
        options.cssClasses.markerVertical,
      ];
      addClass(element, options.cssClasses.pips);
      addClass(
        element,
        options.ort === 0
          ? options.cssClasses.pipsHorizontal
          : options.cssClasses.pipsVertical,
      );
      function getClasses(type, source) {
        var a = source === options.cssClasses.value;
        var orientationClasses = a
          ? valueOrientationClasses
          : markerOrientationClasses;
        var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
        return (
          source +
          ' ' +
          orientationClasses[options.ort] +
          ' ' +
          sizeClasses[type]
        );
      }
      function addSpread(offset, value, type) {
        // Apply the filter function, if it is set.
        type = filterFunc ? filterFunc(value, type) : type;
        if (type === exports.PipsType.None) {
          return;
        }
        // Add a marker for every point
        var node = addNodeTo(element, false);
        node.className = getClasses(type, options.cssClasses.marker);
        node.style[options.style] = offset + '%';
        // Values are only appended for points marked '1' or '2'.
        if (type > exports.PipsType.NoValue) {
          node = addNodeTo(element, false);
          node.className = getClasses(type, options.cssClasses.value);
          node.setAttribute('data-value', String(value));
          node.style[options.style] = offset + '%';
          node.innerHTML = String(formatter.to(value));
        }
      }
      // Append all points.
      Object.keys(spread).forEach(function (offset) {
        addSpread(offset, spread[offset][0], spread[offset][1]);
      });
      return element;
    }
    function removePips() {
      if (scope_Pips) {
        removeElement(scope_Pips);
        scope_Pips = null;
      }
    }
    function pips(pips) {
      // Fix #669
      removePips();
      var spread = generateSpread(pips);
      var filter = pips.filter;
      var format = pips.format || {
        to: function (value) {
          return String(Math.round(value));
        },
      };
      scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
      return scope_Pips;
    }
    // Shorthand for base dimensions.
    function baseSize() {
      var rect = scope_Base.getBoundingClientRect();
      var alt = 'offset' + ['Width', 'Height'][options.ort];
      return options.ort === 0
        ? rect.width || scope_Base[alt]
        : rect.height || scope_Base[alt];
    }
    // Handler for attaching events trough a proxy.
    function attachEvent(events, element, callback, data) {
      // This function can be used to 'filter' events to the slider.
      // element is a node, not a nodeList
      var method = function (event) {
        var e = fixEvent(event, data.pageOffset, data.target || element);
        // fixEvent returns false if this event has a different target
        // when handling (multi-) touch events;
        if (!e) {
          return false;
        }
        // doNotReject is passed by all end events to make sure released touches
        // are not rejected, leaving the slider "stuck" to the cursor;
        if (isSliderDisabled() && !data.doNotReject) {
          return false;
        }
        // Stop if an active 'tap' transition is taking place.
        if (
          hasClass(scope_Target, options.cssClasses.tap) &&
          !data.doNotReject
        ) {
          return false;
        }
        // Ignore right or middle clicks on start #454
        if (
          events === actions.start &&
          e.buttons !== undefined &&
          e.buttons > 1
        ) {
          return false;
        }
        // Ignore right or middle clicks on start #454
        if (data.hover && e.buttons) {
          return false;
        }
        // 'supportsPassive' is only true if a browser also supports touch-action: none in CSS.
        // iOS safari does not, so it doesn't get to benefit from passive scrolling. iOS does support
        // touch-action: manipulation, but that allows panning, which breaks
        // sliders after zooming/on non-responsive pages.
        // See: https://bugs.webkit.org/show_bug.cgi?id=133112
        if (!supportsPassive) {
          e.preventDefault();
        }
        e.calcPoint = e.points[options.ort];
        // Call the event handler with the event [ and additional data ].
        callback(e, data);
        return;
      };
      var methods = [];
      // Bind a closure on the target for every event type.
      events.split(' ').forEach(function (eventName) {
        element.addEventListener(
          eventName,
          method,
          supportsPassive ? { passive: true } : false,
        );
        methods.push([eventName, method]);
      });
      return methods;
    }
    // Provide a clean event with standardized offset values.
    function fixEvent(e, pageOffset, eventTarget) {
      // Filter the event to register the type, which can be
      // touch, mouse or pointer. Offset changes need to be
      // made on an event specific basis.
      var touch = e.type.indexOf('touch') === 0;
      var mouse = e.type.indexOf('mouse') === 0;
      var pointer = e.type.indexOf('pointer') === 0;
      var x = 0;
      var y = 0;
      // IE10 implemented pointer events with a prefix;
      if (e.type.indexOf('MSPointer') === 0) {
        pointer = true;
      }
      // Erroneous events seem to be passed in occasionally on iOS/iPadOS after user finishes interacting with
      // the slider. They appear to be of type MouseEvent, yet they don't have usual properties set. Ignore
      // events that have no touches or buttons associated with them. (#1057, #1079, #1095)
      if (e.type === 'mousedown' && !e.buttons && !e.touches) {
        return false;
      }
      // The only thing one handle should be concerned about is the touches that originated on top of it.
      if (touch) {
        // Returns true if a touch originated on the target.
        var isTouchOnTarget = function (checkTouch) {
          var target = checkTouch.target;
          return (
            target === eventTarget ||
            eventTarget.contains(target) ||
            (e.composed && e.composedPath().shift() === eventTarget)
          );
        };
        // In the case of touchstart events, we need to make sure there is still no more than one
        // touch on the target so we look amongst all touches.
        if (e.type === 'touchstart') {
          var targetTouches = Array.prototype.filter.call(
            e.touches,
            isTouchOnTarget,
          );
          // Do not support more than one touch per handle.
          if (targetTouches.length > 1) {
            return false;
          }
          x = targetTouches[0].pageX;
          y = targetTouches[0].pageY;
        } else {
          // In the other cases, find on changedTouches is enough.
          var targetTouch = Array.prototype.find.call(
            e.changedTouches,
            isTouchOnTarget,
          );
          // Cancel if the target touch has not moved.
          if (!targetTouch) {
            return false;
          }
          x = targetTouch.pageX;
          y = targetTouch.pageY;
        }
      }
      pageOffset = pageOffset || getPageOffset(scope_Document);
      if (mouse || pointer) {
        x = e.clientX + pageOffset.x;
        y = e.clientY + pageOffset.y;
      }
      e.pageOffset = pageOffset;
      e.points = [x, y];
      e.cursor = mouse || pointer; // Fix #435
      return e;
    }
    // Translate a coordinate in the document to a percentage on the slider
    function calcPointToPercentage(calcPoint) {
      var location = calcPoint - offset(scope_Base, options.ort);
      var proposal = (location * 100) / baseSize();
      // Clamp proposal between 0% and 100%
      // Out-of-bound coordinates may occur when .noUi-base pseudo-elements
      // are used (e.g. contained handles feature)
      proposal = limit(proposal);
      return options.dir ? 100 - proposal : proposal;
    }
    // Find handle closest to a certain percentage on the slider
    function getClosestHandle(clickedPosition) {
      var smallestDifference = 100;
      var handleNumber = false;
      scope_Handles.forEach(function (handle, index) {
        // Disabled handles are ignored
        if (isHandleDisabled(index)) {
          return;
        }
        var handlePosition = scope_Locations[index];
        var differenceWithThisHandle = Math.abs(
          handlePosition - clickedPosition,
        );
        // Initial state
        var clickAtEdge =
          differenceWithThisHandle === 100 && smallestDifference === 100;
        // Difference with this handle is smaller than the previously checked handle
        var isCloser = differenceWithThisHandle < smallestDifference;
        var isCloserAfter =
          differenceWithThisHandle <= smallestDifference &&
          clickedPosition > handlePosition;
        if (isCloser || isCloserAfter || clickAtEdge) {
          handleNumber = index;
          smallestDifference = differenceWithThisHandle;
        }
      });
      return handleNumber;
    }
    // Fire 'end' when a mouse or pen leaves the document.
    function documentLeave(event, data) {
      if (
        event.type === 'mouseout' &&
        event.target.nodeName === 'HTML' &&
        event.relatedTarget === null
      ) {
        eventEnd(event, data);
      }
    }
    // Handle movement on document for handle and range drag.
    function eventMove(event, data) {
      // Fix #498
      // Check value of .buttons in 'start' to work around a bug in IE10 mobile (data.buttonsProperty).
      // https://connect.microsoft.com/IE/feedback/details/927005/mobile-ie10-windows-phone-buttons-property-of-pointermove-event-always-zero
      // IE9 has .buttons and .which zero on mousemove.
      // Firefox breaks the spec MDN defines.
      if (
        navigator.appVersion.indexOf('MSIE 9') === -1 &&
        event.buttons === 0 &&
        data.buttonsProperty !== 0
      ) {
        return eventEnd(event, data);
      }
      // Check if we are moving up or down
      var movement =
        (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
      // Convert the movement into a percentage of the slider width/height
      var proposal = (movement * 100) / data.baseSize;
      moveHandles(
        movement > 0,
        proposal,
        data.locations,
        data.handleNumbers,
        data.connect,
      );
    }
    // Unbind move events on document, call callbacks.
    function eventEnd(event, data) {
      // The handle is no longer active, so remove the class.
      if (data.handle) {
        removeClass(data.handle, options.cssClasses.active);
        scope_ActiveHandlesCount -= 1;
      }
      // Unbind the move and end events, which are added on 'start'.
      data.listeners.forEach(function (c) {
        scope_DocumentElement.removeEventListener(c[0], c[1]);
      });
      if (scope_ActiveHandlesCount === 0) {
        // Remove dragging class.
        removeClass(scope_Target, options.cssClasses.drag);
        setZindex();
        // Remove cursor styles and text-selection events bound to the body.
        if (event.cursor) {
          scope_Body.style.cursor = '';
          scope_Body.removeEventListener('selectstart', preventDefault);
        }
      }
      if (options.events.smoothSteps) {
        data.handleNumbers.forEach(function (handleNumber) {
          setHandle(
            handleNumber,
            scope_Locations[handleNumber],
            true,
            true,
            false,
            false,
          );
        });
        data.handleNumbers.forEach(function (handleNumber) {
          fireEvent('update', handleNumber);
        });
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent('change', handleNumber);
        fireEvent('set', handleNumber);
        fireEvent('end', handleNumber);
      });
    }
    // Bind move events on document.
    function eventStart(event, data) {
      // Ignore event if any handle is disabled
      if (data.handleNumbers.some(isHandleDisabled)) {
        return;
      }
      var handle;
      if (data.handleNumbers.length === 1) {
        var handleOrigin = scope_Handles[data.handleNumbers[0]];
        handle = handleOrigin.children[0];
        scope_ActiveHandlesCount += 1;
        // Mark the handle as 'active' so it can be styled.
        addClass(handle, options.cssClasses.active);
      }
      // A drag should never propagate up to the 'tap' event.
      event.stopPropagation();
      // Record the event listeners.
      var listeners = [];
      // Attach the move and end events.
      var moveEvent = attachEvent(
        actions.move,
        scope_DocumentElement,
        eventMove,
        {
          // The event target has changed so we need to propagate the original one so that we keep
          // relying on it to extract target touches.
          target: event.target,
          handle: handle,
          connect: data.connect,
          listeners: listeners,
          startCalcPoint: event.calcPoint,
          baseSize: baseSize(),
          pageOffset: event.pageOffset,
          handleNumbers: data.handleNumbers,
          buttonsProperty: event.buttons,
          locations: scope_Locations.slice(),
        },
      );
      var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
        target: event.target,
        handle: handle,
        listeners: listeners,
        doNotReject: true,
        handleNumbers: data.handleNumbers,
      });
      var outEvent = attachEvent(
        'mouseout',
        scope_DocumentElement,
        documentLeave,
        {
          target: event.target,
          handle: handle,
          listeners: listeners,
          doNotReject: true,
          handleNumbers: data.handleNumbers,
        },
      );
      // We want to make sure we pushed the listeners in the listener list rather than creating
      // a new one as it has already been passed to the event handlers.
      listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
      // Text selection isn't an issue on touch devices,
      // so adding cursor styles can be skipped.
      if (event.cursor) {
        // Prevent the 'I' cursor and extend the range-drag cursor.
        scope_Body.style.cursor = getComputedStyle(event.target).cursor;
        // Mark the target with a dragging state.
        if (scope_Handles.length > 1) {
          addClass(scope_Target, options.cssClasses.drag);
        }
        // Prevent text selection when dragging the handles.
        // In noUiSlider <= 9.2.0, this was handled by calling preventDefault on mouse/touch start/move,
        // which is scroll blocking. The selectstart event is supported by FireFox starting from version 52,
        // meaning the only holdout is iOS Safari. This doesn't matter: text selection isn't triggered there.
        // The 'cursor' flag is false.
        // See: http://caniuse.com/#search=selectstart
        scope_Body.addEventListener('selectstart', preventDefault, false);
      }
      data.handleNumbers.forEach(function (handleNumber) {
        fireEvent('start', handleNumber);
      });
    }
    // Move closest handle to tapped location.
    function eventTap(event) {
      // The tap event shouldn't propagate up
      event.stopPropagation();
      var proposal = calcPointToPercentage(event.calcPoint);
      var handleNumber = getClosestHandle(proposal);
      // Tackle the case that all handles are 'disabled'.
      if (handleNumber === false) {
        return;
      }
      // Flag the slider as it is now in a transitional state.
      // Transition takes a configurable amount of ms (default 300). Re-enable the slider after that.
      if (!options.events.snap) {
        addClassFor(
          scope_Target,
          options.cssClasses.tap,
          options.animationDuration,
        );
      }
      setHandle(handleNumber, proposal, true, true);
      setZindex();
      fireEvent('slide', handleNumber, true);
      fireEvent('update', handleNumber, true);
      if (!options.events.snap) {
        fireEvent('change', handleNumber, true);
        fireEvent('set', handleNumber, true);
      } else {
        eventStart(event, { handleNumbers: [handleNumber] });
      }
    }
    // Fires a 'hover' event for a hovered mouse/pen position.
    function eventHover(event) {
      var proposal = calcPointToPercentage(event.calcPoint);
      var to = scope_Spectrum.getStep(proposal);
      var value = scope_Spectrum.fromStepping(to);
      Object.keys(scope_Events).forEach(function (targetEvent) {
        if ('hover' === targetEvent.split('.')[0]) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(scope_Self, value);
          });
        }
      });
    }
    // Handles keydown on focused handles
    // Don't move the document when pressing arrow keys on focused handles
    function eventKeydown(event, handleNumber) {
      if (isSliderDisabled() || isHandleDisabled(handleNumber)) {
        return false;
      }
      var horizontalKeys = ['Left', 'Right'];
      var verticalKeys = ['Down', 'Up'];
      var largeStepKeys = ['PageDown', 'PageUp'];
      var edgeKeys = ['Home', 'End'];
      if (options.dir && !options.ort) {
        // On an right-to-left slider, the left and right keys act inverted
        horizontalKeys.reverse();
      } else if (options.ort && !options.dir) {
        // On a top-to-bottom slider, the up and down keys act inverted
        verticalKeys.reverse();
        largeStepKeys.reverse();
      }
      // Strip "Arrow" for IE compatibility. https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
      var key = event.key.replace('Arrow', '');
      var isLargeDown = key === largeStepKeys[0];
      var isLargeUp = key === largeStepKeys[1];
      var isDown =
        key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
      var isUp =
        key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
      var isMin = key === edgeKeys[0];
      var isMax = key === edgeKeys[1];
      if (!isDown && !isUp && !isMin && !isMax) {
        return true;
      }
      event.preventDefault();
      var to;
      if (isUp || isDown) {
        var direction = isDown ? 0 : 1;
        var steps = getNextStepsForHandle(handleNumber);
        var step = steps[direction];
        // At the edge of a slider, do nothing
        if (step === null) {
          return false;
        }
        // No step set, use the default of 10% of the sub-range
        if (step === false) {
          step = scope_Spectrum.getDefaultStep(
            scope_Locations[handleNumber],
            isDown,
            options.keyboardDefaultStep,
          );
        }
        if (isLargeUp || isLargeDown) {
          step *= options.keyboardPageMultiplier;
        } else {
          step *= options.keyboardMultiplier;
        }
        // Step over zero-length ranges (#948);
        step = Math.max(step, 0.0000001);
        // Decrement for down steps
        step = (isDown ? -1 : 1) * step;
        to = scope_Values[handleNumber] + step;
      } else if (isMax) {
        // End key
        to = options.spectrum.xVal[options.spectrum.xVal.length - 1];
      } else {
        // Home key
        to = options.spectrum.xVal[0];
      }
      setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
      fireEvent('slide', handleNumber);
      fireEvent('update', handleNumber);
      fireEvent('change', handleNumber);
      fireEvent('set', handleNumber);
      return false;
    }
    // Attach events to several slider parts.
    function bindSliderEvents(behaviour) {
      // Attach the standard drag event to the handles.
      if (!behaviour.fixed) {
        scope_Handles.forEach(function (handle, index) {
          // These events are only bound to the visual handle
          // element, not the 'real' origin element.
          attachEvent(actions.start, handle.children[0], eventStart, {
            handleNumbers: [index],
          });
        });
      }
      // Attach the tap event to the slider base.
      if (behaviour.tap) {
        attachEvent(actions.start, scope_Base, eventTap, {});
      }
      // Fire hover events
      if (behaviour.hover) {
        attachEvent(actions.move, scope_Base, eventHover, {
          hover: true,
        });
      }
      // Make the range draggable.
      if (behaviour.drag) {
        scope_Connects.forEach(function (connect, index) {
          if (
            connect === false ||
            index === 0 ||
            index === scope_Connects.length - 1
          ) {
            return;
          }
          var handleBefore = scope_Handles[index - 1];
          var handleAfter = scope_Handles[index];
          var eventHolders = [connect];
          var handlesToDrag = [handleBefore, handleAfter];
          var handleNumbersToDrag = [index - 1, index];
          addClass(connect, options.cssClasses.draggable);
          // When the range is fixed, the entire range can
          // be dragged by the handles. The handle in the first
          // origin will propagate the start event upward,
          // but it needs to be bound manually on the other.
          if (behaviour.fixed) {
            eventHolders.push(handleBefore.children[0]);
            eventHolders.push(handleAfter.children[0]);
          }
          if (behaviour.dragAll) {
            handlesToDrag = scope_Handles;
            handleNumbersToDrag = scope_HandleNumbers;
          }
          eventHolders.forEach(function (eventHolder) {
            attachEvent(actions.start, eventHolder, eventStart, {
              handles: handlesToDrag,
              handleNumbers: handleNumbersToDrag,
              connect: connect,
            });
          });
        });
      }
    }
    // Attach an event to this slider, possibly including a namespace
    function bindEvent(namespacedEvent, callback) {
      scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
      scope_Events[namespacedEvent].push(callback);
      // If the event bound is 'update,' fire it immediately for all handles.
      if (namespacedEvent.split('.')[0] === 'update') {
        scope_Handles.forEach(function (a, index) {
          fireEvent('update', index);
        });
      }
    }
    function isInternalNamespace(namespace) {
      return (
        namespace === INTERNAL_EVENT_NS.aria ||
        namespace === INTERNAL_EVENT_NS.tooltips
      );
    }
    // Undo attachment of event
    function removeEvent(namespacedEvent) {
      var event = namespacedEvent && namespacedEvent.split('.')[0];
      var namespace = event
        ? namespacedEvent.substring(event.length)
        : namespacedEvent;
      Object.keys(scope_Events).forEach(function (bind) {
        var tEvent = bind.split('.')[0];
        var tNamespace = bind.substring(tEvent.length);
        if (
          (!event || event === tEvent) &&
          (!namespace || namespace === tNamespace)
        ) {
          // only delete protected internal event if intentional
          if (!isInternalNamespace(tNamespace) || namespace === tNamespace) {
            delete scope_Events[bind];
          }
        }
      });
    }
    // External event handling
    function fireEvent(eventName, handleNumber, tap) {
      Object.keys(scope_Events).forEach(function (targetEvent) {
        var eventType = targetEvent.split('.')[0];
        if (eventName === eventType) {
          scope_Events[targetEvent].forEach(function (callback) {
            callback.call(
              // Use the slider public API as the scope ('this')
              scope_Self,
              // Return values as array, so arg_1[arg_2] is always valid.
              scope_Values.map(options.format.to),
              // Handle index, 0 or 1
              handleNumber,
              // Un-formatted slider values
              scope_Values.slice(),
              // Event is fired by tap, true or false
              tap || false,
              // Left offset of the handle, in relation to the slider
              scope_Locations.slice(),
              // add the slider public API to an accessible parameter when this is unavailable
              scope_Self,
            );
          });
        }
      });
    }
    // Split out the handle positioning logic so the Move event can use it, too
    function checkHandlePosition(
      reference,
      handleNumber,
      to,
      lookBackward,
      lookForward,
      getValue,
      smoothSteps,
    ) {
      var distance;
      // For sliders with multiple handles, limit movement to the other handle.
      // Apply the margin option by adding it to the handle positions.
      if (scope_Handles.length > 1 && !options.events.unconstrained) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.margin,
            false,
          );
          to = Math.max(to, distance);
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.margin,
            true,
          );
          to = Math.min(to, distance);
        }
      }
      // The limit option has the opposite effect, limiting handles to a
      // maximum distance from another. Limit must be > 0, as otherwise
      // handles would be unmovable.
      if (scope_Handles.length > 1 && options.limit) {
        if (lookBackward && handleNumber > 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber - 1],
            options.limit,
            false,
          );
          to = Math.min(to, distance);
        }
        if (lookForward && handleNumber < scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            reference[handleNumber + 1],
            options.limit,
            true,
          );
          to = Math.max(to, distance);
        }
      }
      // The padding option keeps the handles a certain distance from the
      // edges of the slider. Padding must be > 0.
      if (options.padding) {
        if (handleNumber === 0) {
          distance = scope_Spectrum.getAbsoluteDistance(
            0,
            options.padding[0],
            false,
          );
          to = Math.max(to, distance);
        }
        if (handleNumber === scope_Handles.length - 1) {
          distance = scope_Spectrum.getAbsoluteDistance(
            100,
            options.padding[1],
            true,
          );
          to = Math.min(to, distance);
        }
      }
      if (!smoothSteps) {
        to = scope_Spectrum.getStep(to);
      }
      // Limit percentage to the 0 - 100 range
      to = limit(to);
      // Return false if handle can't move
      if (to === reference[handleNumber] && !getValue) {
        return false;
      }
      return to;
    }
    // Uses slider orientation to create CSS rules. a = base value;
    function inRuleOrder(v, a) {
      var o = options.ort;
      return (o ? a : v) + ', ' + (o ? v : a);
    }
    // Moves handle(s) by a percentage
    // (bool, % to move, [% where handle started, ...], [index in scope_Handles, ...])
    function moveHandles(upward, proposal, locations, handleNumbers, connect) {
      var proposals = locations.slice();
      // Store first handle now, so we still have it in case handleNumbers is reversed
      var firstHandle = handleNumbers[0];
      var smoothSteps = options.events.smoothSteps;
      var b = [!upward, upward];
      var f = [upward, !upward];
      // Copy handleNumbers so we don't change the dataset
      handleNumbers = handleNumbers.slice();
      // Check to see which handle is 'leading'.
      // If that one can't move the second can't either.
      if (upward) {
        handleNumbers.reverse();
      }
      // Step 1: get the maximum percentage that any of the handles can move
      if (handleNumbers.length > 1) {
        handleNumbers.forEach(function (handleNumber, o) {
          var to = checkHandlePosition(
            proposals,
            handleNumber,
            proposals[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps,
          );
          // Stop if one of the handles can't move.
          if (to === false) {
            proposal = 0;
          } else {
            proposal = to - proposals[handleNumber];
            proposals[handleNumber] = to;
          }
        });
      }
      // If using one handle, check backward AND forward
      else {
        b = f = [true];
      }
      var state = false;
      // Step 2: Try to set the handles with the found percentage
      handleNumbers.forEach(function (handleNumber, o) {
        state =
          setHandle(
            handleNumber,
            locations[handleNumber] + proposal,
            b[o],
            f[o],
            false,
            smoothSteps,
          ) || state;
      });
      // Step 3: If a handle moved, fire events
      if (state) {
        handleNumbers.forEach(function (handleNumber) {
          fireEvent('update', handleNumber);
          fireEvent('slide', handleNumber);
        });
        // If target is a connect, then fire drag event
        if (connect != undefined) {
          fireEvent('drag', firstHandle);
        }
      }
    }
    // Takes a base value and an offset. This offset is used for the connect bar size.
    // In the initial design for this feature, the origin element was 1% wide.
    // Unfortunately, a rounding bug in Chrome makes it impossible to implement this feature
    // in this manner: https://bugs.chromium.org/p/chromium/issues/detail?id=798223
    function transformDirection(a, b) {
      return options.dir ? 100 - a - b : a;
    }
    // Updates scope_Locations and scope_Values, updates visual state
    function updateHandlePosition(handleNumber, to) {
      // Update locations.
      scope_Locations[handleNumber] = to;
      // Convert the value to the slider stepping/range.
      scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
      var translation = transformDirection(to, 0) - scope_DirOffset;
      var translateRule =
        'translate(' + inRuleOrder(translation + '%', '0') + ')';
      scope_Handles[handleNumber].style[options.transformRule] = translateRule;
      updateConnect(handleNumber);
      updateConnect(handleNumber + 1);
    }
    // Handles before the slider middle are stacked later = higher,
    // Handles after the middle later is lower
    // [[7] [8] .......... | .......... [5] [4]
    function setZindex() {
      scope_HandleNumbers.forEach(function (handleNumber) {
        var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
        var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
        scope_Handles[handleNumber].style.zIndex = String(zIndex);
      });
    }
    // Test suggested values and apply margin, step.
    // if exactInput is true, don't run checkHandlePosition, then the handle can be placed in between steps (#436)
    function setHandle(
      handleNumber,
      to,
      lookBackward,
      lookForward,
      exactInput,
      smoothSteps,
    ) {
      if (!exactInput) {
        to = checkHandlePosition(
          scope_Locations,
          handleNumber,
          to,
          lookBackward,
          lookForward,
          false,
          smoothSteps,
        );
      }
      if (to === false) {
        return false;
      }
      updateHandlePosition(handleNumber, to);
      return true;
    }
    // Updates style attribute for connect nodes
    function updateConnect(index) {
      // Skip connects set to false
      if (!scope_Connects[index]) {
        return;
      }
      var l = 0;
      var h = 100;
      if (index !== 0) {
        l = scope_Locations[index - 1];
      }
      if (index !== scope_Connects.length - 1) {
        h = scope_Locations[index];
      }
      // We use two rules:
      // 'translate' to change the left/top offset;
      // 'scale' to change the width of the element;
      // As the element has a width of 100%, a translation of 100% is equal to 100% of the parent (.noUi-base)
      var connectWidth = h - l;
      var translateRule =
        'translate(' +
        inRuleOrder(transformDirection(l, connectWidth) + '%', '0') +
        ')';
      var scaleRule = 'scale(' + inRuleOrder(connectWidth / 100, '1') + ')';
      scope_Connects[index].style[options.transformRule] =
        translateRule + ' ' + scaleRule;
    }
    // Parses value passed to .set method. Returns current value if not parse-able.
    function resolveToValue(to, handleNumber) {
      // Setting with null indicates an 'ignore'.
      // Inputting 'false' is invalid.
      if (to === null || to === false || to === undefined) {
        return scope_Locations[handleNumber];
      }
      // If a formatted number was passed, attempt to decode it.
      if (typeof to === 'number') {
        to = String(to);
      }
      to = options.format.from(to);
      if (to !== false) {
        to = scope_Spectrum.toStepping(to);
      }
      // If parsing the number failed, use the current value.
      if (to === false || isNaN(to)) {
        return scope_Locations[handleNumber];
      }
      return to;
    }
    // Set the slider value.
    function valueSet(input, fireSetEvent, exactInput) {
      var values = asArray(input);
      var isInit = scope_Locations[0] === undefined;
      // Event fires by default
      fireSetEvent = fireSetEvent === undefined ? true : fireSetEvent;
      // Animation is optional.
      // Make sure the initial values were set before using animated placement.
      if (options.animate && !isInit) {
        addClassFor(
          scope_Target,
          options.cssClasses.tap,
          options.animationDuration,
        );
      }
      // First pass, without lookAhead but with lookBackward. Values are set from left to right.
      scope_HandleNumbers.forEach(function (handleNumber) {
        setHandle(
          handleNumber,
          resolveToValue(values[handleNumber], handleNumber),
          true,
          false,
          exactInput,
        );
      });
      var i = scope_HandleNumbers.length === 1 ? 0 : 1;
      // Spread handles evenly across the slider if the range has no size (min=max)
      if (isInit && scope_Spectrum.hasNoSize()) {
        exactInput = true;
        scope_Locations[0] = 0;
        if (scope_HandleNumbers.length > 1) {
          var space_1 = 100 / (scope_HandleNumbers.length - 1);
          scope_HandleNumbers.forEach(function (handleNumber) {
            scope_Locations[handleNumber] = handleNumber * space_1;
          });
        }
      }
      // Secondary passes. Now that all base values are set, apply constraints.
      // Iterate all handles to ensure constraints are applied for the entire slider (Issue #1009)
      for (; i < scope_HandleNumbers.length; ++i) {
        scope_HandleNumbers.forEach(function (handleNumber) {
          setHandle(
            handleNumber,
            scope_Locations[handleNumber],
            true,
            true,
            exactInput,
          );
        });
      }
      setZindex();
      scope_HandleNumbers.forEach(function (handleNumber) {
        fireEvent('update', handleNumber);
        // Fire the event only for handles that received a new value, as per #579
        if (values[handleNumber] !== null && fireSetEvent) {
          fireEvent('set', handleNumber);
        }
      });
    }
    // Reset slider to initial values
    function valueReset(fireSetEvent) {
      valueSet(options.start, fireSetEvent);
    }
    // Set value for a single handle
    function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
      // Ensure numeric input
      handleNumber = Number(handleNumber);
      if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) {
        throw new Error(
          'noUiSlider: invalid handle number, got: ' + handleNumber,
        );
      }
      // Look both backward and forward, since we don't want this handle to "push" other handles (#960);
      // The exactInput argument can be used to ignore slider stepping (#436)
      setHandle(
        handleNumber,
        resolveToValue(value, handleNumber),
        true,
        true,
        exactInput,
      );
      fireEvent('update', handleNumber);
      if (fireSetEvent) {
        fireEvent('set', handleNumber);
      }
    }
    // Get the slider value.
    function valueGet(unencoded) {
      if (unencoded === void 0) {
        unencoded = false;
      }
      if (unencoded) {
        // return a copy of the raw values
        return scope_Values.length === 1
          ? scope_Values[0]
          : scope_Values.slice(0);
      }
      var values = scope_Values.map(options.format.to);
      // If only one handle is used, return a single value.
      if (values.length === 1) {
        return values[0];
      }
      return values;
    }
    // Removes classes from the root and empties it.
    function destroy() {
      // remove protected internal listeners
      removeEvent(INTERNAL_EVENT_NS.aria);
      removeEvent(INTERNAL_EVENT_NS.tooltips);
      Object.keys(options.cssClasses).forEach(function (key) {
        removeClass(scope_Target, options.cssClasses[key]);
      });
      while (scope_Target.firstChild) {
        scope_Target.removeChild(scope_Target.firstChild);
      }
      delete scope_Target.noUiSlider;
    }
    function getNextStepsForHandle(handleNumber) {
      var location = scope_Locations[handleNumber];
      var nearbySteps = scope_Spectrum.getNearbySteps(location);
      var value = scope_Values[handleNumber];
      var increment = nearbySteps.thisStep.step;
      var decrement = null;
      // If snapped, directly use defined step value
      if (options.snap) {
        return [
          value - nearbySteps.stepBefore.startValue || null,
          nearbySteps.stepAfter.startValue - value || null,
        ];
      }
      // If the next value in this step moves into the next step,
      // the increment is the start of the next step - the current value
      if (increment !== false) {
        if (value + increment > nearbySteps.stepAfter.startValue) {
          increment = nearbySteps.stepAfter.startValue - value;
        }
      }
      // If the value is beyond the starting point
      if (value > nearbySteps.thisStep.startValue) {
        decrement = nearbySteps.thisStep.step;
      } else if (nearbySteps.stepBefore.step === false) {
        decrement = false;
      }
      // If a handle is at the start of a step, it always steps back into the previous step first
      else {
        decrement = value - nearbySteps.stepBefore.highestStep;
      }
      // Now, if at the slider edges, there is no in/decrement
      if (location === 100) {
        increment = null;
      } else if (location === 0) {
        decrement = null;
      }
      // As per #391, the comparison for the decrement step can have some rounding issues.
      var stepDecimals = scope_Spectrum.countStepDecimals();
      // Round per #391
      if (increment !== null && increment !== false) {
        increment = Number(increment.toFixed(stepDecimals));
      }
      if (decrement !== null && decrement !== false) {
        decrement = Number(decrement.toFixed(stepDecimals));
      }
      return [decrement, increment];
    }
    // Get the current step size for the slider.
    function getNextSteps() {
      return scope_HandleNumbers.map(getNextStepsForHandle);
    }
    // Updatable: margin, limit, padding, step, range, animate, snap
    function updateOptions(optionsToUpdate, fireSetEvent) {
      // Spectrum is created using the range, snap, direction and step options.
      // 'snap' and 'step' can be updated.
      // If 'snap' and 'step' are not passed, they should remain unchanged.
      var v = valueGet();
      var updateAble = [
        'margin',
        'limit',
        'padding',
        'range',
        'animate',
        'snap',
        'step',
        'format',
        'pips',
        'tooltips',
      ];
      // Only change options that we're actually passed to update.
      updateAble.forEach(function (name) {
        // Check for undefined. null removes the value.
        if (optionsToUpdate[name] !== undefined) {
          originalOptions[name] = optionsToUpdate[name];
        }
      });
      var newOptions = testOptions(originalOptions);
      // Load new options into the slider state
      updateAble.forEach(function (name) {
        if (optionsToUpdate[name] !== undefined) {
          options[name] = newOptions[name];
        }
      });
      scope_Spectrum = newOptions.spectrum;
      // Limit, margin and padding depend on the spectrum but are stored outside of it. (#677)
      options.margin = newOptions.margin;
      options.limit = newOptions.limit;
      options.padding = newOptions.padding;
      // Update pips, removes existing.
      if (options.pips) {
        pips(options.pips);
      } else {
        removePips();
      }
      // Update tooltips, removes existing.
      if (options.tooltips) {
        tooltips();
      } else {
        removeTooltips();
      }
      // Invalidate the current positioning so valueSet forces an update.
      scope_Locations = [];
      valueSet(
        isSet(optionsToUpdate.start) ? optionsToUpdate.start : v,
        fireSetEvent,
      );
    }
    // Initialization steps
    function setupSlider() {
      // Create the base element, initialize HTML and set classes.
      // Add handles and connect elements.
      scope_Base = addSlider(scope_Target);
      addElements(options.connect, scope_Base);
      // Attach user events.
      bindSliderEvents(options.events);
      // Use the public value method to set the start values.
      valueSet(options.start);
      if (options.pips) {
        pips(options.pips);
      }
      if (options.tooltips) {
        tooltips();
      }
      aria();
    }
    setupSlider();
    var scope_Self = {
      destroy: destroy,
      steps: getNextSteps,
      on: bindEvent,
      off: removeEvent,
      get: valueGet,
      set: valueSet,
      setHandle: valueSetHandle,
      reset: valueReset,
      // Exposed for unit testing, don't use this in your application.
      __moveHandles: function (upward, proposal, handleNumbers) {
        moveHandles(upward, proposal, scope_Locations, handleNumbers);
      },
      options: originalOptions,
      updateOptions: updateOptions,
      target: scope_Target,
      removePips: removePips,
      removeTooltips: removeTooltips,
      getPositions: function () {
        return scope_Locations.slice();
      },
      getTooltips: function () {
        return scope_Tooltips;
      },
      getOrigins: function () {
        return scope_Handles;
      },
      pips: pips, // Issue #594
    };
    return scope_Self;
  }
  // Run the standard initializer
  function initialize(target, originalOptions) {
    if (!target || !target.nodeName) {
      throw new Error(
        'noUiSlider: create requires a single element, got: ' + target,
      );
    }
    // Throw an error if the slider was already initialized.
    if (target.noUiSlider) {
      throw new Error('noUiSlider: Slider was already initialized.');
    }
    // Test the options and create the slider environment;
    var options = testOptions(originalOptions);
    var api = scope(target, options, originalOptions);
    target.noUiSlider = api;
    return api;
  }
  var nouislider = {
    // Exposed for unit testing, don't use this in your application.
    __spectrum: Spectrum,
    // A reference to the default classes, allows global changes.
    // Use the cssClasses option for changes to one slider.
    cssClasses: cssClasses,
    create: initialize,
  };

  exports.create = initialize;
  exports.cssClasses = cssClasses;
  exports['default'] = nouislider;

  Object.defineProperty(exports, '__esModule', { value: true });
});
// Это noUiSlider.js

function rangeInit() {
  const rangeItems = document.querySelectorAll('[data-range]');

  if (rangeItems.length) {
    rangeItems.forEach((rangeItem) => {
      const fromValue = rangeItem.querySelector('[data-range-from]');
      const toValue = rangeItem.querySelector('[data-range-to]');
      const item = rangeItem.querySelector('[data-range-item]');

      noUiSlider.create(item, {
        start: [Number(fromValue.value), Number(toValue.value)], // [0,200000]
        connect: true,
        tooltips: [true, true],
        range: {
          min: [Number(fromValue.dataset.rangeFrom)],
          max: [Number(toValue.dataset.rangeTo)],
        },
      });
      item.noUiSlider.on('update', function (values, handle) {
        fromValue.value = values[handle];
        toValue.value = values[handle];
      });
    });
  }
}

rangeInit();
function formQuantity() {
  document.addEventListener('click', function (e) {
    let targetElement = e.target;
    if (targetElement.closest('.quantity__button')) {
      let value = parseInt(
        targetElement.closest('.quantity').querySelector('input').value,
      );
      if (targetElement.classList.contains('quantity__button_plus')) {
        value++;
      } else {
        --value;
        if (value < 1) value = 1;
      }
      targetElement.closest('.quantity').querySelector('input').value = value;
    }
  });
}

formQuantity();
function tabs() {
  const tabs = document.querySelectorAll('[data-tabs]');
  let tabsActiveHash = [];

  if (tabs.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith('tab-')) {
      tabsActiveHash = hash.replace('tab-', '').split('-');
    }
    tabs.forEach((tabsBlock, index) => {
      tabsBlock.classList.add('_tab-init');
      tabsBlock.setAttribute('data-tabs-index', index);
      tabsBlock.addEventListener('click', setTabsAction);
      initTabs(tabsBlock);
    });

    // Получение слойлеров с медиа запросами
    let mdQueriesArray = dataMediaQueries(tabs, 'tabs');
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        // Событие
        mdQueriesItem.matchMedia.addEventListener('change', function () {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  // Установка позиций заголовков
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
      let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
      let tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
      let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
      tabsTitleItems = Array.from(tabsTitleItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems = Array.from(tabsContentItems).filter(
        (item) => item.closest('[data-tabs]') === tabsMediaItem,
      );
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add('_tab-spoller');
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove('_tab-spoller');
        }
      });
    });
  }
  // Работа с контентом
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;

    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector(
        '[data-tabs-titles]>._tab-active',
      );
      tabsActiveTitle ? tabsActiveTitle.classList.remove('_tab-active') : null;
    }
    if (tabsContent.length) {
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute('data-tabs-title', '');
        tabsContentItem.setAttribute('data-tabs-item', '');

        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add('_tab-active');
        }
        tabsContentItem.hidden =
          !tabsTitles[index].classList.contains('_tab-active');
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
    let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
    const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
    function isTabsAnamate(tabsBlock) {
      if (tabsBlock.hasAttribute('data-tabs-animate')) {
        return tabsBlock.dataset.tabsAnimate > 0
          ? Number(tabsBlock.dataset.tabsAnimate)
          : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute('data-tabs-hash');
      tabsContent = Array.from(tabsContent).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsTitles = Array.from(tabsTitles).filter(
        (item) => item.closest('[data-tabs]') === tabsBlock,
      );
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains('_tab-active')) {
          if (tabsBlockAnimate) {
            _slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest('.popup')) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            _slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest('[data-tabs-title]')) {
      const tabTitle = el.closest('[data-tabs-title]');
      const tabsBlock = tabTitle.closest('[data-tabs]');
      if (
        !tabTitle.classList.contains('_tab-active') &&
        !tabsBlock.querySelector('._slide')
      ) {
        let tabActiveTitle = tabsBlock.querySelectorAll(
          '[data-tabs-title]._tab-active',
        );
        tabActiveTitle.length
          ? (tabActiveTitle = Array.from(tabActiveTitle).filter(
              (item) => item.closest('[data-tabs]') === tabsBlock,
            ))
          : null;
        tabActiveTitle.length
          ? tabActiveTitle[0].classList.remove('_tab-active')
          : null;
        tabTitle.classList.add('_tab-active');
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}

tabs();