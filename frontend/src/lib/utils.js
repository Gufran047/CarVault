export const formatPrice = (price) => {
  return "₹ " + Number(price).toLocaleString()
}