<template>
  <v-container>
    <v-layout column>
      <customer-must-update-error v-if="customerMustUpdate" />
      <template v-else>
        <registration-menu />
        <registration-user-info />
        <login-info v-if="isShownLoginInfo" />
        <registration-confirm-info />
        <registration-request />
        <confirm-btn />
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import LoginInfo from '~/components/pages/registration/LoginInfo.vue'
import ConfirmBtn from '~/components/pages/registration/ConfirmBtn.vue'
import RegistrationUserInfo from '~/components/pages/common/RegistrationUserInfo.vue'
import RegistrationMenu from '~/components/pages/common/RegistrationMenu.vue'
import RegistrationConfirmInfo from '~/components/pages/common/RegistrationConfirmInfo.vue'
import RegistrationRequest from '~/components/pages/common/RegistrationRequest.vue'
import CustomerMustUpdateError from '~/components/pages/common/CustomerMustUpdateError.vue'

export default {
  middleware: [
    'init-shop-id',
    'fetch-menus-from-query',
    'set-date-time-from-query'
  ],
  components: {
    LoginInfo,
    ConfirmBtn,
    RegistrationUserInfo,
    RegistrationMenu,
    RegistrationConfirmInfo,
    RegistrationRequest,
    CustomerMustUpdateError
  },
  computed: {
    isShownLoginInfo() {
      return !this.isLogin
    },
    ...mapGetters('user', ['isLogin']),
    ...mapGetters('user', ['customerMustUpdate'])
  }
}
</script>
