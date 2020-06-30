import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import {User} from '../entity/User';

const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async login(body) {
        const user = await this.manager.getRepository(User).findOne({where:{username: body.login}})
        if (user !== null){
            if (user.password !== body.password){
                throw new Error('Invalid password')
            }
            const refresh_token = uuid()
            const access_token = jwt.sign({id: user.id}, 'mind')
            return {
                refresh_token,
                access_token
            }
        }
        // TODO
    }
}
