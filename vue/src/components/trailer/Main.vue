<template>
  <div v-if="isLoading" class="loader"></div>
  <div v-else-if="youTubeId == null" class="gof-alert-container">
    <div class="gof-alert">
      No trailer for this movie!
      <button class="btn" @click="$emit('close')">Ok</button>
    </div>
  </div>
  <iframe
    v-else
    :title="youTubeId"
    :width="innerWidth"
    :height="innerHeight"
    :src="'https://www.youtube.com/embed/' + youTubeId"
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  />
</template>

<script>
import { movieDbService } from "../../services/movieDbService";

export default {
  props: {
    movie: {
      type: Object,
      requierd: true
    }
  },
  data() {
    return {
      isLoading: true,
      youTubeId: ""
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    innerWidth() {
      return window.innerWidth / 2;
    },
    innerHeight() {
      return window.innerHeight / 2;
    }
  },
  methods: {
    loadData() {
      movieDbService.getMovieTrailers(this.movie.id).then(response => {
        this.youTubeId = response.data.results[0]
          ? response.data.results[0].key
          : null;
        this.isLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scopped>
.gof-alert-container {
  color: white;
  mat-dialog-container {
    padding: 0;
  }
  .gof-alert {
    display: flex;
    flex-direction: column;
    text-align: center;
    min-width: 320px;
    min-height: 130px;
    padding: 20px;
    background-color: $modalBackground;
    button {
      background-color: $button;
      width: 50px;
      margin: auto auto 0;
    }
  }
}
</style>