  <template>
    <a
      v-if="clickable"
      :class="PillClass"
      @click="handleClick"
      :style="{ transition: clicked ? 'background 0.5s ease-in-out' : '' }"
    >
     <font-awesome-icon v-if="icon !== 'hide'" :icon="icon" :class="IconClass" />
      <span :class="TextClass">{{ text }}</span>
    </a>
    <span
      v-else
      :class="PillClass"
      :style="{ transition: clicked ? 'background 0.5s ease-in-out' : '' }"
    >
    <font-awesome-icon v-if="icon !== 'hide'" :icon="icon" :class="IconClass" />
      <span :class="TextClass">{{ text }}</span>
    </span>
  </template>

  <script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'BasicPill',
    components: {
      FontAwesomeIcon,
    },
    data() {
      return {
        clicked: this.active,
      };
    },
    computed: {
      PillClass() {
        const baseClass = [
          'bg-gray-300 block rounded-lg font-medium cursor-pointer hover:bg-purple-300 transition duration-500 ease-in-out',
          this.size === 'lg' ? 'm-2 p-3' : this.size === 'sm' ? 'm-1 p-1 text-center' : 'm-2 p-3',
          this.color,
          this.clicked ? 'bg-gradient-to-tr from-purple-900 to-purple-500 hover:from-purple-800 hover:to-purple-500 transition duration-500 ease-in-out shadow' : '',
        ];
  
        return baseClass.join(' ');
      },
      IconClass() {
        return this.clicked ? 'text-white pr-3' : 'text-purple-700 pr-3';
      },
      TextClass() {
        return this.clicked ? 'text-white hover:text-white' : 'text-slate-700';
      },
    },
    methods: {
      handleClick() {
        this.clicked = !this.clicked;
      },
    },
    props: {
      text: String,
      size: {
        type: String,
        default: () => 'lg'
      },
      color: {
        type: String,
        default: () => 'gray-300'
      },
      icon: {
        type: String,
        default: () => 'circle'
      },
      active: {
        type: Boolean,
        default: () => false
      },
      clickable: {
        type: Boolean,
        default: () => false
      },
    },
  }
  </script>
  