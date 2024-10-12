import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Nest Bookshelf API!');
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('Admin JSON Web Token (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login using admin.test@mail.com and get admin access token
    const loginResponse = await request(app.getHttpServer())
      .post('/v1/admin/auth/login')
      .send({
        email: 'admin.test@mail.com',
        password: 'password',
      });

    accessToken = loginResponse.body.accessToken;
  });

  // Test positive test case by hitting admin API using valid access token
  it('/v1/admin/books (GET) - with valid token', () => {
    return request(app.getHttpServer())
      .get('/v1/admin/books') // Try hitting admin find all books API
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200); // Expect success response from hitting admin API
  });

  // Test negative test case by hitting admin API using invalid access token
  it('/v1/admin/books (GET) - with invalid token', () => {
    return request(app.getHttpServer())
      .get('/v1/admin/books') // Try hitting admin find all books API
      .set('Authorization', 'Bearer invalidToken')
      .expect(401); // Expect unauthorized response from hitting admin API
  });

  // Test negative test case by hitting user API using valid access token
  it('/v1/user/books (GET) - with valid token', () => {
    return request(app.getHttpServer())
      .get('/v1/user/books') // Try hitting user find all books API
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401); // Expect unauthorized response from hitting user API
  });

  afterAll(async () => {
    await app.close();
  });
})

describe('User JSON Web Token (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login using user.test@mail.com and get user access token
    const loginResponse = await request(app.getHttpServer())
      .post('/v1/user/auth/login')
      .send({
        email: 'user.test@mail.com',
        password: 'password',
      });

    accessToken = loginResponse.body.accessToken;
  });

  // Test positive test case by hitting user API using valid access token
  it('/v1/user/books (GET) - with valid token', () => {
    return request(app.getHttpServer())
      .get('/v1/user/books') // Try hitting user find all books API
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200); // Expect success response from hitting user API
  });

  // Test negative test case by hitting user API using invalid access token
  it('/v1/user/books (GET) - with invalid token', () => {
    return request(app.getHttpServer())
      .get('/v1/user/books') // Try hitting user find all books API
      .set('Authorization', 'Bearer invalidToken')
      .expect(401); // Expect unauthorized response from hitting user API
  });

  // Test negative test case by hitting admin API using valid access token
  it('/v1/admin/books (GET) - with valid token', () => {
    return request(app.getHttpServer())
      .get('/v1/admin/books') // Try hitting admin find all books API
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(401); // Expect unauthorized response from hitting admin API
  });

  afterAll(async () => {
    await app.close();
  });
})
