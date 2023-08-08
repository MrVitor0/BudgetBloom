<template >

  <img src="@/assets/bgvector.png" class="rounded-2xl w-screen h-72 hidden md:block"> 
  <div class="md:relative flex flex-col flex-auto min-w-0 md:p-4 md:mx-6 md:-mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/70 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
    <div class="md:flex md:flex-col">
      <div class="md:flex md:items-center text-center md:text-start">
        <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-white mr-2 w-32 items-center text-center hidden md:block">
          <img src="@/assets/usr.png" class="rounded-3xl w-screen ">
        </div> 
        <div class="flex-grow ml-5 mt-10 md:mt-0">
          <h2 class="text-xl font-semibold mb-2">John Doe</h2>
           <p class="text-gray-600">Software Enginner</p>
        </div>
        <div class="md:flex flex-end md:px-5 ">
          <BasicPill text="Plannings" icon="bars" />
          <BasicPill text="Information" icon="user" />
          <BasicPill text="Settings" icon="gear" />
        </div>
      </div>
    </div>
  </div>


 <!-- PROFILE SETTINGS AREA -->
  <div class="mt-8">
    <div class="flex flex-wrap -mx-4">
      <!-- PROFILE SETTINGS CARD -->
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
      <!-- PROFILE SETTINGS CARD -->
      <div class="w-full md:w-2/2 lg:w-2/3 px-4 mb-5 ">
        <div class="bg-white rounded-lg shadow p-4 h-full">
          <div class="flex flex-col">
              <div class="text-md text-gray-700 font-medium">
                Plataform Settings
              </div>
              <div class="text-xs font-light text-gray-500 mb-5 mt-5">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
              </div>
              <div class="flex capitalize mb-3">
                  <BasicCheckbox text="enable push notifications" :initialValue="true" @change="handleToggle1" />
              </div>
              <div class="flex capitalize mb-3">
                  <BasicCheckbox text="enable sound" :initialValue="false" @change="handleToggle2" />
              </div>
              <div class="flex capitalize mb-3">
                  <BasicCheckbox text="enable loss warnings" :initialValue="false" @change="handleToggle3" />
              </div>
              <div class="flex capitalize">
                  <BasicCheckbox text="send me an email when someone logs into the account" :initialValue="true" @change="handleToggle4" />
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- PROFILE SETTINGS AREA -->


  <!-- PROFILE PLANNINGS AREA -->
  <div class="mt-3">
    <div class="flex flex-wrap -mx-4">
      <!-- PROFILE PLANNINGS CARD -->
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
        <PlanningCard 
          title="Nubank RDB"
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
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
        <PlanningCard 
          title="C6 Bank CDB"
          subtitle="Fixed Income"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."

          fromBudget="3.220,00"
          toBudget="10.000,00"

          fromAport="1"
          toAport="25"

          fromDate="01/01/2021"
          toDate="01/01/2021"

          fromMounth="1"
          toMounth="10"
        />
      </div>
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-5">
        <PlanningCard 
          title="Apple Inc. (AAPL34)"
          subtitle="Stocks"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus."

          fromBudget="500,00"
          toBudget="2.000,00"

          fromAport="1"
          toAport="25"

          fromDate="01/01/2021"
          toDate="01/01/2021"

          fromMounth="1"
          toMounth="10"
        />
      </div>
    </div>
  </div>
  <!-- PROFILE PLANNINGS AREA -->



  
</template>

<script>
import BasicPill from '@/components/pills/BasicPill.vue';
import BasicCheckbox from '@/components/checkbox/BasicCheckbox.vue';
import PlanningCard from '@/components/cards/PlanningCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'DashboardProfile',
  components: {
    BasicPill,
    BasicCheckbox,
    PlanningCard,
    FontAwesomeIcon,
  },
  data() {
    return {
      progress: 95,
    };
  },
  methods: {
    handleToggle1(isChecked) {
      console.log('Toggle 1:', isChecked);
    },
    handleToggle2(isChecked) {
      console.log('Toggle 2:', isChecked);
    },
    handleToggle3(isChecked) {
      console.log('Toggle 3:', isChecked);
    },
    handleToggle4(isChecked) {
      console.log('Toggle 4:', isChecked);
    },
  },
}
</script>

