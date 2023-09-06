<template>
    <!-- ADD NEW INVESTMENT AREA --> 
    <div class="mt-1">
        <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4 ">
            <!-- START OVERVIEW AREA -->
            <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100 rounded-lg ">
               <img src="@/assets/cardbg4.png" class="rounded- w-screen h-full  border-t border-gray-500 rounded-lg">
                <div class="relative flex flex-col flex-auto min-w-0 -mt-36 pt-12 md:pt-0 md:-mt-36 overflow-hidden break-words border-0  rounded-2xl bg-clip-border ">
                    <p class="pl-2 text-white text-5xl ">R$ {{ currentDebtsAmount }}</p>
                    <div class="flex">
                    <div class="flex flex-col">
                        <p class="pl-3 text-purple-200 text-2xl">{{ userName }}</p>
                    </div>
                    <div class="flex flex-col ml-auto">
                        <p class="pl-3 mr-2 md:mr-6 text-purple-200 text-2xl capitalize">{{ currentMonth }}/23</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- RECENT TRANSACTIONS -->
        <div class="w-full md:pl-1 px-2 flex-wrap mb-5 ">
            <div class="bg-white rounded-lg shadow py-4 h-full">
                <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3 ">
                    <div class="flex-start">
                        <p class="text-xl text-BBDark">Seus Débitos</p>
                    </div>
                    <div class="flex-end">
                        <font-awesome-icon title="View More" icon="landmark-flag" class="text-BBPurple text-2xl cursor-pointer pr-3" />
                    </div>
                </div>
                <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                <div class="md:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-h-[15rem] overflow-y-auto">
                        <!-- ITEM -->
                        <div v-if="debtsList.length >= 1" >
                            <div class="last-purchase-item" v-for="(item, index) in debtsList" :key="index">
                                <LastDebts
                                    :name="item?.name" 
                                     method="pix"
                                     type="s"
                                    :date="formatDate(item?.lastCreatedAt)"
                                    :value="formatCurrency(item?.amount)"
                                    :total="item?.last_purchase"
                                />
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-center text-BBDark">Nenhuma compra realizada</p>
                        </div>
                        <!-- ITEM -->
                    </div>
                </div>
            </div>
        </div>
        <!-- RECENT TRANSACTIONS -->
        <div class="w-full md:pl-1 px-2 flex-wrap mb-5 ">
            <div class="bg-white rounded-lg shadow py-4 h-full">
                <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3 ">
                    <div class="flex-start">
                        <p class="text-xl text-BBDark">A receber</p>
                    </div>
                    <div class="flex-end">
                        <font-awesome-icon title="View More" icon="landmark-flag" class="text-BBPurple text-2xl cursor-pointer pr-3" />
                    </div>
                </div>
                <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                <div class="md:max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="max-h-[15rem] overflow-y-auto">
                        <!-- ITEM -->
                        <div v-if="earningsList.length >= 1" >
                            <div class="last-purchase-item" v-for="(item, index) in earningsList" :key="index">
                                <LastEarnings
                                    :name="item?.user_name" 
                                    :date="formatDate(item?.trl_purchase_createdAt)"
                                    :value="formatCurrency(item?.trl_debts_amount)"
                                    :total="item?.trl_last_purchase_name"
                                />
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-center text-BBDark">Nenhuma compra realizada</p>
                        </div>
                        <!-- ITEM -->
                    </div>
                </div>
            </div>
        </div>
       <!-- Modals-->
       <BBModal>
            <updateCurrentTravelValues  @updateDebtsAmount="updateDebtsAmount" v-if="this.currentModal == 1" />
        </BBModal>
     </div>
     <!-- PROFILE SETTINGS AREA -->
   </template>
   <script>
 
   import BBModal from '@/components/modal/BBModal.vue';
   import updateCurrentTravelValues from '@/components/modal/creditCards/updateCurrentTravelValues';
   import LastDebts from '@/components/cards/common/LastDebts.vue';
   import LastEarnings from '@/components/cards/common/LastEarnings.vue';
   import BBMoney from '@/utils/BBMoney';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   import PWUtils from '@/utils/PWUtils';
   export default {
     name: 'DashboardCredit',
     components: {
            LastDebts,  
            BBModal,
            LastEarnings,
            updateCurrentTravelValues,
            FontAwesomeIcon,
     },
     data() {
       return {
         totalDebts: 0,
         totalEarnings: 0,
         progress: 95,
         userName: 'N/A',
         debts_amount: 0,
         isModalVisible: true,
         currentModal: null,
         transferItems: [],
         debtsList: [],
         earningsList: [],
       };
     },
     async mounted() {
        await this.fetchDebtsTableData()
        await this.fetchEarningsTableData()
        await this.getUser()
     },
     methods: {
        formatDate(date){
            return PWUtils.formatDate(date)
        },
        formatCurrency(value){
            return "R$" + BBMoney.toCurrency(value)
        },
        getUser(){
            this.$store.dispatch('auth/fetchUserData').then((result) => {
                console.log(result)
                this.userName = result.name
            }).catch((err) => {
                throw new Error(err)
            });
        },
        async fetchDebtsTableData(){
            try {
                this.$api.get('/api/travel/purchase/retrieve/debts').then((result) => {
                   console.log(result)
                   this.debts_amount = result.data.total_debts
                   this.debtsList = result.data.debts
                   
                }).catch((err) => {
                    throw new Error(err)
                });
            } catch (error) {
               PWUtils.PWNotification('error', error.message)
            }
        },
        async fetchEarningsTableData(){
            try {
                this.$api.get('/api/travel/purchase/retrieve/receives').then((result) => {
                   this.earningsList = result.data.response
                   const totalEarnings = this.earningsList.reduce((accumulator, earnings) => {
                    return accumulator + earnings.trl_debts_amount;
                    }, 0); 
                    this.totalEarnings = totalEarnings
                }).catch((err) => {
                    throw new Error(err)
                });
            } catch (error) {
               PWUtils.PWNotification('error', error.message)
            }
        },
        showModal(modalIndex) {
          this.currentModal = modalIndex;
          this.$store.dispatch('modal/showInputModal', true);
        },
     },
     computed: {
        currentDebtsAmount(){
            let value = this.debts_amount > this.totalEarnings 
            let signal = value ? '-' : ''
            return signal + BBMoney.toCurrency(this.totalEarnings - this.debts_amount);
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
 
 
 