import ImagesApiService from './fetchImages';
import Notiflix from 'notiflix';

const imagesApiService = new ImagesApiService();

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more');

formRef.addEventListener('submit', onSubmit);
loadMoreBtnRef.addEventListener('click', onClick);

async function onSubmit(e) {
  e.preventDefault();
  imagesApiService.query = e.target.elements.searchQuery.value.trim();


  imagesApiService.resetPage();
  galleryRef.innerHTML = '';
  
  imagesApiService.fetchImages().then(renderImages);
  loadMoreBtnRef.classList.remove('is-hidden');
}

async function onClick() {
    console.log('Load more is clicked')
  imagesApiService.fetchImages().then(renderImages);
}

function createMarkup(images) {
  return images
    .map(image => {
      const { webformatURL, tags, likes, views, comments, downloads } = image;

      return `
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy"
             width ="300px" height ="200px"/>
            <div class="info">
              <p class="info-item">
                <b>Likes ${likes}</b>
              </p>
              <p class="info-item">
                <b>Views ${views}</b>
              </p>
              <p class="info-item">
                <b>Comments ${comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads ${downloads}</b>
              </p>
            </div>
          </div>
        `;
    })
    .join('');
}

function renderImages(images) {
    if(images.length === 0) {
        Notiflix.Notify.failure('Such image doesnt exist. Try smng else');
    } 

    galleryRef.insertAdjacentHTML('beforeend', createMarkup(images));
}
