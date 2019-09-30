<template>
  <div class="row movie-item">
    <div class="col s12 m5 l3">
      <img class="movie-item-poster" :src="getPosterUrl" />
    </div>
    <div class="col s12 m7 l9 movie-item-details">
      <div class="row">
        <div class="col s12 movie-item-title">
          <b>{{movieData.title}} {{year ? `(${year})` : null}}</b>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b>Plot:</b>
          {{movieData.overview}}
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b>Genre:</b>
          {{genres}}
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b>Rating:</b>
          {{movieData.vote_average}} ({{movieData.vote_count}} votes)
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b>Personal Rating:</b>
          <Rаting :disabled="true" :stars="rating" :key="rating" />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b>Personal Review:</b>
          {{movieData.userReview || '- - -'}}
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button
            class="btn btn-primary waves-effect waves-light margin-button-right"
            @click="toggleFavorite"
          >
            <i v-if="isFavorite" class="material-icons red-text">favorite</i>
            <i v-else class="material-icons">favorite_border</i>
            {{!isFavorite ? 'Add to' : 'Remove from'}}  Favorites
          </button>
          <button
            class="btn btn-primary waves-effect waves-light"
            @click="openTrailer"
          >
            <i class="material-icons">play_arrow</i>
            Watch Trailer
          </button>
        </div>
      </div>
    </div>
    <button
      v-show="isFavorite"
      class="btn-floating btn-large waves-effect waves-light dropdown-menu dropdown-trigger"
      :data-target="'dropdown-' + movieData.id"
      :ref="movieData.id"
    >
      <i class="material-icons dark-text">more_vert</i>
    </button>
    <ul :id="'dropdown-' + movieData.id" class="dropdown-content">
      <li>
        <a class="modal-trigger" @click="toggleModal">
          <i class="material-icons dark-text">mode_edit</i> Add Review
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import FunctionUtils from "../../mixins/function-util";

import { mapGetters, mapActions } from "vuex";

import { EventBus } from "../../event-bus/event-bus";
import { movieService } from "../../services/movieService";

import Trailer from "../trailer/Main";
import Details from "../details/Main";

import Rаting from "../rating/Main";

export default {
  mixins: [FunctionUtils],
  props: {
    movie: {
      type: Object,
      requiered: true
    },
    genres: {
      type: String,
      requiered: true
    },
    isFavorite: {
      type: Boolean,
      requiered: true
    }
  },
  mounted() {
    if (this.isFavorite) {
      const element = document.querySelectorAll(
        `[data-target="dropdown-${this.movie.id}"]`
      );
      window.M.Dropdown.init(element, { constrainWidth: false });
    }
  },
  computed: {
    ...mapGetters({
      favoriteById: "getFavoriteById"
    }),
    year() {
      return this.movie.release_date
        ? this.movie.release_date.split("-")[0]
        : "";
    },
    getPosterUrl() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : `/blank-image.png`;
    },
    movieData() {
      if (this.isFavorite) {
        return this.favoriteById(this.movie.id);
      } else {
        return this.movie;
      }
    },
    rating() {
      return this.movieData.userRating ? this.movieData.userRating : 0;
    }
  },
  methods: {
    ...mapActions(["setFavorites"]),
    toggleFavorite() {
      if (!this.isFavorite) {
        movieService
          .addToFavorite(this.$store.getters.getUserId, this.movie)
          .then(() => {
            movieService
              .getFavorites(this.$store.getters.getUserId)
              .then(response => {
                this.setFavorites(response.data);
              });
          });
      } else {
        movieService
          .deleteToFavorite(this.$store.getters.getUserId, this.movie)
          .then(() => {
            movieService
              .getFavorites(this.$store.getters.getUserId)
              .then(response => {
                this.setFavorites(response.data);
              });
          });
      }
    },
    openTrailer() {
      EventBus.$emit("ShowModal", {
        component: Trailer,
        properties: {
          movie: this.movieData
        }
      });
    },
    toggleModal() {
      EventBus.$emit("ShowModal", {
        component: Details,
        properties: {
          movie: this.movieData,
          genres: this.genres
        }
      });
    }
  },
  watch: {
    isFavorite() {
      const element = document.querySelectorAll(
        `[data-target="dropdown-${this.movie.id}"]`
      );
      window.M.Dropdown.init(element, { constrainWidth: false });
    }
  },
  components: {
    Rаting
  }
};
</script>

<style>
</style>