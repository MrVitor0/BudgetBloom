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
            <div class="md:w-1/2 lg:w-1/3 px-3">
                <PlanningCard 
                title="Nubank RDB"
                icon="bank"
                subtitle="Fixed Income"
                description="Lorem ipsum dolor sit amet  adipisicing elit. Quisquam, voluptatibus."
                fromBudget="1.000,00"
                toBudget="10.000,00"
                fromAport="1"
                toAport="25"
                fromDate="01/01/2021"
                toDate="01/01/2021"
                fromMounth="1"
                toMounth="10"
                />
            </div>
            <div class="md:w-1/2 lg:w-1/3 px-3">
                <PlanningCard 
                title="Bradesco S.A. (BBDC4)"
                icon="bank"
                subtitle="Fixed Income"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."
                fromBudget="1.000,00"
                toBudget="10.000,00"
                fromAport="1"
                toAport="25"
                fromDate="01/01/2021"
                toDate="01/01/2021"
                fromMounth="1"
                toMounth="10"
                />
            </div>
            <div class="md:w-1/2 lg:w-1/3 px-3">
                <PlanningCard 
                title="Apple Inc. (AAPL34)"
                icon="apple-whole"
                subtitle="Stock Market"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."
                fromBudget="1.000,00"
                toBudget="10.000,00"
                fromAport="23"
                toAport="25"
                fromDate="01/01/2021"
                toDate="01/01/2021"
                fromMounth="9"
                toMounth="10"
                progress="95"
                />
            </div>
            <div class="md:w-1/2 lg:w-1/3 px-3">
                <PlanningCard 
                title="Itaú Unibanco S.A. (ITUB4)"
                icon="bank"
                subtitle="Fixed Income"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."
                fromBudget="1.000,00"
                toBudget="10.000,00"
                fromAport="1"
                toAport="25"
                fromDate="01/01/2021"
                toDate="01/01/2021"
                fromMounth="3"
                toMounth="10"
                progress="30"
                />
            </div>
            <!-- Repeat similar blocks for other PlanningCard components -->
        </div>
    </div>
 
   

    
  
  
    <!-- Modals-->
    <BBModal>
          <addNewInvestment v-if="this.currentModal == 0" />
          <updateOlderInvestment v-if="this.currentModal == 1" />
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
  import { mapActions } from 'vuex';
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
    },
    data() {
      return {
        currentModal: null,
        progress: 95,
        selectOptions: [
            { label: 'CDB/RDB Application', value: 'option1' },
            { label: 'Stock Market', value: 'option2' },
            { label: 'FIIS', value: 'option3' },
        ],
        selectedValue: '',
      };
    },
    methods: {
      ...mapActions('modal', ['showInputModal', 'hideInputModal']),
      showModal(modal) {
        this.currentModal = modal;
        this.showInputModal();
      },
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
