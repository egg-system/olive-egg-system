<template>
  <div class="userinfo">
    <v-layout row>
      <v-flex xs3>
        住所
      </v-flex>
      <v-layout column>
        <v-layout row>
          <v-flex xs3 class="address-sub">
            郵便番号
          </v-flex>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="postalCode"
                :rules="postalCodeRules"
                :disabled="isConfirm"
                :clearable="!isConfirm"
                type="text"
                label="郵便番号"
              />
            </v-flex>
          </v-layout>
        </v-layout>

        <v-layout row>
          <v-flex xs3 class="address-sub">
            都道府県
          </v-flex>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="prefecture"
                :disabled="isConfirm"
                :clearable="!isConfirm"
                type="text"
                label="都道府県"
              />
            </v-flex>
          </v-layout>
        </v-layout>

        <v-layout row>
          <v-flex xs3 class="address-sub">
            市区町村以下
          </v-flex>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="city"
                :disabled="isConfirm"
                :clearable="!isConfirm"
                type="text"
                label="市区町村以下"
              />
            </v-flex>
          </v-layout>
        </v-layout>
      </v-layout>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkPostalCode } from '~/lib/validation'

export default {
  props: {
    isConfirm: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    postalCodeRules: [postalCode => checkPostalCode(postalCode)]
  }),
  computed: {
    postalCode: {
      get() {
        return this.$store.state.user.postalCode
      },
      set(value) {
        this.setPostalCode(value)
      }
    },
    prefecture: {
      get() {
        return this.$store.state.user.prefecture
      },
      set(value) {
        this.setPrefecture(value)
      }
    },
    city: {
      get() {
        return this.$store.state.user.city
      },
      set(value) {
        this.setCity(value)
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setPostalCode', 'setPrefecture', 'setCity'])
  }
}
</script>

<style scoped>
.userinfo {
  padding-top: 20px;
  text-align: left;
}
.address-sub {
  margin-top: 20px;
}
</style>
