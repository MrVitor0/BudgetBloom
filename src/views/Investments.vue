<template >
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
    
   <!-- ADD NEW INVESTMENT AREA -->
    <div class="mt-2">
        <div class="flex flex-wrap md:-mx-4">
         <!-- OVERVIEW AREA -->
         <div class="w-full md:w-2/2 lg:w-1/3 px-4 mb-5">
            <div class="bg-white rounded-lg shadow p-4 h-full">
                <div class="flex flex-col items-center"> <!-- Adicionada a classe "items-center" para centralizar verticalmente -->
                <div class="text-md text-gray-700 font-medium text-center mb-2"> <!-- Adicionada classe "mb-2" para espaçamento inferior -->
                    Bank Overview
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 text-center">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
                </div>
                <div class="flex flex-col items-center"> <!-- Adicionada a classe "items-center" para centralizar verticalmente -->
                    <div class="flex capitalize mb-2"> <!-- Adicionada classe "mb-2" para espaçamento inferior -->
                    <font-awesome-icon icon="money-bill-trend-up" class="text-xl text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 text-xl">Investment Balance:</p>
                    <span class="text-gray-500 ml-2 text-xl">R$00,00</span>
                    </div>
                    <div class="flex capitalize mb-2"> <!-- Adicionada classe "mb-2" para espaçamento inferior -->
                    <font-awesome-icon icon="money-check-dollar" class="text-xl text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 text-xl">Account balance:</p>
                    <span class="text-gray-500 ml-2 text-xl">R$00,00</span>
                    </div>
                    <div class="flex capitalize mb-2"> <!-- Adicionada classe "mb-2" para espaçamento inferior -->
                    <font-awesome-icon icon="credit-card" class="text-xl text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 text-xl">Total debts:</p>
                    <span class="text-gray-500 ml-2 text-xl">R$00,00</span>
                    </div>
                    <div class="flex capitalize">
                    <font-awesome-icon icon="fa-solid fa-person-circle-check" class="text-xl text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 text-xl">Status:</p>
                    <span class="text-gray-500 ml-2 text-xl">Positive</span>
                    </div>
                </div>
                </div>
            </div>
          </div>


         <!-- OVERVIEW AREA -->
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col items-center  text-center">
                <div class="text-md text-gray-700 font-medium">
                  Add New Investment
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
                </div>
                <div class="w-64">
                    <BBSelectInput   
                        :options="selectOptions"
                        v-model="selectedValue"
                      />
                </div>  
                <div class="w-64 pt-5">
                    <BBSelectInput   
                        :options="selectOptions"
                        v-model="selectedValue"
                      />
                </div>  
            </div>
          </div>
        </div>


       

         
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col items-center  text-center">
                <div class="text-md text-gray-700 font-medium">
                  Your Investments
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
                </div>
                <div class="w-64">
                    <DoughnutChartCard />
                </div>
            </div>
          </div>
        </div>

        

        
      </div>
    </div>
    <!-- PROFILE SETTINGS AREA -->
  
   

    
  
  
    
  </template>
  
  <script>
  import PlanningCard from '@/components/cards/PlanningCard.vue';
  import DoughnutChartCard from '@/components/charts/DoughnutChartCard.vue';
  import BBSelectInput from '@/components/form/BBSelectInput.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    name: 'DashboardInvestments',
    components: {
      PlanningCard,
      DoughnutChartCard,
      BBSelectInput,
      FontAwesomeIcon,
    },
    data() {
      return {
        progress: 95,
        selectOptions: [
            { label: 'CDB/RDB Application', value: 'option1' },
            { label: 'Stock Market', value: 'option2' },
            { label: 'FIIS', value: 'option3' },
        ],
        selectedValue: '',
      };
    },
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
