import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../Product';

const HomeScreen = () => {
  const [products, setProdusts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProdusts(data);
    };
    fetchProducts();
  }, []);

  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default HomeScreen;
