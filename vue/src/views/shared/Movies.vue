<template>
  <div class="container">
    <div class="row header">
      <div class="col s12 m6">
        <div class="logo-white simple" :style="logoStyle">
          <LogoWhite />
        </div>
      </div>
      <div class="col s12 m6 l4 push-l2">
        <Input name="Search" v-model="search" />
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <label class="right">
          <input type="checkbox" v-model="onlyFavorites" />
          <span>Show Favorites</span>
        </label>
      </div>
    </div>
    <div v-if="!Object.keys(favoriteList).length && onlyFavorites" class="row">
      <div class="center">
        <Header class="title" name>You have no favorite movies yet.</Header>
      </div>
    </div>
    <div v-if="!Object.keys(movieResult).length && !onlyFavorites" class="row">
      <div class="center">
        <Header class="title" name>Use the search on the top-right to find movies</Header>
      </div>
    </div>
    <movie-card
      v-for="(movie,index) in movieList"
      :key="index"
      :movie="movie"
      :genres="listGenres(movie.genre_ids)"
      :isFavorite="isFavorite(movie.id)"
    ></movie-card>
  </div>
</template>

<script>
import FunctionUtils from "../../mixins/function-util";

import { mapGetters, mapActions } from "vuex";

import { movieDbService } from "../../services/movieDbService";
import { movieService } from "../../services/movieService";

import LogoWhite from "../../components/images/LogoWhite";
import Input from "../../components/shared/Input";
import Header from "../../components/shared/Header";

import MovieCard from "../../components/cards/MovieCard";

export default {
  mixins: [FunctionUtils],
  data() {
    return {
      search: "",
      onlyFavorites: true
    };
  },
  created() {
    this.initLoad();
    this.loadData();
  },
  computed: {
    ...mapGetters({
      favoriteList: "getFavorites",
      movieResult: "getMovies",
      genres: "getGenres"
    }),
    logoStyle() {
      return {
        width: "206px",
        height: "63px"
      };
    },
    movieList() {
      return this.onlyFavorites ? this.favoriteList : this.movieResult;
    }
  },
  methods: {
    ...mapActions([
      "setGenres",
      "setFavorites",
      "setMovies",
      "setOnlyFavorites"
    ]),
    initLoad() {
      movieDbService.getGenres();
    },
    loadData() {
      movieService
        .getFavorites(this.$store.getters.getUserId)
        .then(response => {
          this.setFavorites(response.data);
          this.onlyFavorites = this.$store.getters.getOnlyFavorites;
        });
    },
    isFavorite(movieId) {
      return this.favoriteList
        ? this.favoriteList.hasOwnProperty(movieId)
        : false;
    },
    listGenres(genreIds) {
      if (!genreIds && !Array.isArray(genreIds)) {
        return "N/A";
      }
      return genreIds
        .map(id => (this.genres[id] ? this.genres[id].name : null))
        .filter(genre => genre)
        .join(", ");
    }
  },
  watch: {
    search() {
      this.onlyFavorites = this.$store.getters.getOnlyFavorites;

      this.debounce(
        movieDbService.searchByName(this.search).then(response => {
          this.setOnlyFavorites(false);
          this.setMovies(response.data.results);
        }),
        500
      );
    },
    onlyFavorites(value) {
      this.setOnlyFavorites(value);
    }
  },

  components: {
    LogoWhite,
    Input,
    MovieCard,
    Header
  }
};
</script>

<style>
</style>