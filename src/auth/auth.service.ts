import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

import jwt = require('jsonwebtoken');
import uuid = require('uuid/v4');

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async login(body) {
        const user = await this.manager.getRepository(User).findOne({ where: { username: body.username } });
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
            this.manager.save(token);
            return {
                refreshToken,
                accessToken,
            };
        }
        // TODO
    }

    async refreshToken(body) {
        const token = await this.manager.getRepository(Token).findOne({ where: { refreshToken: body.refreshToken } });
        if (!token) {
            const newAccessToken = jwt.sign({id: token.user.id}, 'mind');
            const newRefreshToken = uuid();
            const newToken = new Token();
            newToken.accessToken = newAccessToken;
            newToken.refreshToken = newRefreshToken;
            newToken.user = token.user;
            await this.manager.save(newToken);
            return {
                refreshToken: newRefreshToken,
                accessToken: newAccessToken,
            };
        } else {
            return {message: 'Wrong refresh token'};
        }
    }

    async register() {
        // TODO
    }

    async logout(body) {
        const tokens = await this.manager.getRepository(Token).find({where: {user: {id: body.user_id}}});
        if (tokens.length !== 0) {
            await this.manager.remove(tokens);
        }
        return null;
    }

    async allUsers() {
        return await this.manager.getRepository(User).find();
    }

    async allTokens() {
        return await this.manager.getRepository(Token).find();
    }
}
