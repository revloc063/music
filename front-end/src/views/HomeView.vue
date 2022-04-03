<template>
<div class="home">
  <table class="media-gallery">
    <tr class="media">
      <th>Title</th>
      <th>Artist</th>
      <th>Duration</th>
      <th>Delete</th>
      <th>Playlist</th>
    </tr>
    <tr class="media" v-for="song in songs" :key="song.id">
      <td class="subitem">{{song.title}}</td>
      <td class="subitem">{{song.artist}}</td>
      <td class="subitem">{{song.duration}}</td>
      <td><button class="button" @click="deleteSong(song)">Delete Song</button></td>
      <td v-if="playlists.length == 0">No Playlists To Add To</td>
      <td v-else class="subitem">
        <div v-for="playlist in playlists" :key="playlist.id">
          <button @click="addToPlaylist(song, playlist)">Add to {{playlist.title}}</button>
        </div>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'HomeView',
  data() {
    return {
      songs: [],
      findSong: null,
      playlists: [],
    }
  },
  created() {
    this.getSongs();
    this.getPlaylists();
  },
  methods: {
    async getSongs() {
      try {
        let response = await axios.get('api/songs');
        this.songs = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getPlaylists() {
      try {
        let response = await axios.get('api/playlists');
        this.playlists = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteSong(song) {
      try {
        await axios.delete("/api/songs/" + song._id);
        this.getSongs();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addToPlaylist(song, playlist) {
      try {
        await axios.put("/api/playlists/add/" + playlist._id, {
          songId: song._id,
        });
        return true;
      } catch (error){
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
button {
  padding: 0px 20px;
  margin: 2px;
}

</style>
