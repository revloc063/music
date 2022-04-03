<template>
<div id="app">
  <div class="header">
    <nav>
      <router-link to="/">Song Gallery</router-link> |
      <router-link to="/song">Create Songs</router-link> |
      <router-link to="/playlist">View Playlists</router-link>
    </nav>
  </div>
  <div class="content">
    <router-view/>
  </div>
  <div class="footer">
    <p><a href="https://github.com/revloc063/music.git" target="_blank">GitHub Repository</a></p>
  </div>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
