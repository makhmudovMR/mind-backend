import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Token }from '../entity/Token';

import jwt = require('jsonwebtoken');
import uuid = require('uuid/v4');

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async login(body) {
        const user = await this.manager.getRepository(User).findOne({ where: { username: body.login } });
        if (user !== null) {
            if (user.password !== body.password) {
                throw new BadRequestException('Invalid password');
            }
            const refreshToken = uuid();
            const accessToken = jwt.sign({ id: user.id }, 'mind');
            const token = new Token();
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = user;
            this.manager.save(token)
            return {
                refreshToken,
                accessToken,
            };
        }
        // TODO
    }

    async refreshToken(body) {
        const token = this.manager.getRepository(Token).findOne({where: {accessToken: body.accessToken}})
        return;
    }
}
