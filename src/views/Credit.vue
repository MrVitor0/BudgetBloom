<template >
    <!-- ADD NEW INVESTMENT AREA --> 
        <div class="mt-2">
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
                <!-- START OVERVIEW AREA -->
                <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100 rounded-lg">
                    <img src="@/assets/cardbg3.png" class="rounded- w-screen h-full  border-t border-gray-500 rounded-lg">
                    <div class="relative flex flex-col flex-auto min-w-0 -mt-36 pt-12 md:pt-0 md:-mt-36 overflow-hidden break-words border-0  rounded-2xl bg-clip-border ">
                        <p class="pl-3 text-white text-5xl ">R$ 0.000,00</p>
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
                          Update Current Credit Statement
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                           Your balance doesn't match your real balance? <br/> Update it here!
                        </div>
                        <div class="w-64">
                          <BasicButton @click="showModal(0)" active="true" text="Increase Statement" icon="edit" />
                        </div>  
                    </div>
                </div>
            </div>
            <!-- ACCOUNT BALANCE -->
            <div class="w-full md:w-1/2 lg:w-1/3 mb-5">
                <div class="flex justify-center items-center bg-white rounded-lg shadow p-4 h-full">
                    <div class="flex flex-col items-center text-center mt-26">
                        <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                        <font-awesome-icon icon="calendar-plus" class="text-white text-5xl p-6" />
                        </div>
                        <div class="text-md text-gray-700 font-medium mt-2">
                        Update Older Statements
                        </div>
                        <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                        Your balance doesn't match your real balance? <br/> Update it here!
                        </div>
                        <div class="w-64">
                        <BasicButton  @click="showModal(1)" active="true" text="Update Statement" icon="edit" />
                        </div>  
                    </div>
                </div>
            </div>
       </div>
       <div>
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
                <!-- START OVERVIEW AREA -->
                <div class="w-full md:w-1/2 lg:w-1/3 mb-5  rounded-lg">
                    <CreditCardChartCard class="h-full" />
                </div>
                <div class="w-full md:w-1/2 lg:w-2/3 mb-5 px-3  rounded-lg">
                    <InfoCard 
                    heading="Built by developers"
                    subheading="PurpleWallet"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam necessitatibus incidunt ut officiis explicabo inventore."
                    linkText="View More"
                    icon="arrow-right"
                  />
                </div>
           </div>      
       </div>

       <!-- Modals-->
       <BBModal>
            <updateCurrentStatement v-if="this.currentModal == 0" />
            <updateOlderStatements v-if="this.currentModal == 1" />
        </BBModal>
     </div>
     <!-- PROFILE SETTINGS AREA -->
   </template>
   <script>
   import BasicButton from '@/components/button/BasicButton';
   import CreditCardChartCard from '@/components/charts/CreditCardChartCard';
   import InfoCard from '@/components/cards/InfoCard';
  
   import BBModal from '@/components/modal/BBModal.vue';
   import updateCurrentStatement from '@/components/modal/creditCards/updateCurrentStatement';
   import updateOlderStatements from '@/components/modal/creditCards/updateOlderStatements';

   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   import { mapActions } from 'vuex';
   export default {
     name: 'DashboardCredit',
     components: {
            BasicButton,
            InfoCard,

            BBModal,
            updateCurrentStatement,
            updateOlderStatements,

            CreditCardChartCard,
            FontAwesomeIcon,
      },
     data() {
       return {
         progress: 95,
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
     methods: {
        ...mapActions('modal', ['showInputModal']), // Importante: "modal" é o namespace do módulo no store
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
 
 
 