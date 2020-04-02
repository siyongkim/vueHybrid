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
      <v-ons-list-item >
        <div class="left">고객명</div>
        <div class="title">{{this.bpMasterDetail.CardName}}</div>
      </v-ons-list-item>
      <v-ons-list-item >
        <div class="left">고객타입</div>
        <div class="title">{{this.bpMasterDetail.CardType}}</div>
      </v-ons-list-item>
      <v-ons-list-item >
        <div class="left">그룹코드</div>
        <div class="title">{{this.bpMasterDetail.GroupCode}}</div>
      </v-ons-list-item>
      <v-ons-list-item >
        <div class="left">주소</div>
        <div class="title">{{this.bpMasterDetail.Address}}</div>
      </v-ons-list-item>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.withCredentials = true;



export default {
  name: 'Detail',
  data: function(){
    return{
      bpMasterDetail: {
        CardCode:"",
        CardName:"",
        CardType:"",
        GroupCode:"",
        Address:""
      }
    }
  },
  mounted: function(){
    const vm = this;
    axios.get('https://devhana.c4mix.com:50000/b1s/v1/BusinessPartners(\'' + this.$route.params.CardCode+ '\')')
    .then(function (response){
      vm.bpMasterDetail = response.data;
    })
    .catch(function(error){
      alert('에러입니다. ' + error);
    })
    console.log(this.bpMasterDetail);
  }
}
</script>
