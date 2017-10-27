<template>
  <div class="menu">
    <div class="container container--small">
      <div v-if="menu.links" class="row">
        <div v-for="item in menu.links" :class="item.size">
          <menu-item :link="item"></menu-item>
        </div>
      </div>
      <div v-else>
        <p>Takie menu nie istnieje...</p>
      </div>
      <div class="menu__player animated bounceInUp">
        <img :src="player">
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from './helpers/MenuItem'

export default {
  name: 'menu',
  props: ["menuId"],
  data () {
    return {
      menus: [
        { id: "main", links: [
          { path: '', title: 'Single match', image: '/static/img/menus/main/single.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Online', image: '/static/img/menus/main/online.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: 'Manager', title: 'MyLeague', image: '/static/img/menus/main/myleague.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Champions League', image: '/static/img/menus/main/UCL.png', size: 'col-3 col-md-6 col-sm-12' },
          { path: '', title: 'Europa League', image: '/static/img/menus/main/EL.png', size: 'col-3 col-md-6 col-sm-12' },
          { path: '', title: 'Career', image: '/static/img/menus/main/career.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: 'Edit', title: 'edit', image: '/static/img/menus/main/edit.png', size: 'col-3 col-md-6 col-sm-12' },
          { path: '', title: 'Settings', image: '/static/img/menus/main/settings.png', size: 'col-3 col-md-6 col-sm-12' },
        ]},
        { id: "managerInfo", links: [
          { path: '', title: 'My career', image: '/static/img/menus/manager/info/mycareer.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Calendar', image: '/static/img/menus/manager/info/calendar.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: 'clubs', title: 'Clubs', image: '/static/img/menus/manager/info/clubs.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'National teams', image: '/static/img/menus/manager/info/nations.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Rules', image: '/static/img/menus/manager/info/rules.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Tournaments', image: '/static/img/menus/manager/info/tournaments.png', size: 'col-3 col-md-6 col-sm-12' },
          { path: '', title: 'Contests', image: '/static/img/menus/manager/info/contests.png', size: 'col-3 col-md-6 col-sm-12' },
        ]},
        { id: "managerLeagues", links: [
          { path: 'clubs/league/1', title: 'English League', image: '/static/img/menus/leagues/english.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Spanish league', image: '/static/img/menus/leagues/spanish.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'German league', image: '/static/img/menus/leagues/german.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Brazilian league', image: '/static/img/menus/leagues/brazilian.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Italian league', image: '/static/img/menus/leagues/italian.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'French league', image: '/static/img/menus/leagues/french.png', size: 'col-3 col-md-6 col-sm-12' },
          { path: '', title: 'Polish league', image: '/static/img/menus/leagues/polish.png', size: 'col-3 col-md-6 col-sm-12' },
        ]},
        { id: "edit", links: [
          { path: 'player/new', title: 'New player', image: '/static/img/menus/main/single.png', size: 'col-6 col-md-6 col-sm-12' },
          { path: '', title: 'Online', image: '/static/img/menus/main/online.png', size: 'col-6 col-md-6 col-sm-12' },
        ]}
      ],
      menu: {},
      player: '/static/img/menus/player-'+Math.floor(Math.random()*3)+'.png'
    }
  },
  created: function () {;
    this.menu = this.menus.filter((item) => item.id === this.menuId)[0] || {}
  },
  components: {
    'menu-item': MenuItem
  },
  watch: {
     menuId: function (menuIdChanged) {
       this.menu = this.menus.filter((item) => item.id === menuIdChanged)[0] || {}
     }
   },
}
</script>

<style scoped>
.menu__player {
  position: absolute;
  top: 0px;
  right: 0px;
  pointer-events: none;
}

@media (max-width: 768px) {
  .menu__player {
    display: none;
  }
}
</style>
