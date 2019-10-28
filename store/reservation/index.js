import { route } from '../../lib/route'

/* state */
export const state = () => ({
  doCancel: false,
  reservations: [],
  totalPages: 0
})

/* mutations */
export const mutations = {
  setReservations(state, reservations_param) {
    let reservations = reservations_param

    // 配列ではない場合、配列に変換する
    if (!Array.isArray(reservations)) {
      reservations = [reservations]
    }

    state.reservations = reservations
  },
  setReservationDatas(state, { reservations, totalPages }) {
    state.reservations = reservations
    state.totalPages = totalPages
  },
  setDoCancel(state, doCancel) {
    state.doCancel = doCancel
  }
}

/* actions */
export const actions = {
  async getReservation({ commit, rootGetters }, id) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    const { data } = await authenticatedApi.get(reservationPath)
    commit('setReservations', data.data)
    return true
  },
  async getReservations({ commit, rootState, rootGetters }, page) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationsRoute = route(process.env.api.reserveCommit, null, {
      page: page,
      customer_id: rootState.user.customerId
    })
    const { data } = await authenticatedApi.get(reservationsRoute)

    commit('setReservationDatas', {
      reservations: data.data,
      totalPages: data.total_pages
    })
    return true
  },
  async destroyReservation({ rootGetters }, id) {
    const authenticatedApi = rootGetters['user/authenticatedApi']
    const reservationPath = route(process.env.api.reservation, { id })

    await authenticatedApi.delete(reservationPath)
    return true
  }
}
