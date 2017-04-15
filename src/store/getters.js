// export const cartProducts = state => {
//   return state.cart.added.map(({ id, quantity }) => {
//     const product = state.products.all.find(p => p.id === id)
//     return {
//       title: product.title,
//       price: product.price,
//       quantity
//     }
//   })
// }

export const orderedNotes = state => {
  return state.notes.sort((a, b) => {
    var aOrder = state.notesOrder[a['.key']]
    var bOrder = state.notesOrder[b['.key']]
    if (aOrder === undefined || aOrder === null) return -1
    if (aOrder === bOrder) return 0
    if (aOrder < bOrder) return -1
    return 1
  })
}
