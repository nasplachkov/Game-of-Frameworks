import FireBaseService from './base';
import { dispatch, setFavorites } from '../store';

class MoviesService extends FireBaseService {
  getFavorites() {
    return this
      .getUserId()
      .then(userId => {
        return this.client.get(`/favorites/${userId}.json`).then(
          (response) => dispatch(setFavorites(response.data || {}))
        );
      });
  }

  addToFavorites(movie) {
    return this
      .getUserId()
      .then(userId => {
        return this.client.put(`/favorites/${userId}/${movie.id}.json`, movie);
      });
  }

  removeFromFavorites(movie) {
    return this
      .getUserId()
      .then(userId => {
        return this.client.delete(`/favorites/${userId}/${movie.id}.json`);
      });
  }

  editFavoriteMovie(movieId, editedData) {
    return this
      .getUserId()
      .then(userId => {
        return this.client.patch(`/favorites/${userId}/${movieId}.json`, editedData);
      });
  }
}

export default new MoviesService();
