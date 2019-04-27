module.exports = {
  api: {
    customerLogin: 'http://localhost:8080/api/customers/sign_in',
    customerCreate: 'http://localhost:8080/api/customers',
    customerReset: 'http://localhost:8080/api/customers/password',
    reserveCommit: 'http://localhost:8080/api/reservations',
    menu: `http://localhost:8080/api/shops/:id/menus`,
    shop: `http://localhost:8080/api/shops/:id`,
    date: `http://localhost:8080/api/shops/:id/dates`
  }
}
