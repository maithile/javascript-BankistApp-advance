'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const allSection = document.querySelectorAll('.section');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContents = document.querySelectorAll('.operations__content');
const dotContainer = document.querySelector('.dots');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// test forEach
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////// smooth behavior /////////////
btnScroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// //// * nav link *////
// const navLink = document.querySelectorAll('.nav__link');
// // tao function chan prevent(), kich moi link a
// navLink.forEach(function (e) {
//   e.addEventListener('click', function (el) {
//     el.preventDefault();
//     // console.log(this);
//     console.log(el.target);

//     // lay id ra kie gi nhi
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

///////////////*event elegnent*////////////////
// gan su kien cho thang cha
// matching voi thang con
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  console.log(e.target);
  // tim thang con matching vs cha
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
////////////////////////  Tabbed Building ////////////
// 1. gan cho cha
// 2. matching thang con voi cha
tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // true
  console.log(clicked);

  // active tab
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // active content
  tabContents.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
////////////////////////  hover  /////////////////////
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const moused = e.target;
    // chon  het link con lai bang cach move den cha r chon tu tren xuong
    const siblings = moused.closest('.nav').querySelectorAll('.nav__link');
    // lay logo nua
    const logo = moused.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== moused) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
const newHandle = handleHover.bind(0.5); // return new function
nav.addEventListener('mouseover', newHandle);
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////  sticky Intersection   //////////////
const navHeight = nav.getBoundingClientRect().height;
const navCallback = function (entries) {
  const [entry] = entries;
  // console.log(entry.target);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const obHeader = new IntersectionObserver(navCallback, {
  root: null, // default portview
  threshold: 0, // header reach 0% so voi viewport thi call callback
  rootMargin: `-${navHeight}px`,
});
obHeader.observe(header);

////////////////////////  Move up animation Intersection   ////////
const revealSection = function (entries, observe) {
  // const [entry] = entries; // jonasn ways
  entries.forEach(entry => {
    // if (!entry.isIntersecting) return; // jonas
    if (entry.isIntersecting) {
      entry.target.classList.remove('section--hidden');
      observe.unobserve(entry.target);
    }
  });
};

// create object observe for section
const obSection = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});
// quan sat
allSection.forEach(section => {
  obSection.observe(section);
  // section.classList.add('section--hidden');
});

////////////////////////Layzy Load Img  /////////////////////
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observe) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //replace src with data-src
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
      });
      observe.unobserve(entry.target);
    }
  });
};
const imgObserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '400px', // cach 400px laf nos d xay ra truoc khi reach target
});
// observetarget
imgTargets.forEach(img => imgObserve.observe(img));

//////////////////////// slider ///////////////////
const imgSlide = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
const maxSlide = imgSlide.length - 1; // 4

const slider = function () {
  // function
  const moveSlide = function (slide) {
    imgSlide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  moveSlide(0);
  // next slide
  const nextSlide = function () {
    if (currSlide === maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    moveSlide(currSlide);
    activeDote(currSlide);
  };

  // prev slide
  const prevSlide = function () {
    if (currSlide === 0) {
      currSlide = maxSlide; // 3
    } else {
      currSlide--;
    }
    moveSlide(currSlide);
    activeDote(currSlide);
  };
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  /////////// use arrow to move /////////
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  //////////// Create Dot ////////////
  const createDots = function () {
    imgSlide.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();
  //////////// active dot ////////////
  const activeDote = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  activeDote(0);
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const slideNum = Number(e.target.dataset.slide);
      moveSlide(slideNum);
      activeDote(slideNum);
    }
  });
};
slider();
////////////////////////  Lifeccle DOM Event /////////////////

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HtmL parsed and DOm tree buil');
// });

// window.addEventListener('load', function (e) {
//   console.log('page full load', e);
// });
window.addEventListener('beforeunload', function (event) {
  e.preventDefault();
  event.returnValue = 'Write something clever here..';
});
////////////////////////  practice /////////////////////

// IntersectionObserver c?? th??? ???????c s??? d???ng ????? theo d??i xem m???t ph???n t??? ???? ??i v??o v??ng hi???n th??? c???a thi???t b??? hay kh??ng m?? kh??ng c???n ph???i t??nh to??n th?????ng xuy??n v?? ph???c t???p ????? ????a ra quy???t ?????nh n??y.

////////////  IntersectionObserver /////////////////////
// tao callback and option
// const abCallback = function (entries, observe) {
//   entries.forEach(en => console.log(en));
// };
// const abOption = {
//   root: null, // default viewport
//   threshold: [0, 0.2],
// };
// // tao doi tuong can quan sat
// const observer = new IntersectionObserver(abCallback, abOption);
// observer.observe(section1);

// const h1 = document.querySelector('h1');

// console.log(h1.querySelectorAll('.highlight')); // deep hon na van ok
// console.log(h1.childNodes); //
// console.log(h1.children);

// h1.firstElementChild.style.color = 'black'; // phan tu dau tien
// h1.lastElementChild.style.color = 'white'; // phan tu dau tien

// go up
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = ''; // chayj tu duoi len tim duoc phan tu phu hop voi phan tu trong secltor thi thoi / doi dien queryselectoerALL
// h1.closest('h1').style.background = 'orangered'; // chayj tu duoi len tim duoc phan tu phu hop voi phan tu trong secltor thi thoi / doi dien queryselectoerALL

// console.log(h1.previousSibling);
// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) e.style.transform = 'scale(0.5)';
// });
////////// DOM traversing ////////////

// sibling
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// seclect element
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// nodeList
// const header = document.querySelector('.header');
// const section = document.querySelectorAll('.section');
// // console.log(section);

// // HMTL collection
// document.getElementById('section--1');
// const allBtn = document.getElementsByTagName('button');
// // console.log(allBtn);
// // create element
// const messenger = document.createElement('div'); // tao class nhung no van chua chinh thuc vao dom
// messenger.classList.add('cookie-message'); // add class cac kieru bt
// // messenger.textContent = 'Tap trung va co gang! on my way';
// messenger.innerHTML =
//   'M da tim thay con duong cua minh roi cu the ma lam. <button class="btn btn--close-cookie">Got it</button>';

// // chen vao header
// // header.prepend(messenger);
// header.append(messenger);
// // header.before(messenger);
// // header.after(messenger);

// // delete element
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // messenger.remove();
//     messenger.parentElement.removeChild(messenger); // olad way
//   });

// //// practice styles
// messenger.style.backgroundColor = '#37383d';
// messenger.style.width = '120%';

// // viet ham random color
// const ramRbg = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const ramColor = () =>
//   `rgb(${ramRbg(0, 255)}, ${ramRbg(0, 255)}, ${ramRbg(0, 255)})`;

// // lay ra cac the va gan su kien
// const nav = document.querySelector('.nav');
// const ul = document.querySelector('.nav__links');
// const a = document.querySelector('.nav__link');
// // gan ranrom cho the nav
// nav.addEventListener('click', function (e) {
//   this.style.backgroundColor = ramColor();
//   e.stopPropagation();
// });
// // gan ramdom cho the ul
// ul.addEventListener('click', function (e) {
//   this.style.backgroundColor = ramColor();
//   console.log(e.target, e.currentTarget); // ul, ul
// });
// // gan ramdom cho a
// a.addEventListener('click', function (e) {
//   this.style.backgroundColor = ramColor();
//   console.log(e.target, e.currentTarget); // ul a
// });
//  e.taget = cai nao duoc click
// e.currentTaget even du gan tren the nao

// // lay style
// console.log(messenger.style.color); // k ra la dung thoi
// console.log(messenger.style.backgroundColor);

// // cach lay style tu style.css file
// console.log(getComputedStyle(messenger).color);
// console.log(getComputedStyle(messenger).height); // ke ca m k dinh nghia // 43px

// cach thay doi style tu file style.css
// messenger.style.height =
//   Number.parseInt(getComputedStyle(messenger).height, 10) + 40 + 'px';

// work with css variable
// document.documentElement.style.setProperty('--color-primary', 'green');
// co the dungf dk voi color, background.. nhung ma lam nhu o tren o don gian

///////////////// working with atribute //////////////////
// // atribute
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// // Non-standard
// console.log(logo.teacher); // underfile
// console.log(logo.getAttribute('teacher'));

// // set atribute
// logo.setAttribute('youtuber', 'Mai Mit');

// // about the link
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // special data atribute
// console.log(logo.dataset.versionNumber);

// classs
// logo.contains('df');

// dont use
// logo.className = 'jonas';

///////////////// scroll smooth //////////////////

// cach 1 k dung JS html scloll smoothed nhung ma no support tren IOS broswer

// const btnScroll = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// // cach 2 jonas
// btnScroll.addEventListener('click', function () {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// // cach 3
// btnScroll.addEventListener('click', function () {
//   window.location.href = '#section--1';
// });

///////////////// even listener  //////////////////

// const img = document.querySelector('.header__img');

// const greeting = function (e) {
//   alert('hoc ky hieu ban chat');
//   // img.style.width = '30%';
//   // img.removeEventListener('mouseenter', greeting);
// };
// img.addEventListener('mouseenter', greeting);
// img.onmouseenter = function (e) {
//   alert('hello');
// };

///////////////Capturing and Bubble even click
