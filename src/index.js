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
 
  if(e.target.elements.searchQuery.value.trim() === "") {
    return
  }

  imagesApiService.resetPage();
  galleryRef.innerHTML = '';

  try {
    const images = await imagesApiService.fetchImages();
    renderImages(images);
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Десь помилка');
  }
//   imagesApiService.fetchImages().then(renderImages);
  
}

async function onClick() {

    console.log('Load more is clicked')
    try {
        const images = await imagesApiService.fetchImages();
        renderImages(images);
    } catch (error) {
console.error(error)
Notiflix.Notify.failure('Десь помилка');
    }
//   imagesApiService.fetchImages().then(renderImages);
}

function createMarkup(images) {
  return images.hits
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
 
    if(images.total === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        loadMoreBtnRef.classList.add('is-hidden');
    } 
         
    loadMoreBtnRef.classList.remove('is-hidden');
    galleryRef.insertAdjacentHTML('beforeend', createMarkup(images));

    if (images.hits.length * imagesApiService.page >= images.totalHits && images.totalHits > 0) {
        const remainingItems = images.totalHits - (images.hits.length * imagesApiService.page);
        if (remainingItems < 40) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadMoreBtnRef.classList.add('is-hidden');
        }
    }
}
