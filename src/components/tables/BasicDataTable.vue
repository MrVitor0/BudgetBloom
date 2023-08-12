<template>
    <div class="w-full">
        <div class="bg-white shadow-md rounded my-6">
           <table class="w-full table-auto">
                <thead>
                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th class="py-3 px-6 text-left">Name</th>
                    <th class="py-3 px-6 text-left">Email</th>
                    <th class="py-3 px-6 text-center">Status</th>
                    </tr>
                </thead>
                <tbody class="text-gray-600 text-sm font-light">
                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                        <td 
                            v-for="item in mockupData"
                            :key="item.id"
                             class="py-3 px-6 text-left whitespace-nowrap">
                            {{ item.name }}
                        </td>
                        <td 
                            v-for="item in mockupData"
                            :key="item.id"
                             class="py-3 px-6 text-left whitespace-nowrap">
                            {{ item.email }}
                        </td>
                        <td 
                            v-for="item in mockupData"
                            :key="item.id"
                             class="py-3 px-6 text-center whitespace-nowrap">
                            {{ item.status }}
                        </td>
                    </tr>
                </tbody>
           </table>
        </div>
    </div>
</template>

<script>
//import json from @/data/mockBanking
import mockupData from '@/data/mockBanking.json'

export default {
    data() {
        return {
            mockupData: mockupData
        }
    },
    mounted() {
        console.log(this.mockupData)
    }
}

</script>