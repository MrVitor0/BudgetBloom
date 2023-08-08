<template>
    <a :class="PillClass">
        <font-awesome-icon v-if="icon !== 'hide'" :icon="icon" class="text-purple-700 mr-2" />    
        <span :class="TextClass">{{ text }}</span>
    </a>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    name: 'BasicPill',
    components: {
        FontAwesomeIcon,
    },
    computed: {
        PillClass() {
            let baseClass;
            switch (this.size) {
                case 'lg':
                    baseClass = 'bg-gray-300 m-2 p-3 block rounded-lg text-slate-700 font-medium cursor-pointer';
                    break;
                case 'sm':
                    baseClass = 'bg-gray-300 m-1 p-1 text-center block rounded-lg text-slate-700 font-medium cursor-pointer';
                    break;
                default:
                    baseClass = 'bg-gray-300 m-2 p-3 block rounded-lg text-slate-700 font-medium cursor-pointer';
            }
            return `${baseClass} ${this.color}`;
        },
        TextClass() {
            return this.textColor ? this.textColor : 'text-slate-700';
        }
    },
    props: {
        text: String,
        size: {
            type: String,
            default: () => 'lg'
        },
        textColor: {
            type: String,
            default: () => 'text-slate-700'
        },
        color: {
            type: String,
            default: () => 'gray-300'
        },
        icon: {
            type: String,
            default: () => 'circle'
        }
    }
}
</script>

