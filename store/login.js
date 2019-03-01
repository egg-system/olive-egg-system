import axios from 'axios'
import config from '~/config/constant.json'

/* state */
export const state = () => ({
  isLogin: false,
  isError: false,
  isLoading: false,
  id: '',
  firstName: '',
  lastName: '',
  firstNameKana: '',
  lastNameKana: '',
  mail: '',
  mail2: '',
  phoneNumber: ''
})

/* getters */
export const getters = {
  isLogin: state => state.isLogin
}

/* mutations */
export const mutations = {
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setIsError(state, error) {
    state.isError = error
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setId(state, id) {
    state.id = id
  },
  setFirstName(state, firstName) {
    state.firstName = firstName
  },
  setLastName(state, lastName) {
    state.lastName = lastName
  },
  setFirstNameKana(state, firstNameKana) {
    state.firstNameKana = firstNameKana
  },
  setLastNameKana(state, lastNameKana) {
    state.lastNameKana = lastNameKana
  },
  setMail(state, mail) {
    state.mail = mail
  },
  setMail2(state, mail) {
    state.mail2 = mail
  },
  setPhoneNumber(state, phoneNumber) {
    state.phoneNumber = phoneNumber
  },
  logout(state) {
    state.isLogin = false
  }
}

/* actions */
export const actions = {
  // ログインチェック
  async checkLogin({ commit }, { mail, password }) {
    // 一度エラーはリセットする
    commit('setIsError', false)
    // ローディング中にする
    commit('setIsLoading', true)

    // TODO:myjsonがPOSTに対応してないので一旦GETにする
    const result = await axios.get(config.api.customerLogin, {
      mail: mail,
      password: password
    })
    if (result.status === 200) {
      // テスト用
      if (mail === 'test1' && password === 'test1') {
        // ユーザーの入力値と一致していたらログイン状態をセット
        commit('setIsLogin', true)
        commit('setIsError', false)
        commit('setId', result.data.customer_id)
        commit('setFirstName', result.data.first_name)
        commit('setLastName', result.data.last_name)
        commit('setFirstNameKana', result.data.first_name_kana)
        commit('setLastNameKana', result.data.last_name_kana)
        commit('setMail', mail)
        commit('setMail2', mail)
        commit('setPhoneNumber', result.data.phone_number)
        return true
      } else {
        commit('setIsError', true)
        commit('setIsLoading', false)
        return false
      }
    } else {
      commit('setIsError', true)
      commit('setIsLoading', false)
      return false
    }
  }
}
