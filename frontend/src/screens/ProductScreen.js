import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props) {
  console.log("product");
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("review submit");
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    console.log("save rview");

    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    console.log("add to cart")
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
    console.log("add to cart done") 
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Trở về trang chủ</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>{product.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' đánh giá'}
                    />
                  </a>
                </li>
                <li>
                  Giá: <b>${product.price}</b>
                </li>
                <li>
                  Mô tả:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Giá: {product.price}</li>
                <li>
                  Tình trạng:{' '}
                  {product.countInStock > 0 ? 'Còn hàng' : 'Không còn hàng'}
                </li>
                <li>
                  Số Lượng:{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {product.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Thêm vào giỏ
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Đánh giá</h2>
            {!product.reviews.length && <div>Không có đánh giá nào</div>}
            <ul className="review" id="reviews">
              {product.reviews.map((review) => (
                <li key={review.id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Viết đánh giá sản phẩm</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Mức độ</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Tệ</option>
                          <option value="2">2- Tạm</option>
                          <option value="3">3- Tốt</option>
                          <option value="4">4- Rất tốt</option>
                          <option value="5">5- Tuyệt vời</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Bình luận</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Đăng
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
