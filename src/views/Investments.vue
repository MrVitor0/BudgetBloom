<template >


    <div class="ml-2 md:ml-0 p-2 rounded-lg scroll-container mb-5">
        <div class="flex flex-wrap scroll-row">
            <div class="md:w-1/2 lg:w-1/3 px-2">
                <PlanningCard 
                title="Nubank RDB"
                icon="bank"
                subtitle="Fixed Income"
                description="Lorem ipsum dolor sit amet consegagagagagagahahctetur adipisicing elit. Quisquam, voluptatibus."
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
            <div class="md:w-1/2 lg:w-1/3 px-2">
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
            <div class="md:w-1/2 lg:w-1/3 px-2">
                <PlanningCard 
                title="Apple Inc. (AAPL34)"
                icon="apple-whole"
                subtitle="Stock Market"
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
            <div class="md:w-1/2 lg:w-1/3 px-2">
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
                fromMounth="1"
                toMounth="10"
                />
            </div>
            <!-- Repeat similar blocks for other PlanningCard components -->
        </div>
    </div>
    
   <!-- PROFILE SETTINGS AREA -->
    <div class="mt-2">
      <div class="flex flex-wrap md:-mx-4">
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col">
                <div class="text-md text-gray-700 font-medium">
                  Profile Information
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-5">
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
                </div>
                <div>
                  <div class="flex capitalize">
                    <font-awesome-icon icon="fa-regular fa-user" class="text-md text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700">Name:</p>
                    <span class="text-gray-500 ml-2">John Doe</span>
                  </div>
                  <div class="flex capitalize">
                    <font-awesome-icon icon="fa-regular fa-envelope" class="text-md text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 ml-0">Email:</p>
                    <span class="text-gray-500 ml-2">john.doe@example.com</span>
                  </div>
                  <div class="flex capitalize">
                    <font-awesome-icon icon="fa-solid fa-mobile-screen-button" class="text-md text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 ml-0">Mobile:</p>
                    <span class="text-gray-500 ml-2">(123) 456-7890</span>
                  </div>
                  <div class="flex capitalize">
                    <font-awesome-icon icon="fa-solid fa-person-circle-check" class="text-md text-purple-700 mt-1 mr-2" />
                    <p class="font-medium text-gray-700 ml-0">Status:</p>
                    <span class="text-gray-500 ml-2">Active</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/2 lg:w-2/3 px-4 mb-5 ">
          <div class="bg-white rounded-lg shadow p-4 h-full">
            <div class="flex flex-col">
                <div class="text-md text-gray-700 font-medium">
                  Bank Statement
                </div>
                <div class="text-xs font-light text-gray-500 mb-5 mt-5">
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
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
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    name: 'DashboardInvestments',
    components: {
      PlanningCard,
      FontAwesomeIcon,
    },
    data() {
      return {
        progress: 95,
      };
    },
  }
  </script>



<style scoped>
.scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
}

.scroll-row {
  width: calc(100% + 10px); /* Adjust as needed */
  display: flex;
  flex-wrap: nowrap;
  margin-left: -5px;
  margin-right: -5px;
}
</style>
