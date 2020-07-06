import { Injectable, Logger, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';

@Injectable()
export class ContentService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async getUser(req, body) {
        Logger.log(req.userInfo);
        const user = await this.manager.getRepository(User).findOne({where: {id: req.userInfo.userId}});
        Logger.log(user);
        return {user};
    }

    async getAllPost(req, body) {
        return await this.manager.getRepository(Post).find();
    }

    async getFollowingPost(req, body) {
        return [];
    }
}
