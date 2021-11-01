import http from '../http-common.js';

class TutorialDataService{
    getAll() {
        return http.get("/tutorials");
    }

    get(id) {
        return http.get(`/tutorials/${id}`);
    }

    create(data){
        return http.post("/tutorials", data);
    }
}
