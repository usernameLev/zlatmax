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
