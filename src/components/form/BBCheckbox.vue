<template>
    <div class="flex items-center mt-2">
        <label class="inline-flex items-center">
        <input
            type="checkbox"
            class="hidden"
            v-model="isChecked"
            @click="() => isChecked = !isChecked"
            @change="HandleChange"
        />
        <span
            :class="{ 'bg-purple-600': isChecked }"
            class="form-checkbox h-5 w-5 p-3 text-purple-600 relative border border-gray-400 rounded-md"
        >
            <FontAwesomeIcon
            v-if="isChecked"
            icon="check" 
            class="text-md  text-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
        </span>
        <span class="ml-2 text-gray-700">{{ this.label }}</span>
        </label>
    </div>
</template>
<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
export default {
    components: {
        FontAwesomeIcon,
    },
    props: {
        label: {
            type: String,
            default: 'Sample Label',
        },
        value: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isChecked: true,
        };
    },
    watch: {
        value() {
            this.isChecked = this.value;
        },
    },
    methods: {
        HandleChange() {
            //get the new value from the event
            this.$emit('update', this.isChecked);

        },
        closeModal() {
            this.$emit('close');
        },
    },
};
</script>