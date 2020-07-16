import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Token } from '../entity/Token';

import jwt = require('jsonwebtoken');
import uuid = require('uuid/v4');
import { FollowRelation } from '../entity/FollowRelation';
// import { FollowRelation, Mind, MindTags, Token, User} from '../entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async login(body) {
        console.log(body);
        const user = await this.manager.getRepository(User).findOne({ where: { username: body.username } });
        console.log(user);
        if (user !== null) {
            if (user.password !== body.password) {
                throw new BadRequestException('Invalid password');
            }
            const refreshToken = uuid();
            const accessToken = jwt.sign({ userId: user.id }, 'mind');
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
        else {
            return {message: 'Wrong username or password.'}
        }
    }

    async refreshToken(body) {
        const token = await this.manager.getRepository(Token).findOne({ where: { refreshToken: body.refreshToken } });
        if (token) {
            await this.manager.remove(token);
            const newAccessToken = jwt.sign({userId: token.user.id}, 'mind');
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

    async register(body) {
        if (body.password === body.password_confirm) {
            const newUser = new User();
            newUser.username = body.username;
            newUser.firstname = body.firstname;
            newUser.lastname = body.lastname;
            newUser.password = body.password;
            this.manager.save(newUser);
            return {message: 'User is registered'};
        }
        return {message: 'Register Error'};
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
        return await this.manager.getRepository(Token).find({relations:['user']});
    }

    // async addUser(body){
    //     const newUser = new User();
    //     newUser.username = body.username;
    //     newUser.password = body.password;
    //     newUser.firstname = body.firstname;
    //     newUser.lastname = body.lastname;
    //     newUser.age = body.age;
    //     await this.manager.save(newUser);
    //     return {message: 'User was added'};
    // }

    // async followToUser(body){
    //     const followRelation = new FollowRelation();
    //     followRelation.userId = body.userId;
    //     followRelation.followerId = body.followerId;
    //     await this.manager.save(followRelation);
    //     return {message: 'Relation was created'};
    // }

}
