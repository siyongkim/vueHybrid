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
      <v-ons-list-item>
        <div class="left">전기일</div>
        <v-ons-input 
          placeholder="전기일"
          v-model="deliveryNote.DocDate"></v-ons-input>
      </v-ons-list-item>
      <v-ons-list-item>
        <div class="left">문서유형</div>
        <v-ons-select style="width: 40%"
            v-model="deliveryNote.DocType"
          >
            <option v-for="docType in docTypeList" :value="docType.value" :key="docType.value">
              {{ docType.text }}
            </option>
          </v-ons-select>
      </v-ons-list-item>
    </v-ons-lsit>
    <v-ons-list>
      <v-ons-list-header>내용</v-ons-list-header>
      <v-ons-list-item v-for="lines of deliveryNote.DocumentLines" :key="lines.LineNum">
        <!-- <v-ons-button v-if="deliveryNote.length === lines.LineNum" @click="addItemRow()">행추가</v-ons-button> -->
        <v-ons-button  @click="addItemRow()">행추가</v-ons-button> <v-ons-icon icon="md-zoom-in" @click="modalVisible2 = true"></v-ons-icon>
        <v-ons-input  placeholder="품목코드" v-model="lines.ItemCode"></v-ons-input>
        <v-ons-input  placeholder="품목명" v-model="lines.ItemName"></v-ons-input>
        <v-ons-input  placeholder="수량" v-model="lines.Quantity"></v-ons-input>
        <v-ons-input  placeholder="가격" v-model="lines.Price"></v-ons-input>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-modal :visible="modalVisible" >
      <div v-if="cardCodeList">
        <v-ons-list v-for="bpitem of cardCodeList" :key="bpitem.CardCode"
        @click="setCardCodes(bpitem.CardCode, bpitem.CardName)">
          <v-ons-list-item>
            <div class="left">{{bpitem.CardCode}}</div>
            <div class="center">{{bpitem.CardName}}</div>
            <div class="center">{{bpitem.VATRegNum}}</div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-modal>

    <v-ons-modal :visible="modalVisible2" >
      <div v-if="ItemList">
        <v-ons-list v-for="item of ItemList" :key="item.ItemCode"
        @click="setItemCodes(item.ItemCode, item.ItemName)">
          <v-ons-list-item>
            <div class="left">{{item.ItemCode}}</div>
            <div class="center">{{item.ItemName}}</div>
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
        BPL_IDAssignedToInvoice: "",
        DocDate: "",
        DocType: "",
        DocumentLines:[
          {
            LineNum: 1,
            ItemCode:"",
            ItemName:"",
            Quantity:0,
            Price:0
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
      ItemList:[
        {
          ItemCode:"",
          ItemName:""
        }
      ],
      modalVisible: false,
      modalVisible2: false,
      docTypeList:[
        {text : '', value: ''},
        {text : '아이템', value: 'dDocument_Items'},
        {text : '서비스', value: 'dDocument_Service'}
      ]
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
      });

      axios.get('https://devhana.c4mix.com:50000/b1s/v1/Items', {
      params:{
        $select: `ItemCode,ItemName`,
        $filter: `Frozen eq 'N'`,
        $orderby: `ItemCode`
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
        vm.ItemList = response.data.value;
        console.log(vm.ItemList);
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
    },
    addItemRow: function(){
      this.deliveryNote.DocumentLines.push(
        {
            LineNum: this.deliveryNote.DocumentLines.length + 1,
            ItemCode:"",
            ItemName:"",
            Quantity:0,
            Price:0
          }
      )
    }
  }
}
</script>
