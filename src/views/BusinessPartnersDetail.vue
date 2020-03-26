<template id ="bpmaster-detail-page">
  <v-ons-page>
    <v-ons-toolar>
      <div class="center">
        비즈니스파트너 상세 ({{this.$route.params.CardCode}})
      </div>
    </v-ons-toolar>
    <v-ons-card >
      <v-ons-list-item >
        <div class="left">고객코드</div>
        <div class="title">{{this.$route.params.CardCode}}</div>
      </v-ons-list-item>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'Detail',
  created: function(){
      this.bpMaster = {
          CardCode : this.$route.params.CardCode,
          CardName: ''
      }
  },
  data() {
    return {
      bpMaster: [
        {
          CardCode: '',
          CardName: ''
        }
      ]
    }
  }
}
</script>
