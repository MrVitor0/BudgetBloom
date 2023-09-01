<template>
    <!-- ADD NEW INVESTMENT AREA --> 
    <div class="mt-1">
        <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
            <!-- START OVERVIEW AREA -->
            <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100 rounded-lg">
               <img src="@/assets/cardbg4.png" class="rounded- w-screen h-full  border-t border-gray-500 rounded-lg">
                <div class="relative flex flex-col flex-auto min-w-0 -mt-36 pt-12 md:pt-0 md:-mt-36 overflow-hidden break-words border-0  rounded-2xl bg-clip-border ">
                    <p class="pl-2 text-white text-5xl ">R$ {{ currentStatement }}</p>
                    <div class="flex">
                    <div class="flex flex-col">
                        <p class="pl-3 text-purple-200 text-2xl">Vitor Hugo</p>
                    </div>
                    <div class="flex flex-col ml-auto">
                        <p class="pl-3 mr-2 md:mr-6 text-purple-200 text-2xl capitalize">{{ currentMonth }}/23</p>
                    </div>
                    </div>
                </div>
            </div>
            <!-- ACCOUNT BALANCE -->
            <div class="w-full md:w-1/2 lg:w-1/3 md:mb-5 mb-2 md:ml-10">
                <div class="flex justify-center items-center bg-white rounded-lg shadow p-4 h-full">
                    <div class="flex flex-col items-center text-center mt-26">
                        <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                        <font-awesome-icon icon="basket-shopping" class="text-white text-5xl p-6" />
                        </div>
                        <div class="text-md text-gray-700 font-medium mt-2">
                            Adicionar nova compra
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                            Uma nova compra foi realizada? <br/> Cadastre e mantenha os valores atualizados!
                        </div>
                        <div class="w-64">
                            <BasicButton  @click="showModal(1)" active="true" text="Adicionar Compra" icon="cart-plus" />
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <!-- RECENT TRANSACTIONS -->
        <div class="w-full md:pl-1 px-2 flex-wrap">
            <div class="bg-white rounded-lg shadow py-4 h-full">
                <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3">
                    <div class="flex-start">
                        <p class="text-xl text-BBDark">Últimas Compras</p>
                    </div>
                    <div class="flex-end">
                        <font-awesome-icon title="View More" icon="fa-brands fa-pix" class="text-BBPurple text-2xl cursor-pointer pr-3" />
                    </div>
                </div>
                <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                <!-- ITEM -->
                <TransferItem
                    v-for="(item, index) in transferItems"
                    :key="index"
                    :name="item.name"
                    :method="item.method"
                    :type="item.type"
                    :date="item.date"
                    :value="item.value"
                />
            </div>
        </div>
       <!-- Modals-->
       <BBModal>
            <updateCurrentTravelValues  @updateStatement="updateStatement" v-if="this.currentModal == 1" />
        </BBModal>
     </div>
     <!-- PROFILE SETTINGS AREA -->
   </template>
   <script>
   import BasicButton from '@/components/button/BasicButton';
   import BBModal from '@/components/modal/BBModal.vue';
   import updateCurrentTravelValues from '@/components/modal/creditCards/updateCurrentTravelValues';
   import TransferItem from '@/components/cards/common/TransferItem.vue';
   import BBMoney from '@/utils/BBMoney';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   export default {
     name: 'DashboardCredit',
     components: {
            BasicButton,
            TransferItem,
            BBModal,
            updateCurrentTravelValues,
            FontAwesomeIcon,
      },
     data() {
       return {
         progress: 95,
         statements: {},
         isModalVisible: true,
         currentModal: null,
         transferItems: [
            {
                name: 'Vitor Hugo',
                method: 'Pix',
                type: 'Outgoing',
                date: '12/03/2023',
                value: 'R$1000,00'
            },
            {
                name: 'Elisyum LTDA',
                method: 'Pix',
                type: 'Received',
                date: '11/03/2023',
                value: 'R$1000,00'
            },
            {
                name: 'Robert Jr',
                method: 'Pix',
                type: 'Outgoing',
                date: '12/03/2023',
                value: 'R$1000,00'
            },
            {
                name: "Urubu's Pix Bank",
                method: 'Pix',
                type: 'Received',
                date: '12/03/2023',
                value: 'R$2000,69'
            },
            {
                name: "Urubu's Pix Bank",
                method: 'Pix',
                type: 'Received',
                date: '12/03/2023',
                value: 'R$2000,69'
            },
        ]
       };
     },
     async mounted() {
        this.statements = await this.fetchStatementData()
     },
     methods: {
        async updateCurrentStatement(newStatement){
            this.statements.current_statement = newStatement
        },
        async updateStatement(newStatement){
            this.statements.current_statement = newStatement
        },
        async fetchStatementData(){
            try {
                let data = await this.$api.get('/api/user/profile')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
            // //use getter to get the data
            // let data = await this.$store.dispatch('auth/fetchUserData')
            // console.log(data)
             return 0;
        },
        showModal(modalIndex) {
          this.currentModal = modalIndex;
          this.$store.dispatch('modal/showInputModal', true);
        },
     },
     computed: {
        currentStatement(){
            return  BBMoney.toCurrency(this.statements.current_statement);
        },
        currentMonth() {
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'long' });
            //get only first 3 letters
             return month.substring(0, 3);
        },
     },
   }
   </script>
 
 
 