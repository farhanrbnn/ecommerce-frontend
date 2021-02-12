module.exports = (order, orderData) => {
  for (let i = 0; i < orderData.length; i++) {
    if (order.product === orderData[i].product) {
      let totalQuantity = order.quantity + orderData[i].quantity

      orderData[i].quantity = totalQuantity
      orderData.splice(i, 1)
    }
  }
  return orderData
}
