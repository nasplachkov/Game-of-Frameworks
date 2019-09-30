<template>
  <div class="movie-item">
    <transition name="zoom" appear>
      <div :id="'modal-' + movie.id" class="modal movie-modal open" :style="modalSyleObject">
        <div class="modal-content">
          <div class="row">
            <div class="col s12 m5 l3">
              <img class="movie-item-poster" :src="getPosterUrl" alt />
            </div>
            <div class="col s12 m7 l9 movie-item-details">
              <div class="row">
                <div class="col s12 movie-item-title">
                  <b>{{movie.title}}</b>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <b>Plot:</b>
                  {{movie.overview}}
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
                  {{movie.vote_average}} ({{movie.vote_count}} votes)
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <b>Personal Rating:</b>
                  <Rаting
                    :disabled="false"
                    :stars="movie.userRating ? movie.userRating : 0"
                    @click="addUserRating"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                  <b>Write a review</b>
                  <textarea rows="6" placeholder="Type here..." v-model="reviewContent" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col s12 right-align">
              <button
                @click="addReview"
                class="btn btn-primary waves-effect waves-light margin-button-right"
              >Submit</button>
              <button @click="close" class="btn btn-primary waves-effect waves-light">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { movieService } from "../../services/movieService";

import Rаting from "../rating/Main";

export default {
  props: {
    movie: {
      type: Object
    },
    genres: {
      type: String
    }
  },
  data() {
    return {
      reviewContent: this.movie.userReview
    };
  },
  computed: {
    getPosterUrl() {
      return this.movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`
        : `/blank-image.png`;
    },
    modalSyleObject() {
      return {
        display: "block"
      };
    }
  },
  methods: {
    ...mapActions(["setFavorites"]),
    addReview() {
      movieService
        .addReview(this.$store.getters.getUserId, this.movie.id, {
          userReview: this.reviewContent,
          userRating: this.movie.userRating
        })
        .then(() => {
          movieService
            .getFavorites(this.$store.getters.getUserId)
            .then(response => {
              this.setFavorites(response.data);
            });
          this.$emit("close");
        });
    },
    addUserRating(value) {
      this.movie.userRating = value;
    },
    close() {
      this.$emit("close");
    }
  },
  components: {
    Rаting
  }
};
</script>
<style lang="scss" scoped>
.movie-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: transparent;
}
</style>