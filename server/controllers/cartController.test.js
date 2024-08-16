const request = require('supertest');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { removeFromCart } = require('./cartController'); // Adjust the path as necessary
const User = require('./models/User'); // Adjust the path as necessary
const Product = require('./models/Product'); // Adjust the path as necessary

app.use(bodyParser.json());
app.post('/removeFromCart', removeFromCart);

jest.mock('./models/User');
jest.mock('./models/Product');

describe('removeFromCart API', () => {
  let user;
  let product;

  beforeEach(() => {
    user = {
      _id: 'userId',
      cart: [{ productId: 'productId', quantity: 2 }],
      save: jest.fn().mockResolvedValue(true),
    };
    product = { _id: 'productId' };
  });

  it('should remove an item from the cart successfully', async () => {
    User.findById.mockResolvedValue(user);
    Product.findById.mockResolvedValue(product);

    const res = await request(app)
      .post('/removeFromCart')
      .send({ userId: 'userId', productId: 'productId' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Item removed from cart');
    expect(user.cart[0].quantity).toBe(1);
  });

  it('should return 404 if user not found', async () => {
    User.findById.mockResolvedValue(null);
    Product.findById.mockResolvedValue(product);

    const res = await request(app)
      .post('/removeFromCart')
      .send({ userId: 'userId', productId: 'productId' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User or product not found');
  });

  it('should return 404 if product not found', async () => {
    User.findById.mockResolvedValue(user);
    Product.findById.mockResolvedValue(null);

    const res = await request(app)
      .post('/removeFromCart')
      .send({ userId: 'userId', productId: 'productId' });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('User or product not found');
  });

  it('should return 500 if there is a server error', async () => {
    User.findById.mockRejectedValue(new Error('Server error'));

    const res = await request(app)
      .post('/removeFromCart')
      .send({ userId: 'userId', productId: 'productId' });

    expect(res.status).toBe(500);
    expect(res.body.msg).toBe('server error');
  });
});