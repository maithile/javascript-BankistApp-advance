'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

////////////////////////  practice /////////////////////

// seclect element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

// nodeList
const header = document.querySelector('.header');
const section = document.querySelectorAll('.section');
console.log(section);

// HMTL collection
document.getElementById('section--1');
const allBtn = document.getElementsByTagName('button');
console.log(allBtn);

// create element
const messenger = document.createElement('div'); // tao class nhung no van chua chinh thuc vao dom
messenger.classList.add('cookie-message'); // add class cac kieru bt
// messenger.textContent = 'Tap trung va co gang! on my way';
messenger.innerHTML =
  'M da tim thay con duong cua minh roi cu the ma lam. <button class="btn btn--close-cookie">Got it</button>';

// chen vao header
// header.prepend(messenger);
header.append(messenger);
// header.before(messenger);
// header.after(messenger);

// delete element
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // messenger.remove();
    messenger.parentElement.removeChild(messenger); // olad way
  });

//// practice styles
messenger.style.backgroundColor = '#37383d';
messenger.style.width = '120%';

// lay style
console.log(messenger.style.color); // k ra la dung thoi
console.log(messenger.style.backgroundColor);

// cach lay style tu style.css file
console.log(getComputedStyle(messenger).color);
console.log(getComputedStyle(messenger).height); // ke ca m k dinh nghia // 43px

// cach thay doi style tu file style.css
messenger.style.height =
  Number.parseInt(getComputedStyle(messenger).height, 10) + 40 + 'px';

// work with css variable
document.documentElement.style.setProperty('--color-primary', 'green');
// co the dungf dk voi color, background.. nhung ma lam nhu o tren o don gian

///////////////// working with atribute //////////////////
// atribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Non-standard
console.log(logo.teacher); // underfile
console.log(logo.getAttribute('teacher'));

// set atribute
logo.setAttribute('youtuber', 'Mai Mit');

// about the link
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// special data atribute
console.log(logo.dataset.versionNumber);

// classs
// logo.contains('df');

// dont use
// logo.className = 'jonas';

///////////////// scroll smooth //////////////////

// cach 1 k dung JS html scloll smoothed nhung ma no support tren IOS broswer

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// cach 2 jonas
btnScroll.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// cach 3
btnScroll.addEventListener('click', function () {
  window.location.href = '#section--1';
});
