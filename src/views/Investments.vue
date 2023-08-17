<template >
   <!-- ADD NEW INVESTMENT AREA -->
   <div class="mt-2">
        <div class="flex flex-wrap md:-mx-4">
         <!-- OVERVIEW AREA -->
        <div class="w-full md:w-2/2 lg:w-1/3 px-4 mb-5">
            <price-card class="mb-5" title="Investment Balance" amount="R$0.000,00" percentage="+20%" icon="vault" color="purple" />
            <price-card class="mb-5" title="Account balance" amount="R$0.000,00" percentage="+20%" icon="money-check-dollar" color="purple" />
            <price-card title="Passive Incoming" amount="R$0.000,00" percentage="+20%" icon="piggy-bank" color="purple" />
        </div>

         <!-- OVERVIEW AREA -->
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col items-center  text-center  m-12">
                <div
                  class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow"
                >
                <font-awesome-icon icon="money-bill-trend-up" class="text-white text-5xl p-6" />
                </div>
                <div class="text-md text-gray-700 font-medium mt-2">
                  Track New Investment
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                  Want to add a new investment to track? Click the button below.
                </div>
                <div class="w-64">
                    <BasicButton @click="showModal(0)"  active="true" text="Add New Investment" icon="plus" />
                </div>  
            </div>
          </div>
        </div>
          <!-- OVERVIEW AREA -->
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col items-center  text-center  m-12">
                <div
                  class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow"
                >
                <font-awesome-icon icon="money-bill-transfer" class="text-white text-5xl p-6" />
                </div>
                <div class="text-md text-gray-700 font-medium mt-2">
                  Track New Apport
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                  Want to update your apport? Click the button below.
                </div>
                <div class="w-64">
                    <BasicButton @click="showModal(1)" text="Update Investment" icon="pen-to-square" />
                </div> 
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <!-- PROFILE SETTINGS AREA -->
    <div class="rounded-lg scroll-container mb-5">
        <div class="flex flex-wrap scroll-row cursor-grabbing md:cursor-auto">
            <div class="md:w-1/2 lg:w-1/3 px-3"  v-for="investment in investments"  :key="investment.id">
                <PlanningCard 
                  :title="investment.title"
                  :icon="investment.icon"
                  :subtitle="getOptionLabel(investment.subtitle)"
                  :description="investment.description"
                  :fromBudget="formatCurrency(investment.fromBudget)"
                  :toBudget="formatCurrency(investment.toBudget)"
                  :toAport="investment.toAport"
                  :fromDate="investment.fromDate"
                  @click="EditExistentInvestment(investment)"
                />
            </div>
        </div>
    </div>
 
  
    <!-- Modals-->
    <BBModal>
          <addNewInvestment v-if="this.currentModal == 0" />
          <updateOlderInvestment v-if="this.currentModal == 1" />
          <editExistentInvestment :data="currentModalData" v-if="this.currentModal == 2" />
    </BBModal>
  </template>
  
  <script>
  import PlanningCard from '@/components/cards/PlanningCard.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import PriceCard from '@/components/cards/PriceCard.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  import BBModal from '@/components/modal/BBModal.vue';
  import addNewInvestment from '@/components/modal/investments/addNewInvestment';
  import updateOlderInvestment from '@/components/modal/investments/updateExistentInvestment';
  import editExistentInvestment from '@/components/modal/investments/editExistentInvestment';
  import { mapActions } from 'vuex';

  import MockInvestmentsType from '@/mocks/data/investmentsType.json';
  import BBMoney from '@/utils/BBMoney';
  import PWUtils from '@/utils/PWUtils';

  export default {
    name: 'DashboardInvestments',
    components: {
      PlanningCard,
      PriceCard,
      BasicButton,
      FontAwesomeIcon,
 
      BBModal,
      addNewInvestment,
      updateOlderInvestment,
      editExistentInvestment,
    },
    data() {
      return {
        currentModal: null,
        currentModalData: null,
        investments: [],
        investmentsType: MockInvestmentsType,
        progress: 95,
        selectedValue: '',
      };
    },
    mounted() {
      console.log(process.env.VUE_APP_JSON_SERVER) 
      this.$api.get(`/investments`)
      .then((response) => {
        this.investments = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    methods: {
      ...mapActions('modal', ['showInputModal', 'hideInputModal']),
      showModal(modal) {
        this.currentModal = modal;
        this.showInputModal();
      },
      getOptionLabel(value) {
        return PWUtils.findOptionByValue(this.investmentsType, value).label;
      },
      formatCurrency(value) {
        return BBMoney.toCurrency(BBMoney.toRaw(value));
      },
      EditExistentInvestment(data) {
        this.currentModalData = data;
        this.currentModal = 2;
        this.showInputModal();
      }
    }
  }
  </script>



<style scoped>
.scroll-container {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  width: calc(100% + 4rem); /* Adjust the value as needed */
  position: relative;
}
.scroll-container::-webkit-scrollbar {
  display: none; /* Hide the default scrollbar */
}
.scroll-container::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20px; /* Adjust as needed */
  background: linear-gradient(to left, transparent, white); /* Create a fading effect on the left side */
  pointer-events: none; /* Ensure the pseudo-element doesn't interfere with interactions */
  cursor: grabbing;
}

.scroll-row {
  width: calc(100% + 10px); /* Adjust as needed */
  display: flex;
  flex-wrap: nowrap;
  margin-left: -5px;
  margin-right: -5px;
}
</style>
