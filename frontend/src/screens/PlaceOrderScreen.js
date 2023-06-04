import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.10 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      console.log(order);
      props.history.push("/order/" + order.id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Giao hàng
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h3>Thanh toán</h3>
          <div>
            Phương thức thanh toán: {cart.payment.paymentMethod}
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
              cartItems.length === 0 ?
                <div>
                  Giỏ trống
          </div>
                :
                cartItems.map(item =>
                  <li>
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
            <button className="button primary full-width" onClick={placeOrderHandler} >Đặt hàng</button>
          </li>
          <li>
            <h3>Tổng hợp đơn hàng</h3>
          </li>
          <li>
            <div>Sản phẩm</div>
            <div>${itemsPrice}</div>
          </li>
          <li>
            <div>Phí giao</div>
            <div>đ{shippingPrice}</div>
          </li>
          <li>
            <div>Thuế</div>
            <div>đ{taxPrice}</div>
          </li>
          <li>
            <div>Tổng cộng</div>
            <div>đ{totalPrice}</div>
          </li>
        </ul>



      </div>

    </div>
  </div>

}

export default PlaceOrderScreen;