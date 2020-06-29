import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import {InjectEntityManager} from '@nestjs/typeorm';
import { User } from './entity/User';
@Injectable()
export class AppService {
  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,
  ) { }
  async getHello() {
    return await this.manager.getRepository(User).find();
  }
}
