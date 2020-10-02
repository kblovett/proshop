import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import products from '../../products';

import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import { Rating } from 'components/common';

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} review${
                  product.numReviews !== 1 ? 's' : ''
                }`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Sold Out'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock > 0 ? 'Add to Cart' : 'Sold Out'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

ProductScreen.propTypes = {
  match: PropTypes.array.isRequired,
};

export { ProductScreen };
