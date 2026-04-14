export const formatCartItems = (cartItems: any[]) => {
  const items = cartItems.map((item) => {
    const product = item.product;
    const itemTotal = Number(product.price) * item.quantity;

    return {
      id: item.id,
      quantity: item.quantity,
      itemTotal,
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: Number(product.price),
        stock: product.stock
      }
    };
  });

  const summary = items.reduce(
    (accumulator, item) => {
      accumulator.totalItems += item.quantity;
      accumulator.totalAmount += item.itemTotal;
      return accumulator;
    },
    { totalItems: 0, totalAmount: 0 }
  );

  return {
    items,
    summary
  };
};
