import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async getAllUsers() {
    return [
      {
        id: 1,
        name: 'John',
        age: 30,
        email: 'user@email.com',
      },
      {
        id: 2,
        name: 'Mike',
        age: 35,
        email: 'user2@email.com',
      },
    ];
  }
}
