<template>
<div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <input v-model="artist" placeholder="Artist">
      <input v-model="duration" placeholder="Duration">
      <button @click="addSong">Add Song</button>
    </div>
    <table v-if="justAdded">
      <tr class="media">
        <th>Title</th>
        <th>Artist</th>
        <th>Duration</th>
      </tr>
      <tr class="media">
        <td>{{justAdded.title}}</td>
        <td>{{justAdded.artist}}</td>
        <td>{{justAdded.duration}}</td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SongView',
  data() {
    return {
      title: "",
      artist: "",
      duration: "",
      justAdded: null,
      songs: [],
    }
  },
  methods: {
    async addSong() {
      try {
        let added = await axios.post('/api/songs', {
          title: this.title,
          artist: this.artist,
          duration: this.duration,
        });
        this.justAdded = added.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
table {
  margin: auto;
  width: 60%;
}
th, tr {
  width: 20%;
}

</style>
