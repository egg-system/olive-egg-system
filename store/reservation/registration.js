import axios from 'axios'

/* state */
const initialState = {
  coupons: [],
  childrenCount: 0,
  isFirst: null,
  message: 'yes',
  isOk: null,
  request: '',
  isError: false,
  errorMessage: ''
}
export const state = () => Object.assign({}, initialState)

/* mutations */
export const mutations = {
  setCoupons(state, coupons) {
    state.coupons = coupons
  },
  setChildrenCount(state, childrenCount) {
    state.childrenCount = childrenCount
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

export const getters = {
  isValidRegistration(state, getters) {
    return typeof getters.isFirstValue === 'boolean'
  },
  canReceiveMail(state) {
    return state.message === 'yes'
  },
  isFirstValue(state, getters, rootState, rootGetters) {
    if (state.isFirst === null) {
      return !rootGetters['login/isLogin']
    }

    return state.isFirst
  },
  selectedCouponIds(state) {
    return state.coupons.map(coupon => coupon.id)
  },
  reservationParameters(state, getters, rootState, rootGetters) {
    const reservationAt = rootState.reservation.select.dateTime

    if (!reservationAt) {
      return null
    }

    // 回数券周りの処理を追加する
    return {
      customer_id: rootState.login.customerId,
      store_id: rootState.reservation.select.storeId,
      children_count: state.childrenCount,
      reservation_comment: state.request,
      reservation_date: reservationAt.format('YYYY-MM-DD'),
      start_time: reservationAt.format('HH:mm'),
      is_first: getters.isFirstValue,
      coupon_ids: getters.selectedCouponIds,
      reservation_details_attributes:
        rootGetters['reservation/select/reservationDetailsParameters']
    }
  }
}

/* actions */
export const actions = {
  resetAllInputed({ commit, rootState }) {
    commit('reset')
    commit('reservation/select/reset', null, { root: true })
    commit('login/reset', null, { root: true })
  },
  async registerCustomerWithReserve(context) {
    if (!context.getters.isValidRegistration) {
      context.commit('setError', 'パラメータが不正です。')
      return false
    }

    let doCreateReservation = true
    if (!context.rootGetters['login/isLogin']) {
      doCreateReservation = await context.dispatch(
        'login/createCustomer',
        null,
        {
          root: true
        }
      )
    }

    if (!doCreateReservation) {
      return
    }

    return await context.dispatch('createReservation')
  },
  async createReservation({ commit, getters }) {
    try {
      // 予約確定APIの実行
      const result = await axios.post(
        process.env.api.reserveCommit,
        getters.reservationParameters
      )
      return true
    } catch (error) {
      console.log(error)
      commit(
        'setError',
        '選択された日時が既に予約されてしまった可能性がございます。'
      )
      return false
    }
  }
}