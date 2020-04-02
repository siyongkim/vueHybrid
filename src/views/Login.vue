<template id ="Login-page">
  <v-ons-page>
    <v-ons-card >
      <div class="center">
        <img alt="Vue logo" src="../assets/sapb1_logo.png">
      </div>
    </v-ons-card>
    <v-ons-list>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="Input your ID" float
          v-model="name"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
    <v-ons-list-item>
      <div class="center">
        <v-ons-input placeholder="Input your PW" float type="password"
          v-model="pw"
        >
        </v-ons-input>
      </div>
    </v-ons-list-item>
  </v-ons-list>
  <section style="margin: 16px">
    <v-ons-button @click="LoginSL" modifier="cta" style="margin: 6px 0" >Login</v-ons-button>
  </section>
  </v-ons-page>
</template>

<script>
// @ is an alias to /src
// import Login from '@/components/Login.vue'
var axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  name: 'Login',
  methods: {
        LoginSL : function(){
          const vm = this;
          axios.post('https://devhana.c4mix.com:50000/b1s/v1/Login', {
            CompanyDB: 'TECH_BBC',
            UserName: this.name,
            Password: this.pw
          },
          {withCredentials: true})
          .then(function (){
            // vm.$cookies.set('B1SESSIONID', response.data.SessionId);
            vm.$cookies.set('CompanyDB', 'TECH_BBC');
            vm.$cookies.set('ROUTEID', '.node0');
            // document.cookie.concat(";ROUTEID=.node1");
            vm.$router.push('Menus');
          })
          .catch(function(error){
            alert('에러입니다. ' + error);
          })
        }
      },
  data() {
    return {
      name: '',
      pw:''
    }
  }
}
</script>
