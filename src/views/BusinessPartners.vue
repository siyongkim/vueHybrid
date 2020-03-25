<template id ="bpmaster-main-page">
  <v-ons-page>
  <v-ons-toolar>
  </v-ons-toolar>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'BusinessParters',
  data() {
    return {
      pages: [
        {
          name: 'BusinessPartners',
          title: '비즈니스파트너 마스터',
          desc: '비즈니스파트너 마스터 데이터를 조회하고 관리합니다.'
        },
        {
          name: 'SalesOrders',
          title: '판매오더',
          desc: 'SAP 판매오더문서를 조회하고 등록합니다.'
        },
        {
          name: 'Journal Entries',
          title: '분개',
          desc: 'SAP 분개를 조회하고 등록합니다.'
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
