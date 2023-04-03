import ImagesApiService from "./fetchImages";
import Notiflix from 'notiflix';


const imagesApiService = new ImagesApiService();

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtnRef = document.querySelector('.load-more')

formRef.addEventListener('submit', onSubmit);
loadMoreBtnRef.addEventListener('click', onClick);


async function onSubmit (e) {
e.preventDefault();
imagesApiService.query = e.target.elements.searchQuery.value;

imagesApiService.resetPage();

imagesApiService.fetchImages().then (renderImages);



}


async function onClick () {
   
    imagesApiService.fetchImages().then (renderImages);
}


function createMarkup(data) {
    //create a function that will insert a mark up with images, 40 per page 
const {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = data;

return (markup = `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
`)

}

function renderImages(data) {
    galleryRef.insertAdjacentHTML('afterbegin', createMarkup(data));
}





