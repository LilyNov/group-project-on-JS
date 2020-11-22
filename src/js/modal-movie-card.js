import './get-refs';
import refs from './get-refs';
import cardMovieTemplate from '../templates/modal-tmp.hbs';

// import { onQueueBtnClick, onWatchedBtnClick } from './localStorage.js';

const modalRefs = {
  lightbox: document.querySelector('.modal-movie-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  overlayModal: document.querySelector('.modal-movie-overlay'),
};

const libraryRefs = {
  toWatchedBtn: '',
  toQueueBtn: '',
};

refs.filmContainer.addEventListener('click', showMovieCard);

async function showMovieCard(event) {
  openCloseModal();

  modalRefs.overlayModal.insertAdjacentHTML(
    'beforeend',
    cardMovieTemplate(
      await fetchMovie(event.target.closest('.movies-item').getAttribute('id')),
    ),
  );

  libraryRefs.toWatchedBtn = document.querySelector('[data-name="watched"]');
  libraryRefs.toQueueBtn = document.querySelector('[data-name="queue"]');

  libraryRefs.toWatchedBtn.addEventListener('click', onWatchedBtnClick);
  libraryRefs.toQueueBtn.addEventListener('click', onQueueBtnClick);
}

async function fetchMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=7e78d9d0b80a5a9938ce5aba09bf2c47`,
  );
  return await response.json();
}

function openCloseModal() {
  modalRefs.lightbox.classList.toggle('modal-is-open');

  if (modalRefs.lightbox.classList.contains('modal-is-open')) {
    window.addEventListener('keydown', pressEsc);
    modalRefs.closeModalBtn.addEventListener('click', openCloseModal);
    modalRefs.overlayModal.addEventListener('click', onOverlayClick);
  } else {
    window.removeEventListener('keydown', pressEsc);
    modalRefs.closeModalBtn.removeEventListener('click', openCloseModal);
    modalRefs.overlayModal.removeEventListener('click', onOverlayClick);
    libraryRefs.toWatchedBtn.removeEventListener('click', onWatchedBtnClick);
    libraryRefs.toQueueBtn.removeEventListener('click', onQueueBtnClick);

    removeOldElement(document.querySelector('.modal-movie-wrapper'));
  }
}

function pressEsc(evt) {
  if (
    modalRefs.lightbox.classList.contains('modal-is-open') &&
    evt.code === 'Escape'
  ) {
    openCloseModal();
  }
}

function onOverlayClick(evt) {
  if (evt.target.closest('.modal-movie-wrapper')) {
    return;
  }

  openCloseModal();
}

function removeOldElement(element) {
  if (element) {
    element.remove();
  }
}

//  local storage

function onWatchedBtnClick() {
  let id = document.querySelector('.modal-movie-wrapper').getAttribute('id');
  console.log(id);
  console.log('watched');

    saveW();
   
}

function onQueueBtnClick() {
  

    saveQ();
   


}

function saveW() {
  let newId = document.querySelector('.modal-movie-wrapper').getAttribute('id');
  console.log(newId);

  const btnWatched = libraryRefs.toWatchedBtn
  
   if (localStorage.getItem("watched") === null) {
          localStorage.setItem("watched", "[]")

  }

  let oldId = JSON.parse(localStorage.getItem('watched'));
  console.log(oldId);

   const i = oldId.indexOf(newId)
  


  if (i === -1) {
    oldId.push(newId)

    btnWatched.classList.remove("button-is-active")
    btnWatched.innerHTML = "delete from watched"
    console.log("добавил");


  }  else {
    oldId.splice(i, 1);

    btnWatched.classList.add("button-is-active")
    btnWatched.innerHTML = "add to watched"
    console.log('удалил');
  }


  // вывести в LS
  localStorage.setItem('watched', JSON.stringify(oldId));
}

function saveQ() {

  let newId = document.querySelector('.modal-movie-wrapper').getAttribute('id')
  const toQueueBtn = libraryRefs.toQueueBtn
  
   if (localStorage.getItem("queue") === null) {
          localStorage.setItem("queue", "[]")
  }
  
  let oldId = JSON.parse(localStorage.getItem("queue"))
  const i = oldId.indexOf(newId)

  if (i === -1) {
    oldId.push(newId)
  
    toQueueBtn.classList.remove("button-is-active")
    toQueueBtn.innerHTML = "delete from queue"
   
   
    } else {
    oldId.splice(i, 1);
    
   
    toQueueBtn.classList.add("button-is-active")
    toQueueBtn.innerHTML = "add to queue"

  }

  //   else {
  //   oldId.splice(i, 1);
  //   console.log('удалил');
  // }


  // вывести в LS
  localStorage.setItem('queue', JSON.stringify(oldId));
}


function delQ() {
  let newId = document.querySelector('.modal-movie-wrapper').getAttribute('id');
  let oldId = JSON.parse(localStorage.getItem('queue'));
  const i = oldId.indexOf(newId);

  if (i) {
    console.log(i);
    oldId.splice(i, 1);
    console.log('удалил');
  }
}

export { fetchMovie, showMovieCard };

function viewW() {
  const vievWL = localStorage.getItem("watched")

  if (vievWL !== null) {
    const parseWatched = JSON.parse(localStorage.getItem("watched"))
    console.log(parseWatched);

    const id = parseWatched.map((id)  => {
      Number(id)
      console.log(id);
    
  //  сделать рендер карточки фильма по айди
     

   })
  }
  
}

viewW()

export default { fetchMovie, showMovieCard };


