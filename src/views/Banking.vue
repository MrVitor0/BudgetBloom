<template >
    <!-- ADD NEW INVESTMENT AREA -->
    <div class="mt-2">
            <div class="flex p-2 md:pl-5 flex-wrap md:-mx-4">
                <!-- START OVERVIEW AREA -->
                <div class="w-full md:w-2/2 lg:w-1/3 mb-5 md:bg-purple-100">
                    <img src="@/assets/bgvector.png" class="rounded- w-screen h-64 hidden md:block "> 
                    <div class=" md:relative md:flex flex-col shadow md:shadow-transparent flex-auto min-w-0 p-5 md:p-4 md:mx-6 md:-mt-24 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
                        <div class="md:flex md:flex-col">
                            <div class="md:flex md:items-center text-center md:text-start">
                                <div class="flex-shrink-0 rounded-3xl shadow p-1  bg-white mr-2 w-32 items-center text-center hidden md:block">
                                    <font-awesome-icon icon="bank" class="text-5xl text-purple-700 m-5" />
                                </div> 
                                <div class="flex-grow ml-5 my-2 md:mt-0">
                                <p class="text-gray-600 text-xs">Account Balance</p>
                                <h2 class="text-xl font-semibold mb-2">R$00.000,00</h2>
                                <p class="text-gray-600 text-xs">This is your actual account ballance.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" md:relative md:flex flex-col shadow md:shadow-transparent flex-auto min-w-0 mt-2  md:p-4 md:mx-6 md:my-5 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
                        <div class="md:flex md:flex-col">
                            <div class="md:flex md:items-center text-center md:text-start">
                                <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-white mr-2 w-32 items-center text-center hidden md:block">
                                    <font-awesome-icon icon="clock" class="text-5xl text-purple-700 m-5" />
                                </div> 
                                <div class="flex-grow ml-5 my-2 md:mt-0">
                                    <p class="text-gray-600 text-xs">Account Loans</p>
                                    <h2 class="text-xl font-semibold mb-2">R$00.000,00</h2>
                                    <p class="text-gray-600 text-xs">This is related to your loan debits.</p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- RECENT TRANSACTIONS -->
            <div class="w-full md:w-1/2 lg:w-1/3 md:px-4 mb-5">
             <div class="bg-white rounded-lg shadow py-4 h-full">
                <div class="flex items-start justify-between text-center px-4 pb-4 md:p-3">
                    <div class="flex-start">
                       <p class="text-xl text-BBDark">Recent Transations</p>
                    </div> 
                    <div class="flex-end">
                        <font-awesome-icon icon="file-circle-plus" class="text-BBPurple text-2xl cursor-pointer" />
                    </div>  
                </div>
                <hr class="h-px mx-3 bg-purple-200 border-0 mb-5" />
                <!-- ITEM -->
                <TransferItem
                    v-for="(item, index) in transferItems"
                    :key="index"
                    :name="item.name"
                    :method="item.method"
                    :type="item.type"
                    :date="item.date"
                    :value="item.value"
                />
              </div>
            </div>
            <!-- ACCOUNT BALANCE -->
            <div class="w-full md:w-1/2 lg:w-1/3 mb-5">
             <div class="bg-white rounded-lg shadow p-4 h-full">
                <div class="flex flex-col items-center  text-center  m-12">
                    <div class="rounded-md bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow">
                      <font-awesome-icon icon="money-check" class="text-white text-5xl p-6" />
                    </div>
                    <div class="text-md text-gray-700 font-medium mt-2">
                      Edit Account Balance
                    </div>
                    <div class="text-xs font-light text-gray-500 mb-5 mt-1">
                      Want to add a new investment to track? Click the button below.
                    </div>
                    <div class="w-64">
                        <BasicButton active="true" text="Add New Investment" icon="plus" />
                    </div>  
                </div>
              </div>
            </div>
       </div>
     </div>
     <!-- PROFILE SETTINGS AREA -->
   </template>
   
   <script>
   import BasicButton from '@/components/button/BasicButton.vue';
   import TransferItem from '@/components/cards/common/TransferItem.vue';
   import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
   export default {
     name: 'DashboardInvestments',
     components: {
       BasicButton,
       TransferItem,
       FontAwesomeIcon,
     },
     data() {
       return {
         progress: 95,
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
        ]
       };
     },
   }
   </script>
 
 
 