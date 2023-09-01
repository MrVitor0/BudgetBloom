<template>
    <div>
      <main>
        <section class="absolute w-full h-full">
          <div
            class="absolute top-0 w-full h-full bg-purple-700"
            style="background-size: 100%; background-repeat: no-repeat;"
            :style="{'background-image': 'url(' + require('@/assets/register_bg_2.png') + ')'}"
          ></div>
          <div class="container mx-auto px-4 h-full">
            <div class="flex content-center items-center justify-center h-full">
              <div class="w-full lg:w-4/12 px-4">
                <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
                >
                  <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
                    <div class="text-gray-500 text-center mb-3 font-bold">
                      <small>PurpleWallet</small>
                    </div>
                    <form @submit.prevent="signIn">
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          
                          >Email</label
                        ><input
                          type="text"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          required
                          v-model="email" 
                          style="transition: all 0.15s ease 0s;"
                        />
                      </div>
                      <div class="relative w-full mb-3">
                        <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                          >Password</label
                        ><input
                          type="password"
                          class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          required
                          v-model="password"
                          style="transition: all 0.15s ease 0s;"
                        />
                      </div>
                      <div class="text-center mt-6">
                        <button
                          class="bg-purple-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style="transition: all 0.15s ease 0s;"
                          
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="flex flex-wrap mt-6">
                  <div class="w-1/2">
                    <a href="#"  class="text-gray-300"
                      ><small>Forgot password?</small></a
                    >
                  </div>
                  <div class="w-1/2 text-right">
                    <a href="#" class="text-gray-300"
                      ><small>Create new account</small></a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>
  <script>
  import PWUtils from '@/utils/PWUtils';
  export default {
    name: "PurpleLogin",
    data() {
      return {
        rememberMe: true,
        email: '',
        password: '',
      };
    },
    methods: {
        async signIn() {
            try {
                let response = await this.$store.dispatch("auth/login", {email: this.email, password: this.password, persist: true}); // Call the Vuex action
                PWUtils.PWNotification('success',  response);
                this.$router.push({ name: "Travel" });
            } catch (error) {
                PWUtils.PWNotification('error', error);
                console.log(error);
            }
        },
    },
  }
</script>