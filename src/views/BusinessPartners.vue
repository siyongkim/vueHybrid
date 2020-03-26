<template id ="bpmaster-main-page">
  <v-ons-page>
    <v-ons-toolar>
      <div class="center">
        비즈니스파트너
      </div>
    </v-ons-toolar>
    <v-ons-card v-for="bpmaster of bpmasters" :key="bpmaster.CardCode"
    @click="bpMasterDetail(bpmaster.CardCode)"
    >
      <div class="title">{{bpmaster.CardCode}}</div>
      <div class="content">{{bpmaster.CardName}}</div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'BusinessParters',
  created: function(){
    this.bpmasters.pop();
    this.bpmasters.push(
      {
        CardCode:'A1010', CardName:'테스트BP1'
      },
      {
        CardCode:'B1010', CardName:'테스트BP2'
      },
      {
        CardCode:'C1010', CardName:'테스트BP3'
      },
      {
        CardCode:'D1010', CardName:'테스트BP4'
      },
      {
        CardCode:'E1010', CardName:'테스트BP5'
      }
    );
  },
  data() {
    return {
      bpmasters: [
        {
          CardCode: '',
          CardName: ''
        }
      ]
    }
  },
  methods:{
    bpMasterDetail: function(CardCode){
      this.$router.push('/BusinessPartners/' + CardCode);
    }
  }
}
</script>
