import axios from 'axios'

/* state */
const initialState = {
  menuId: '',
  coupon: null,
  pregnancyTermSelected: '',
  childrenSelected: '',
  isFirst: true,
  message: 'yes',
  isOk: null,
  request: '',
  isError: false,
  errorMessage: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setCoupon(state, coupon) {
    state.coupon = coupon
  },
  setPregnancyTermSelected(state, pregnancyTermSelected) {
    state.pregnancyTermSelected = pregnancyTermSelected
  },
  setChildrenSelected(state, childrenSelected) {
    state.childrenSelected = childrenSelected
  },
  setIsFirst(state, isFirst) {
    state.isFirst = isFirst
  },
  setMessage(state, message) {
    state.message = message
  },
  setIsOk(state, isOk) {
    state.isOk = isOk
  },
  setRequest(state, request) {
    state.request = request
  },
  setMenuId(state, menuId) {
    state.menuId = menuId
  },
  setError(state, errorMessage) {
    // stateを初期化
    state = Object.assign(state, initialState)
    // エラー情報だけセットする
    state.isError = true
    state.errorMessage = errorMessage
  },
  reset(state) {
    state = Object.assign(state, initialState)
  }
}

/* actions */
export const actions = {
  async reserveCommit({ state, commit }, customerId) {
    console.log('reserveCommit')
    console.log(state)
    console.log(state.menuId)
    // 必須パラメータのチェック
    if (
      state.menuId === '' ||
      state.menuId === null ||
      state.menuId === undefined ||
      (state.isFirst === '' ||
        state.isFirst === null ||
        state.isFirst === undefined)
    ) {
      commit('setError', 'パラメータが不正です。')
      return false
    }
    // 予約確定APIの実行
    const result = await axios.get(process.env.api.reserveCommit, {
      menu_id: state.menuId,
      is_first: state.isFirst,
      customer_id: customerId,
      is_use_coupon: state.coupon,
      pregnancy_term: state.pregnancyTermSelected,
      children: state.childrenSelected,
      is_get_message: state.message,
      request: state.request
    })
    if (result.status === 200) {
      commit('reset')
      return true
    } else {
      commit('setError', '予約に失敗しました。')
      return false
    }
  }
}
