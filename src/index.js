import './sass/main.scss';
import ApiService from "./js/api-service"
import markup from "./js/markup";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const searchButton = document.querySelector('[type=submit]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more')

const apiService = new ApiService()


form.addEventListener('submit', searchImages)
loadMoreBtn.addEventListener('click', onLoadMore)

let galleryLightBox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition:'bottom'});

async function searchImages(e) {
    e.preventDefault()
    clearCards();
    apiService.query = e.currentTarget.elements.searchQuery.value.trim();
    if (apiService.query) {
    
    apiService.resetPage();
    apiService.apiFetch().then(appendHitsMarkup);
    }
    else {
        Notiflix.Notify.failure('Something went wrong, please try again...');
    }
}

function onLoadMore() {
    apiService.apiFetch().then(appendHitsMarkup)
}

function appendHitsMarkup(data) {
    gallery.insertAdjacentHTML('beforeend', markup(data.hits))
    galleryLightBox.refresh()
    if (data.totalHits === 0) {
         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                loadMoreBtn.classList.add('is-hidden')

        return
    } else
        if (apiService.page === 2) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`) 
        loadMoreBtn.classList.remove('is-hidden')
            return
    } else 
    if (data.hits.length === 0 && data.totalHits !== 0) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
        return
    } else {
        const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
    }}
function clearCards() {
    gallery.innerHTML = '';
}
