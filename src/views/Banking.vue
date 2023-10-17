<template >
    <!-- ADD NEW INVESTMENT AREA -->
    <div class="mt-2">
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
                <!-- START OVERVIEW AREA -->
                <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100 rounded-lg">
                    <img src="@/assets/bgvector.png" class="rounded- w-screen h-64 hidden md:block border-t border-gray-500 rounded-t-lg">
                <BankingCard :amount="this.banking_data.account_balance" icon="bank" class="md:-mt-52"/>
                <!-- MONTH BALANCE -->
                <BankingCard :amount="this.banking_data.current_incoming" type="earnings" :percentage="0" />
                <BankingCard :amount="this.banking_data.current_expenses" type="expenses" :percentage="0" />
                <!-- MONTH BALANCE -->
            </div>
            <!-- Monthly Planning -->
            <div class="w-full md:w-1/2 lg:w-1/3 md:px-4 mb-5">
                <div class="bg-white rounded-lg shadow pb-4 pt-2 h-full text-center">
                    <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3">
                        <div class="flex-start">
                            <p class="text-xl text-BBDark">Monthly Planning</p>
                        </div>
                        <div class="flex-end">
                            <font-awesome-icon title="View More" icon="list-check" class="text-BBPurple text-2xl cursor-pointer" />
                        </div>
                    </div>
                    <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                    <!-- ITEM -->
                    <p>In development</p>
                </div>
            </div>
            <!-- ACCOUNT BALANCE -->
            <div class="w-full md:w-1/2 lg:w-1/3 mb-5">
                <div class="flex justify-center items-center bg-white rounded-lg shadow p-4 h-full">
                    <div class="flex flex-col items-center text-center mt-26">
                        <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                        <font-awesome-icon icon="money-check" class="text-white text-5xl p-6" />
                        </div>
                        <div class="text-md text-gray-700 font-medium mt-2">
                          {{ $t("banking.page.edit_account_balance") }}
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                          {{ $t('banking.page.edit_account_balance_description') }}
                        </div>
                        <div class="w-64">
                            <BasicButton @click="showModal(0)" active="true" :text="$t('banking.page.add_transaction')" icon="square-plus" />
                        </div>  
                        <div class="w-64 pt-1">
                            <BasicButton @click="showModal(1)" active="true" :text="$t('banking.page.add_expanse')" icon="square-minus" />
                        </div>  
                        <div class="w-64 pt-1 cursor-not-allowed">
                            <BasicButton disabled active="true" :text="$t('banking.page.adjust_balance')" icon="wrench" />
                        </div>  
                    </div>
                </div>
            </div>
           <!-- RECENT TRANSACTIONS -->
            <div class="w-full mb-5">
                <div class="bg-white rounded-lg shadow py-4 h-full">
                    <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3">
                        <div class="flex-start">
                            <p class="text-xl text-BBDark">{{ $t("banking.page.recent_transactions") }}</p>
                        </div>
                        <div class="flex-end">
                            <font-awesome-icon title="View More" icon="eye" class="text-BBPurple text-2xl cursor-pointer pr-3" />
                            <font-awesome-icon icon="file-circle-plus" class="text-BBPurple text-2xl cursor-pointer" />
                        </div>
                    </div>
                    <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                    <!-- ITEM -->
                    <TransferItem
                        v-for="(item, index) in banking_data.transactions.banking"
                        :key="index"
                        :name="item.name"
                        :method="$t(item.type_transaction)"
                        :type="$t(item.type_payment)"
                        :typeF="item.type_transaction"
                        :date="item.referenceAt"
                        :value="item.amount"
                    />
                </div>
            </div>
       </div>
     </div>
    <!-- PROFILE SETTINGS AREA -->
    <!-- Modals-->
    <BBModal>
          <addIncomingValue @update="updateIncoming" :banking_data="banking_data" v-if="this.currentModal == 0" />
          <addExpanseValue  @update="updateExpenses" :banking_data="banking_data" v-if="this.currentModal == 1" />
          <updateAccountBalance @update="updateBalance" :banking_data="banking_data" v-if="this.currentModal == 2" />
    </BBModal>
   </template>
   <script>
   import BasicButton from '@/components/button/BasicButton.vue';
   import TransferItem from '@/components/cards/common/TransferItem.vue';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   import updateAccountBalance from '@/components/modal/banking/updateAccountBalance';
   import addIncomingValue from '@/components/modal/banking/addIncomingValue';
   import addExpanseValue from '@/components/modal/banking/addExpanseValue';
   import BBModal from '@/components/modal/BBModal.vue';
   import recentTransactions from '@/mocks/data/recentTransactions.json';
   import BankingCard from '@/components/cards/BankingCard.vue';
   import { mapActions } from 'vuex';
   export default {
     name: 'DashboardInvestments',
     components: {
            BasicButton,
            TransferItem,
            FontAwesomeIcon,
            BBModal,
            BankingCard,
            updateAccountBalance,
            addIncomingValue,
            addExpanseValue
      },
     data() {
       return {
         progress: 95,
         currentModal: null,
         transferItems: recentTransactions,
         banking_data: {
            account_balance: 0,
            current_incoming: 0,
            current_expenses: 0,
            transactions: {}
         }
       };
     },
     async mounted() {
        const response = await this.$api.get("/api/banking/user/transaction/list")
        console.log(response)
        if(response.data)
            this.banking_data = response.data
           
     },
     methods: {
       ...mapActions('modal', ['showInputModal', 'hideInputModal']),
        /**
         * Update the current balance in the banking account.
         * @param {number} response
        */
        updateBalance(response) {
            this.banking_data.account_balance = response;
        },

        /**
         * Update the current incoming in the banking account.
         * @param {object} response
         */
        async updateIncoming(response) {
            if (typeof response.hardEdit === "boolean" && response.hardEdit) {
                this.banking_data.current_incoming = response.value;
            } else {
                //update this.banking_data.transactions adding response.payload
                const response = await this.$api.get("/api/banking/user/transaction/list")
                if(response.data)
                    this.banking_data = response.data
                // this.banking_data.current_incoming += response.value;
                // this.banking_data.account_balance += response.value;
            }
        },
        
        /**
         *  Update the current expenses in the banking account.
         * @param {object} response 
       */
        async updateExpenses(response) {
            console.log(response)
            if (typeof response.hardEdit === "boolean" && response.hardEdit) {
                this.banking_data.current_expenses = response.value;
            } else {
                //update this.banking_data.transactions adding response.payload
                const response = await this.$api.get("/api/banking/user/transaction/list")
                console.log(response)
                if(response.data)
                    this.banking_data = response.data
                // this.banking_data.current_expenses += response.value;
                // let account_balance = this.banking_data.account_balance - response.value;
                // if (account_balance < 0) {
                //     account_balance = 0;
                // }
                // this.banking_data.account_balance = account_balance;
            }
        },
       showModal(modal) {
         this.currentModal = modal;
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
 
 
 