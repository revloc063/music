<template>
<div>
  <table class="add" style="width:100%;">
    <tr class="form">
      <td><input v-model="title" placeholder="Title"></td>
      <td><textarea v-model="description" placeholder="Description"></textarea></td>
      <td><button @click="addPlaylist">Add Playlist</button></td>
    </tr>
  </table>
  <br />
  <table class="listGallery">
    <tr class="list" v-for="playlist in playlists" :key='playlist.id'>
      <td>
        <table class="onePlaylist">
          <tr>
            <td colspan="3"><hr/></td>
          </tr>
          <tr>
            <th>{{playlist.title}}</th>
            <td>{{playlist.description}}</td>
            <td class="actions">
              <button @click="deletePlaylist(playlist)">Delete Playlist</button>
            </td>
          </tr>
          <tr v-if="playlist.songs.length == 0">
            <td class="three" colspan="3"><em>Playlist Empty</em></td>
          </tr>
          <tr v-else>
            <td class="three" colspan="3">
              <table style="width:100%;">
                <tr class="media" v-for="(song, index) in playlist.songs" :key="song.id">
                  <th>{{index + 1}}</th>
                  <td>{{song.title}}</td>
                  <td>{{song.artist}}</td>
                  <td>{{song.duration}}</td>
                  <td class="actions">
                    <button @click="deleteFromPlaylist(song, playlist)">Delete Song From {{playlist.title}}</button>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <hr />
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'PlaylistView',
  data() {
    return {
      title: "",
      description: "",
      playlists: [],
    }
  },
  created() {
    this.getPlaylists();
  },
  methods: {
    async getPlaylists() {
      try {
        let response = await axios.get('api/playlists');
        this.playlists = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addPlaylist() {
      try {
        await axios.post('/api/playlists', {
          title: this.title,
          description: this.description,
          songs: [],
        });
        this.getPlaylists();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePlaylist(playlist) {
      try {
        await axios.delete("/api/playlists/" + playlist._id);
        this.getPlaylists();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFromPlaylist(song, playlist) {
      try {
        await axios.put("/api/playlists/delete/" + playlist._id, {
          songId: song._id,
        });
        this.getPlaylists();
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
  table-layout: fixed;
}
.listGallery {
  margin: auto;
}
.onePlaylist {
  width: 100%;
}
.onePlaylist.table {
  table-layout: fixed;
}

button {
  padding: 0px 20px;
}

</style>
