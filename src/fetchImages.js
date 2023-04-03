import axios from "axios";



export default class ImagesApiService {
  constructor () {
    this.searchQuery = '';
    this.page = 1;
  };

  async fetchImages() {
    console.log('Before fetch', this)
    const BASE_URL = `https://pixabay.com/api/`;
    const API_KEY = `34942352-0200edd486f0f1b00fc000a19`;
    
    const searchParams = new URLSearchParams ({
    
    key: API_KEY,
    q: this.searchQuery,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: this.page,
    per_page: 40,
    
    
    
    })
        try {
          const response = await axios.get(`${BASE_URL}?${searchParams}`);
          this.page += 1;
          console.log('After fetch', response.data.hits)
          return response.data.hits;
    
        } catch (error) {
          console.error(error);
        }
      }

      resetPage() {
        this.page = 1;
      }

    get query () {
      return this.searchQuery;
    }

    set query (newQuery) {
      return this.searchQuery = newQuery;
    }
}

// export default async function fetchImages(searchQuery) {

// const BASE_URL = `https://pixabay.com/api/`;
// const API_KEY = `34942352-0200edd486f0f1b00fc000a19`;

// const searchParams = new URLSearchParams ({

// key: API_KEY,
// q: searchQuery,
// image_type: "photo",
// orientation: "horizontal",
// safesearch: true,



// })
//     try {
//       const response = await axios.get(`${BASE_URL}?${searchParams}`);
//       return response;

//     } catch (error) {
//       console.error(error);
//     }
//   }