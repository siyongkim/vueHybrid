<template id ="menu-page">
  <v-ons-page>
    <v-ons-card v-for="page of pages" :key="page.Name"
    @click="pageNavigation(page.name)"
    >
      <div class="title">{{page.title}}</div>
      <div class="content">{{page.desc}}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'Menus',
  data() {
    return {
      pages: [
        {
          name: 'BusinessPartners',
          title: '비즈니스파트너 마스터',
          desc: '비즈니스파트너 마스터 데이터를 조회하고 관리합니다.'
        },
        {
          name: 'Delivery Note',
          title: '납품',
          desc: 'SAP 납품문서를 조회하고 등록합니다.'
        },
        {
          name: 'A/R Invoice',
          title: 'AR송장',
          desc: 'SAP AR송장을 조회하고 등록합니다.'
        }
      ]
    }
  },
  methods:{
    pageNavigation: function(pageName){
      this.$router.push(pageName);
    }
  }
}
</script>
