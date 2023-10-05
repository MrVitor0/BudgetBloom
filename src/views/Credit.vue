<template >
    <!-- ADD NEW INVESTMENT AREA --> 
        <div class="mt-2">
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
                <!-- START OVERVIEW AREA -->
                <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100 rounded-lg">
                    <img src="@/assets/cardbg3.png" class="rounded- w-screen h-full  border-t border-gray-500 rounded-lg">
                    <div class="relative flex flex-col flex-auto min-w-0 -mt-36 pt-12 md:pt-0 md:-mt-36 overflow-hidden break-words border-0  rounded-2xl bg-clip-border ">
                        <p class="pl-3 text-white text-5xl ">R$ {{ currentBillAmount }}</p>
                        <div class="flex">
                            <div class="flex flex-col">
                                <p class="pl-3 text-purple-200 text-2xl">Vitor Hugo</p>
                            </div>
                            <div class="flex flex-col">
                                <p class="pl-3 text-purple-200 text-2xl capitalize">{{ currentMonth }}/23</p>
                            </div>
                        </div>
                    </div>
                </div>
              <!-- ACCOUNT BALANCE -->
              <div class="w-full md:w-1/2 lg:w-1/3 mb-5 md:px-3 ">
                <div class="flex justify-center items-center bg-white rounded-lg py-5 shadow p-4 h-full">
                    <div class="flex flex-col items-center text-center ">
                        <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                          <font-awesome-icon icon="calendar-days" class="text-white text-5xl p-6" />
                        </div>
                        <div class="text-md text-gray-700 font-medium mt-2">
                            {{ $t('credit.cards.current_statements.title') }}
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                            {{ $t('credit.cards.current_statements.description') }}
                        </div>
                        <div class="w-64">
                          <BasicButton @click="showModal(0)" active="true" text="credit.cards.current_statements.button" icon="edit" />
                        </div> 
                    </div>
                </div>
            </div>


       
             
            <!-- ACCOUNT BALANCE -->
            <div class="w-full md:w-1/2 lg:w-1/3 mb-2 lg:mb-5">
                <div class="flex justify-center items-center bg-white rounded-lg shadow p-4 h-full">
                    <div class="flex flex-col items-center text-center mt-26">
                        <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                        <font-awesome-icon icon="calendar-plus" class="text-white text-5xl p-6" />
                        </div>
                        <div class="text-md text-gray-700 font-medium mt-2">
                            {{ $t('credit.cards.past_statements.title') }}
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                            {{ $t('credit.cards.past_statements.description') }}
                        </div>
                        <div class="w-64">
                        <BasicButton  @click="showModal(1)" active="true" text="credit.cards.past_statements.button" icon="edit" />
                        </div>  
                    </div>
                </div>
            </div>
       </div>
       <div>
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
               <!-- RECENT TRANSACTIONS -->
               <div class="w-full  mb-2 md:w-1/2 rounded-lg">
                <div class="bg-white rounded-lg shadow py-4 h-full">
                    <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3">
                        <div class="flex-start">
                            <p class="text-xl text-BBDark">{{ $t("banking.page.recent_puchases") }}</p>
                        </div>
                        <div class="flex-end">
                            <font-awesome-icon title="View More" icon="eye" class="text-BBPurple text-2xl cursor-pointer pr-3" />
                            <font-awesome-icon icon="file-circle-plus" class="text-BBPurple text-2xl cursor-pointer" />
                        </div>
                    </div>
                    <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                    <!-- ITEM -->
                    <div  v-if="currentStatement?.credit">
                        <CreditPurchases
                            v-for="(item, index) in currentStatement.credit"
                            :key="index"
                            :name="item.name"
                            :reference="item.reference"
                            :typeF="'banking.DEPOSIT'"
                            :date="item.reference"
                            :value="item.amount"
                        />
                    </div>
                    <div v-else class="flex justify-center items-center text-center lg:text-start">
                        <p class="text-gray-500 text-md lg:mx-0 mx-5">No purchases found for the current year and month</p>
                    </div>
                    <!-- ITEM -->
                </div>
            </div>
            <!-- START OVERVIEW AREA -->
            <div class="w-full md:w-1/2 md:pl-2 mb-2 lg:mt-0 mt-3">
                <CreditCardChartCard :statements="statements" class="h-full" />
            </div>
            <div class="w-full mb-2">
                <InfoCard 
                heading="Built by developers"
                subheading="PurpleWallet"
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore."
                linkText="View More"
                icon="arrow-right"
                class="rounded-xl"
                />
            </div>
           </div>      
       </div>

       <!-- Modals-->
       <BBModal>
            <updateCurrentStatement @updateCurrentStatement="updateCurrentStatement" :currentStatement="this.currentStatement" v-if="this.currentModal == 0" />
            <updateOlderStatements  @updateStatement="updateStatement" v-if="this.currentModal == 1" />
        </BBModal>
     </div>
     <!-- PROFILE SETTINGS AREA -->
   </template>
   <script>
   import BasicButton from '@/components/button/BasicButton';
   import CreditCardChartCard from '@/components/charts/CreditCardChartCard';
   import InfoCard from '@/components/cards/InfoCard';
   import CreditPurchases from '@/components/cards/common/CreditPurchases';
   import BBModal from '@/components/modal/BBModal.vue';
   import updateCurrentStatement from '@/components/modal/creditCards/updateCurrentStatement';
   import updateOlderStatements from '@/components/modal/creditCards/updateOlderStatements';
   import PWUtils from '@/utils/PWUtils';
   import BBMoney from '@/utils/BBMoney';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   import { mapActions } from 'vuex';
   export default {
     name: 'DashboardCredit',
     components: {
            BasicButton,
            InfoCard,
            CreditPurchases,
            BBModal,
            updateCurrentStatement,
            updateOlderStatements,
            CreditCardChartCard,
            FontAwesomeIcon
      },
     data() {
       return {
         progress: 95,
         isModalVisible: true,
         currentModal: null,
         currentBillAmount: 0,
         currentStatement: {},
         statements: [],
       };
     },
     async mounted() {
        await this.fetchStatementData()
     },
     methods: {
        ...mapActions('modal', ['showInputModal']), // Importante: "modal" é o namespace do módulo no store
        async updateCurrentStatement(newStatement){
            //find in this.statements the one that corresponds to the current month
            let currentDate = PWUtils.getCurrentDate('credit');
            // Extract year and month from currentDate
            const currentDateYearMonth = currentDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
            //find the index of the current statement and update in the array
            let index = this.statements.findIndex(item => item.reference.slice(0, 7) === currentDateYearMonth)
            this.statements[index] = newStatement

            console.log(this.statements, newStatement?.amount)
            this.currentBillAmount = BBMoney.toCurrency(newStatement?.amount || 0);
        },
        async updateStatement(newStatement){
            this.statements.current_statement = newStatement
        },
        async fetchStatementData(){
            const response = await this.$api.get('/api/credit/user/bill/purchase/list')
            let currentDate = PWUtils.getCurrentDate('credit');
           
            if (response.data) {
                // Extract year and month from currentDate
                const currentDateYearMonth = currentDate.slice(0, 7); // Assuming currentDate is in 'YYYY-MM-DD' format
                let currentStatement = response.data.find(item => item.reference.slice(0, 7) === currentDateYearMonth);
                if (currentStatement) {
                    this.currentStatement = currentStatement;
                } else {
                    //PWUtils.PWNotification('warning', 'No purchases found for the current year and month');
                }
                this.currentBillAmount = BBMoney.toCurrency(currentStatement?.amount || 0);
            } else {
                PWUtils.PWNotification('error', 'Error while fetching data');
            }
           this.statements = response?.data || [];
        },
        showModal(modalIndex) {
          this.currentModal = modalIndex;
          this.showInputModal();
        },
     },
     computed: {
        currentMonth() {
            const date = new Date();
            const month = date.toLocaleString('default', { month: 'long' });
            return month;
        },
     },
   }
   </script>
 
 
 