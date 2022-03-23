import React, { useState, useEffect } from 'react';
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { login } from '../../action/userActions';
import FormContainer from '../FormContainer';

const LoginScreen = ({ location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, error, userInfo } = userLogin;

  const redirectUrl = searchParams.get('redirect')
    ? `${searchParams.get('redirect')}`
    : '';

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirectUrl}`, { replace: true });
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch login
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant={`danger`}>{error}</Message>}
      {loading && <Loader />}
      {userInfo && <Navigate to={`/${redirectUrl}`} replace={true} />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link
            to={
              redirectUrl !== '/'
                ? `/register?redirect=${redirectUrl}`
                : '/register'
            }
            style={{ textDecoration: 'none' }}
          >
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
