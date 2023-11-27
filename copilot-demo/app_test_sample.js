const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;

// Import your app
const app = require('./app');

describe('POST /email', () => {
  it('should respond with a success message when a valid email is provided', (done) => {
    request(app)
      .post('/email')
      .send({ email: 'test@example.com' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.equal('Email saved successfully');
        done();
      });
  });

  it('should respond with an error message when an invalid email is provided', (done) => {
    request(app)
      .post('/email')
      .send({ email: 'invalid email' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.equal('Email is not in proper format');
        done();
      });
  });

  it('should respond with an error message when no email is provided', (done) => {
    request(app)
      .post('/email')
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.equal('Email is required');
        done();
      });
  });
});