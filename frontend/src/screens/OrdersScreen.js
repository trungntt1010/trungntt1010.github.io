import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';

function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order.id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NGÀY</th>
              <th>TỔNG CỘNG</th>
              <th>USER</th>
              <th>ĐÃ THANH TOÁN</th>
              <th>PAID AT</th>
              <th>ĐÃ GIAO</th>
              <th>CHUYỂN TỚI</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.createdAt}</td>
              <td>{order.totalPrice}</td>
              <td>{order.username}</td>
              <td>{order.isPaid.toString()}</td>
              <td>{order.paidAt}</td>
              <td>{order.isDelivered.toString()}</td>
              <td>{order.deliveredAt}</td>
              <td>
                <Link to={"/order/" + order.id} className="button secondary" >Chi tiết</Link>
                {' '}
                <button type="button" onClick={() => deleteHandler(order)} className="button secondary">Xóa đơn</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersScreen;