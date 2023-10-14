<template >
   <!-- ADD NEW INVESTMENT AREA -->
   <div class="mt-2">
        <div class="flex flex-wrap md:-mx-4">
         <!-- OVERVIEW AREA -->
        <div class="w-full md:w-2/2 lg:w-1/3 px-4 mb-5">
            <price-card class="mb-5" :title="$t('investments.cards.balance')" :amount="investmentwallet.balance"  icon="vault" color="purple" />
            <price-card class="mb-5" :title="$t('investments.cards.progress')" noFormat :amount="investmentwallet.progress" icon="money-check-dollar" color="purple" />
            <price-card :title="$t('investments.cards.streak')" noFormat :amount="investmentwallet.streak"  icon="piggy-bank" color="purple" />
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
                  {{ $t('investments.texts.track_investment') }}
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                  {{ $t('investments.texts.track_investment_description') }}
                </div>
                <div class="w-64">
                    <BasicButton @click="showModal(0)"  active="true" :text="$t('investments.texts.add_investment')" icon="plus" />
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
                  {{ $t('investments.texts.track_aport') }}
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                  {{ $t('investments.texts.track_aport_description') }}
                </div>
                <div class="w-64">
                    <BasicButton @click="showModal(1)" :text=" $t('investments.texts.add_aport')" icon="pen-to-square" />
                </div> 
            </div>
          </div>
        </div>
      
      </div>
    </div>
    <!-- PROFILE SETTINGS AREA -->
    <div class="rounded-lg scroll-container mb-5">
        <div class="flex flex-wrap scroll-row cursor-grabbing md:cursor-auto">
            <div class="md:w-1/2 lg:w-1/3 px-3"  v-for="investment in sortedInvestments"  :key="investment.id">
                <PlanningCard 
                  :name="investment.name"
                  icon="earth"
                  :subtitle="getOptionLabel(investment.subtitle)"
                  :description="investment.description"
                  :aport="formatCurrency(investment.aport)"
                  :objective="formatCurrency(investment.objective)"
                  :aports="this.investments.length"
                  :createdAt="investment.createdAt"
                  @edit="EditExistentInvestment(investment)"
                  @delete="deleteInvestment(investment)"
                />
            </div>
        </div>
    </div>
 
  
    <!-- Modals-->
    <BBModal>
          <addNewInvestment @newTask="trackNew" v-if="this.currentModal == 0" />
          <updateOlderInvestment  @updateTask="updateInvestment" :investments="investments" :data="currentModalData" v-if="this.currentModal == 1" />
          <editExistentInvestment @updateTask="editExistent" :data="currentModalData" v-if="this.currentModal == 2" />
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
    computed: {
      sortedInvestments() {
        if(this.investments.length < 1) return [];
          return this.investments.slice().sort((a, b) => {
            const dateA = new Date(a.updatedAt);
            const dateB = new Date(b.updatedAt);
            return dateB - dateA;
        });
      },
    },
    data() {
      return {
        currentModal: null,
        currentModalData: null,
        investments: [],
        investmentsType: MockInvestmentsType,
        investmentwallet: {
          balance: 0,
          progress: 0,
          streak: 0,
        },
        progress: 95,
        selectedValue: '',
      };
    },
    async mounted() {
      this.fetchData();
    },
    methods: {
      ...mapActions('modal', ['showInputModal', 'hideInputModal']),
      updateInvestment(message){
        if (PWUtils.validateInvestmentObject(message)) {
          const index = this.investments.findIndex((investment) => investment.id === message.id);
          this.investments[index] = message;
          this.investmentwallet.balance = this.aportSum();
          this.investmentwallet.progress = this.calcProgress();
          this.investmentwallet.streak = this.calcStreak();
        }
      },
      trackNew(message){
        if (PWUtils.validateInvestmentObject(message)) {
          this.investments.push(message);
          this.investmentwallet.balance = this.aportSum();
          this.investmentwallet.progress = this.calcProgress();
          this.investmentwallet.streak = this.calcStreak();
        }
        
      },
      editExistent(message){
        if (PWUtils.validateInvestmentObject(message)) {
          const index = this.investments.findIndex((investment) => investment.id === message.id);
          this.investments[index] = message;
          this.investmentwallet.balance = this.aportSum();
          this.investmentwallet.progress = this.calcProgress();
          this.investmentwallet.streak = this.calcStreak();
        }
      },
      convertToDate(dateString) {
        const [day, month, year] = dateString.split('/');
        return new Date(`${year}-${month}-${day}`);
      },
      aportSum() {
        return this.investments.reduce((acc, investment) => {
          return acc + investment.aport;
        }, 0);
      },
      calcProgress(){
        let aportSum = 0;
        let objectiveSum = 0;
        for (let i = 0; i < this.investments.length; i++) {
          aportSum += this.investments[i].aport;
          objectiveSum += this.investments[i].objective;
        }
        return PWUtils.progressPercentage(aportSum, objectiveSum) + '%';
      },
      calcStreak(){
         //streak is the days between the first investment and today, if there is no investment, streak is 0, find in investments
         for (let i = 0; i < this.investments.length; i++) {
            let date = new Date(this.investments[i].createdAt);
            let today = new Date();
            let diff = Math.abs(today - date);
            let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            if (this.investmentwallet.streak < days) {
              this.investmentwallet.streak = days;
            }
          }
          return this.investmentwallet.streak;
      },
      async fetchData() {
        try {
          const response = await this.$api.get('/api/investment/wallet/list/all');

          console.log(response.data);

          this.investments = response?.data?.investments;
          this.investmentwallet.balance = response?.data?.amount;
          //progress is the sum of all "aport" and "objective" of all investments divided by the number of investments
          this.investmentwallet.progress = this.calcProgress();
          this.investmentwallet.streak = this.calcStreak();
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        }
      },
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
      },
      deleteInvestment(data) {
        this.$api.delete(`/api/investment/delete/${data.id}`).then(() => {
          //delete from array
          const index = this.investments.findIndex((investment) => investment.id === data.id);
          this.investments.splice(index, 1);
          this.investmentwallet.balance = this.aportSum();
          this.investmentwallet.progress = this.calcProgress();
          this.investmentwallet.streak = this.calcStreak();
          
          PWUtils.PWNotification('success', 'Investment Deleted!');
        }).catch(() => {
          PWUtils.PWNotification('error', 'Something went wrong!');
        });
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
