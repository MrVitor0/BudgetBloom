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
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-purple-900 border-0"
                >
                    <div class="flex-auto px-4 lg:px-10 py-10 pt-5">
                      <div class="flex justify-center items-center">
                      <img src="@/assets/logo.png" class="w-7 h-7 mr-1">
                      <h1 class="text-2xl my-2 font-medium text-white"><span class="text-purple-300 pl-1">Purple</span>Wallet</h1>
                    </div>
                    <form @submit.prevent="signIn">
                       <div class="mt-5">
                        <div class="relative">
                          <div class="absolute left-3 top-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon="envelope" class="text-lg pt-2 text-purple-400" />
                          </div>
                          <div class="flex w-full">
                            <BBTextInput type="text" placeholder="Vitor Hugo" required v-model="name" class="rounded-md" /> 
                          </div>
                        </div>
                      </div>
                      <div class="mt-5">
                        <div class="relative">
                          <div class="absolute left-3 top-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon="envelope" class="text-lg pt-2 text-purple-400" />
                          </div>
                          <div class="flex w-full">
                            <BBTextInput type="email" placeholder="sample@sample.com" required v-model="email" class="rounded-md" /> 
                          </div>
                        </div>
                      </div>
                      <div class="mt-5">
                        <div class="relative">
                          <div class="absolute left-3 top-1/2 -translate-y-1/2">
                            <FontAwesomeIcon icon="lock" class="text-lg pt-2 text-purple-400" />
                          </div>
                          <div class="flex w-full">
                            <BBTextInput type="password" placeholder="******" required v-model="password" class="rounded-md" /> 
                          </div>
                        </div>
                      </div>
                      <div class="text-center mt-6">
                        <BasicButton text="Cadastar-se" icon="right-to-bracket" />
                        <BasicButton class="mt-3" @click="redirect_login()" text="Já tenho uma conta" icon="users" />
                      </div>
                    </form>
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
  import BBTextInput from '@/components/form/BBTextInput.vue';
  import BasicButton from '@/components/button/BasicButton.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  export default {
    name: "PurpleLogin",
    data() {
        return {
            rememberMe: true,
            name: '',
            email: '',
            password: '',
        };
    },
    methods: {
       redirect_login(){
        this.$router.push({ name: "Login" });
       },
        async signIn() {
            try {
                //check if name has at least 3 characters
                if(this.name.length < 5){
                    PWUtils.PWNotification('error', 'O nome deve ter pelo menos 5 caracteres');
                    return;
                }
                if(this.password.length < 6){
                    PWUtils.PWNotification('error', 'A senha deve ter pelo menos 6 caracteres');
                    return;
                }
                let response = await this.$store.dispatch("auth/register", { name: this.name, email: this.email, password: this.password, persist: true }); // Call the Vuex action
                PWUtils.PWNotification('success', response);
                this.$router.push({ name: "Home" });
            }
            catch (error) {
                PWUtils.PWNotification('error', error);
                console.log(error);
            }
        },
    },
    components: { BasicButton, BBTextInput ,FontAwesomeIcon}
}
</script>