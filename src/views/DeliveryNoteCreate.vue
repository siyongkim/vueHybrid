<template id ="deliverynote-create-page">
  <v-ons-page>
    <v-ons-toolar>
      <div class="center">
        납품 문서 생성
      </div>
    </v-ons-toolar>
    <v-ons-lsit>
      <v-ons-list-item>
        <div class="left">거래처코드</div>
        <label class="center">
          <v-ons-input float maxlength="15"
            placeholder="거래처코드"
            v-model="deliveryNote.CardCode">
          </v-ons-input>
          <v-ons-icon icon="md-zoom-in" @click="modalVisible = true"></v-ons-icon>
        </label>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">거래처명</div>
        <label class="center">
          <v-ons-input float maxlength="15"
            placeholder="거래처명"
            v-model="deliveryNote.CardName">
          </v-ons-input>
        </label>
      </v-ons-list-item>
    </v-ons-lsit>

    <v-ons-modal :visible="modalVisible" >
      <div v-if="cardCodeList">
        <v-ons-list v-for="bpitem of cardCodeList" :key="bpitem.CardCode"
        @click="setCardCodes(bpitem.CardCode, bpitem.CardName)">
          <v-ons-list-item>
            <div class="left">{{bpitem.CardCode}}</div>
            <div class="center">{{bpitem.CardName}}</div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-modal>
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
      deliveryNote:{
        CardCode: "",
        CardName: "",
        BPLICode: "",
        DocDate: "",
        DocDueDate:"",
        DocumentLines:[
          {
            ItemCode:"",
            ItemName:"",
            Quantity:0,
            UnitPrice:0
          }
        ]
      },
      cardCodeList:[
        {
          CardCode:"",
          CardName:"",
          VATRegNum:""
        }
      ],
      modalVisible: false
    }
  },
  created: function(){
    const vm = this;
    axios.get('https://devhana.c4mix.com:50000/b1s/v1/BusinessPartners', {
      params:{
        $select: `CardCode,CardName,VATRegistrationNumber`,
        $filter: `CardType eq 'C' and Frozen eq 'N'`,
        $orderby: `CardCode`
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
        vm.cardCodeList = response.data.value;
        console.log(vm.cardCodeList);
      })
      .catch(function(error){
        alert('에러입니다. ' + error);
      })
  },
  methods: {
    addDeliveryNote: function(){
      const vm = this;
      axios.post('https://devhana.c4mix.com:50000/b1s/v1/DeliveryNotes', vm.deliveryNote
      )
      .then(function (response){
        alert("문서가 추가되었습니다.");
        vm.$router.push('/DeliveryNoteDetail/' + response.data.value.DocEntry);
      })
      .catch(function(error){
        alert('에러입니다. ' + error);
      })
    },
    setCardCodes: function(code, name){
      this.deliveryNote.CardCode = code;
      this.deliveryNote.CardName = name;
      this.modalVisible = false;
    }
  }
}
</script>
