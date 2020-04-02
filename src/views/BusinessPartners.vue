<template id ="bpmaster-main-page">
  <v-ons-page>
    <v-ons-toolar>
      <div class="center">
        비즈니스파트너
      </div>
    </v-ons-toolar>
    <div v-if="bpmasters" >
      <v-ons-card v-for="bpmaster of bpmasters" :key="bpmaster.CardCode"
      @click="bpMasterDetail(bpmaster.CardCode)"
      >
        <div class="title">{{bpmaster.CardCode}}</div>
        <div class="content">{{bpmaster.CardName}}</div>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.withCredentials = true; 
var tempArr = [];

export default {
  name: 'BusinessParters',
  data: function(){
    return{
      bpmasters : [
        {
          CardCode:'',
          CardName:''
        }
      ]
    }
  },
  mounted: function(){
      const vm = this;
      axios.get('https://devhana.c4mix.com:50000/b1s/v1/BusinessPartners' ,{
      params:{
        $select: `CardCode,CardName`,
        $orderby: `CardCode`,
        $top:`20`
      },
      paramsSerializer: (params) =>{
        let result = '';
        Object.keys(params).forEach(key => {
            result += `${key}=${encodeURIComponent(params[key])}&`;
        });
        return result.substr(0, result.length - 1);
      }
    })
      .then(function (response){
        tempArr = response.data.value;
        vm.bpmasters = tempArr;
        console.log(vm.bpmasters);
        
      })
      .catch(function(error){
        alert('에러입니다. ' + error);
      })
  },
  methods:{
    bpMasterDetail: function(CardCode){
      this.$router.push('/BusinessPartners/' + CardCode);
    }
  }
}
</script>
