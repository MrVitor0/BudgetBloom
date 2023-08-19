<template>
    <div class="md:relative md:flex flex-col shadow md:shadow-transparent flex-auto min-w-0 mt-2  md:p-4 md:mx-6 md:my-5 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="md:flex md:flex-col">
                <div class="md:flex md:items-center text-center md:text-start">
                    <div class="flex-shrink-0 rounded-3xl shadow p-1 bg-white mr-2 w-32 items-center text-center hidden md:block">
                        <font-awesome-icon :icon="icon" class="text-5xl text-purple-700 m-5" />
                    </div> 
                    <div class="flex-grow ml-5 my-2 md:mt-0">
                        <p class="text-gray-600 text-xs capitalize">{{ type == !type ? currentMonth : 'Account Balance' }} <b>{{ type }}</b> <span  v-if="percentage !== 0"><span :class="spanClass" >{{ percentage >= 0 ? "+" : ""  }}{{ percentage }}%</span><span class="text-gray-400 text-sm ml-1">Since Last Month</span></span></p>
                        <h2 class="text-xl font-semibold mb-2">R${{ balance }}</h2>
                        <p class="text-gray-600 text-xs" v-if="percentage !== 0">Your {{ (type).toLowerCase() }} {{ percentage >= 0 ? 'increased' : 'decreased' }} by {{percentage}}%</p>
                        <p class="text-gray-600 text-xs" v-else-if="!type">This is your account balance</p>
                        <p class="text-gray-600 text-xs" v-else>These are your {{ (type).toLowerCase() }}</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
import PWUtils from '@/utils/PWUtils'
import BBMoney from '@/utils/BBMoney'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    props: {
        icon: {
            type: String,
            default: "chart-pie",
        },
        amount: {
            type: Number,
            default: 0,
        },
        type: String,
        percentage: {
            type: Number,
            default: 0,
        },
    },
    components: {
        FontAwesomeIcon,
    },  
   computed: {
        balance() {
            return BBMoney.toCurrency(this.amount);
        },
        spanClass() {
            return this.percentage >= 0 ? 'text-green-500 text-sm ml-1' : 'text-red-500  text-sm ml-1';
        },
        currentMonth() {
            return PWUtils.getCurrentMonth();
        },
    },
}
</script>