<template>
    <div class="relative w-full">
        <label :for="inputId" v-if="label" class="text-sm block font-medium text-gray-500">{{ label }}</label>
        <slot></slot>
        <div :class='`absolute left-3 ${label ? "top-7" : "top-2"}`' >
            <font-awesome-icon :icon="icon" class="text-md text-purple-400" />
        </div>
    </div>
</template>
  
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    components: {
        FontAwesomeIcon,
    },
    props: {
        label: String,
        icon: {
            type: String,
            default: 'user',
        },
    },
}
</script>
  