import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// bootstrap imports
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// component imports
import { CheckoutSteps, Message } from 'components/common';
import { createOrder } from 'actions';
// utility imports
import { numberFormat } from 'utils/numberFormatter';

const PlaceOrderView = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const {
    shippingAddress: { address, city, postalCode, country },
    paymentMethod,
    cartItems,
  } = cart;

  // calculations
  cart.itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 10 ? 0 : 10;
  cart.taxPrice = 0.05 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  //console.log(cart.itemsPrice, cart.taxPrice, cart.totalPrice);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: numberFormat('cur-store', cart.itemsPrice),
        shippingPrice: numberFormat('cur-store', cart.shippingPrice),
        taxPrice: numberFormat('cur-store', cart.taxPrice),
        totalPrice: numberFormat('cur-store', cart.totalPrice),
      })
    );
  };

  return (
    <>
      <CheckoutSteps sign ship pay place />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {address}, {city} {postalCode},{' '}
                {country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method of Payment:</strong> {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length > 0 ? (
                <ListGroup variant='flush'>
                  <Row>
                    <Col md={2}>Picture</Col>
                    <Col>Item Name</Col>
                    <Col md={1}>Qty</Col>
                    <Col md={2} className='text-center'>
                      Each
                    </Col>
                    <Col md={2} className='text-center'>
                      Total
                    </Col>
                  </Row>
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={1} className='text-right'>
                          {item.qty}
                        </Col>
                        <Col md={2} className='text-right'>
                          {numberFormat('cur-display', item.price)}
                        </Col>
                        <Col md={2} className='text-right'>
                          {numberFormat('cur-display', item.price * item.qty)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your cart is empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>{numberFormat('cur-display', cart.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {cart.shippingPrice === 0
                      ? 'FREE'
                      : `${numberFormat('cur-display', cart.shippingPrice)}`}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>{numberFormat('cur-display', cart.taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>{numberFormat('cur-display', cart.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant='danger'>{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { PlaceOrderView };
