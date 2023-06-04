import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              placeholder = "Tìm sản phẩm"
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)
              }
            />
            <button type="submit">Tìm kiếm</button>
          </form>
        </li>
        <li>
          <p>Xếp theo{' '} </p>
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Mới nhất</option>
            <option value="lowest">Giá giảm dần</option>
            <option value="highest">Giá tăng dần</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product.id}>
              <div className="product">
                <Link to={'/product/' + product.id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
                <div className="product-name">
                  <Link to={'/product/' + product.id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">đ{product.price}</div>
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
