<template id ="Login-page">
  <v-ons-page>
    <img alt="Vue logo" src="../assets/sapb1_logo.png">
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
    <!-- <v-ons-button @click="LoginSL" modifier="cta" style="margin: 6px 0" >Login</v-ons-button> -->
    <v-ons-button @click="successLogin" modifier="cta" style="margin: 6px 0" >Login</v-ons-button>
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
          axios.post('https://nrhana.c4mix.com:50000/b1s/v1/Login', {
            CompanyDB: 'NR_TEST5',
            UserName: this.name,
            Password: this.pw
          })
          .then(function (response){
            alert(response);
            console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
        },
        successLogin : function(){
          this.$router.push('Menus')
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
