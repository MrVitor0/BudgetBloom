<template >
  <img src="@/assets/bgvector.png" class="rounded-2xl w-screen h-72 hidden md:block "> 
  <div class="hidden md:relative md:flex flex-col flex-auto min-w-0 md:p-4 md:mx-6 md:-mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/70 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
    <div class="md:flex md:flex-col">
      <div class="md:flex md:items-center text-center md:text-start">
        <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-white mr-2 w-32 items-center text-center hidden md:block">
          <img src="@/assets/usr.png" class="rounded-3xl w-screen ">
        </div> 
        <div class="flex-grow ml-5 mt-10 md:mt-0">
          <h2 class="text-xl font-semibold mb-2">John Doe</h2>
           <div class="md:flex hidden">
            <p class="text-gray-600">
                <font-awesome-icon icon="suitcase" class="text-sm text-purple-700 mt-1" />
                Software Enginner
              </p>
              <p class="text-gray-600 pl-3">
                <font-awesome-icon icon="location-dot" class="text-sm text-purple-700 mt-1" />
                Rio de Janeiro
              </p>
              <p class="text-gray-600 pl-3 hidden md:block">
                <font-awesome-icon icon="calendar" class="text-sm text-purple-700 mt-1" />
                01/01/2023
              </p>
          </div>
        </div>
        
        <div class="md:flex flex-end md:px-5 ">
          <BasicPill clickable active text="Plannings" icon="bars" @click="togglePlanningsArea" />
          <BasicPill clickable active text="Information" icon="user" @click="toggleInformationArea" />
          <BasicPill clickable active text="Settings" icon="gear" @click="toggleSettingsArea" />
        </div>
      </div>
    </div>
  </div>

 <!-- PROFILE INFORMATION AREA -->
 <div class="md:mt-8" v-if="showInformationArea">
    <div class="flex flex-wrap md:-mx-4">
      <div class="w-full px-4 mb-5">
        <div class="bg-white rounded-lg shadow p-4 h-full">
          <div class="flex flex-col">
              <div class="flex">
                <div class="flex-col text-md text-gray-700 font-medium">
                  Profile Edit
                </div>
                <div class="flex-grow" />
                <div class="flex-col flex-end text-md text-gray-700 font-medium cursor-pointer" title="Save Data">
                 
                   <button class="text-md rounded-lg text-center px-2 py-1 bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500  text-white "><font-awesome-icon icon="save" class="text-xl text-white mr-2 "/>Save </button>
                </div>
              </div>
              <div class="text-xs font-light text-gray-500 mb-5 mt-1">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
              </div>
              <div class="grid grid-cols-2 gap-4 w-full">
                <div class="capitalize">
                  <BBTextInput label="Enter your name" placeholder="John Doe" />
                </div>
                <div class="capitalize">
                  <BBTextInput label="Enter your email" type="email" icon="envelope" placeholder="john@example.com" />
                </div>
                <div class="capitalize">
                  <BBTextInput label="Enter your number" type="number" icon="mobile" placeholder="123-456-7890" />
                </div>
                <div class="capitalize">
                  <BBTextInput label="Enter your role" icon="suitcase" placeholder="Developer" />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- PROFILE INFORMATION AREA -->


 <!-- PROFILE SETTINGS AREA -->
  <div class="mt-2" v-if="showSettingsArea">
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
                Plataform Settings
              </div>
              <div class="text-xs font-light text-gray-500 mb-5 mt-5">
               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque vel sapiente ducimus exercitationem voluptas!
              </div>
              <div class="flex capitalize mb-6 pb-5">
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
  <div class="mt-2" v-if="showPlanningsArea">  
    <div class="flex flex-wrap md:-mx-4">
      <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-9">
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
import BBTextInput from '@/components/form/BBTextInput.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
  name: 'DashboardProfile',
  components: {
    BasicPill,
    BasicCheckbox,
    PlanningCard,
    BBTextInput,
    FontAwesomeIcon,
  },
  data() {
    return {
      progress: 95,
      showInformationArea: true,
      showSettingsArea: true,
      showPlanningsArea: true,
    };
  },
  methods: {
    toggleInformationArea() {
      this.showInformationArea = !this.showInformationArea;
    },
    toggleSettingsArea() {
      this.showSettingsArea = !this.showSettingsArea;
    },
    togglePlanningsArea() {
      this.showPlanningsArea = !this.showPlanningsArea;
    },
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

