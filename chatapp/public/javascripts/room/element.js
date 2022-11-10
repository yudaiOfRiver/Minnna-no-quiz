'use strict';

$('#commandNavButton')[0].addEventListener('click', () => {
  $('#commandNavContent').toggleClass('hide')
})

$('#participantsButton')[0].addEventListener('click', () => {
  $('#participantsContent').toggleClass('hide')
})

setHeight();

function setHeight() {
  const height = window.innerHeight;
  $('.main-content')[0].style.height = (height - 40 - 50) + 'px';
}