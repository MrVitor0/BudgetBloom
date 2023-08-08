<template>
    <a class="bg-gray-300 m-2 p-3 block rounded-lg  text-slate-700 font-medium cursor-pointer">
        <font-awesome-icon :icon="icon" class="text-purple-700 mr-2" />    
        {{ text }}
    </a>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: 'BasicPill',
    components: {
        FontAwesomeIcon,
    },
    props: {
        text: String,
        icon: {
            type: String,
            default: () => 'circle'
        }
    }
}
</script>

