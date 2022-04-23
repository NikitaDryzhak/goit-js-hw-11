import axios from "axios";

 const BASE_URL = "https://pixabay.com/api/";
    const KEY_API = "26913432-f00ec335ce5fc82565c3f9d16";
    const options = "image_type=photo&orientation=horizontal&safesearch=true&per_page=40";

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async apiFetch() {
   
    const url = `${BASE_URL}?key=${KEY_API}&q=${this.searchQuery}&${options}&page=${this.page}`
        this.incrementPage();
        return await axios.get(url)
            .then(data => {
                return data.data
                  
        })

    }

    get query() {
        return this.searchQuery;
}

    set query(newQuery) {
        this.searchQuery = newQuery;
}

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }


}