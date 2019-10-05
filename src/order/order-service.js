const OrderService = {
  getOrderById(db, id) {
    return db
      .from('orders')
      .select('*')
      .where('id', id)
      .first()
  },
  insertOrder(db, newOrder) {
    return db
      .insert(newOrder)
      .into('orders')
      .returning('*')
      .then(([order]) => order)
      .then(order => 
        OrderService.getOrderById(db, order.id)  
      )
  }
};

module.exports = OrderService;