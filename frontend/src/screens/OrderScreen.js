import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>
              Giao hàng
          </h3>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
            </div>
          </div>
          <div>
            <h3>Thanh Toán</h3>
            <div>
              Phương thức thanh toán: Thanh toán khi nhận hàng
            </div>
            <div>
              {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
            </div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>
                  Giỏ hàng
          </h3>
                <div>
                  Giá
          </div>
              </li>
              {
                order.orderItems.length === 0 ?
                  <div>
                    Giỏ hàng trống
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item.id}>
                      <div className="cart-image">
                        <img src={item.image} alt="product" />
                      </div>
                      <div className="cart-name">
                        <div>
                          <Link to={"/product/" + item.product}>
                            {item.name}
                          </Link>

                        </div>
                        <div>
                          Số lượng: {item.qty}
                        </div>
                      </div>
                      <div className="cart-price">
                        đ{item.price}
                      </div>
                    </li>
                  )
              }
            </ul>
          </div>


        </div>
        <div className="placeorder-action">
          <ul>
            
            <li>
              <h3>Tổng hợp</h3>
            </li>
            <li>
              <div>Tiền hàng</div>
              <div>đ{order.itemsPrice}</div>
            </li>
            <li>
              <div>Phí giao</div>
              <div>đ{order.shippingPrice}</div>
            </li>
            <li>
              <div>Thuế</div>
              <div>đ{order.taxPrice}</div>
            </li>
            <li>
              <div>Tổng cộng</div>
              <div>đ{order.totalPrice}</div>
            </li>
          </ul>



        </div>

      </div>
    </div>

}

export default OrderScreen;