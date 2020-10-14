import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

// bootstrap imports
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
// component imports
import { Loader, Message } from 'components/common';
import { getOrderDetails, payOrder } from 'actions';
// constant imports
import { ORDER_PAY_RESET } from '../constants';

const OrderView = ({ match }) => {
  const orderId = match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderId, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2 className='mb-1'>Shipping</h2>
              <p className='mb-1'>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p className='mb-1'>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p className='mb-1'>
                <strong>Address:</strong> {order.shippingAddress.address},{' '}
                {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Delivered on: {order.deliveredWhen}
                </Message>
              ) : (
                <Message variant='danger'>Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2 className='mb-1'>Payment Method</h2>
              <p className='mb-1'>
                <strong>Method:</strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on: {order.paidWhen}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length > 0 ? (
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
                  {order.orderItems.map((item, index) => (
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
                          ${item.price}
                        </Col>
                        <Col md={2} className='text-right'>
                          $
                          {addDecimals(
                            Number((item.qty * item.price).toFixed(2))
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your order is empty</Message>
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
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {order.shippingPrice === 0
                      ? 'FREE'
                      : `$${order.shippingPrice}`}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid ? (
                <ListGroup.Item>
                  {loadingPay || !sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Message variant='success'>
                    <span style={{ textAlign: 'center', display: 'block' }}>
                      PAID
                    </span>
                  </Message>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export { OrderView };
