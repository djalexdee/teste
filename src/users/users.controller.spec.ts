import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
describe('UserController', () => {
  let app: INestApplication;
  let userService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    userService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /users', () => {
    it('should return status 200 (OK) and an array of users', async () => {
      const mockUsers = [
        { id: 1, name: 'User 1', age: 20, email: 'email@test.com' },
        { id: 2, name: 'User 2', age: 22, email: 'email@test.com' },
      ];

      jest.spyOn(userService, 'getAllUsers').mockResolvedValue(mockUsers);

      const response = await request(app.getHttpServer()).get('/users');

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body).toEqual(mockUsers);
    });

    it('should return status 500 (Internal Server Error) when an error occurs', async () => {
      jest
        .spyOn(userService, 'getAllUsers')
        .mockRejectedValue(new Error('Internal error'));
      const response = await request(app.getHttpServer()).get('/users');
      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
