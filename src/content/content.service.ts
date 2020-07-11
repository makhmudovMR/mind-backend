import { Injectable, Logger, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Mind, FollowRelation } from '../entity';
// import { Mind } from '../entity/Mind';

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
        // req.userInfo.id
        const posts = [];
        const me = 1;
        const following = await this.manager.getRepository(FollowRelation).find({where: {followerId:me}});
        console.log(following)
        const followingIds = following.map(item => {
            return item.userId
        })
        console.log(followingIds);
        const minds = await this.manager.getRepository(Mind).find({where: {__user: {id: followingIds }}});
        // console.log(minds);
        return minds;
    }

    async addMind(req, body){
        const user = await this.manager.getRepository(User).findOne(1);
        const mind = new Mind();
        mind.body = "user1";
        mind.user = user;
        mind.createdDate = new Date();
        this.manager.save(mind);
        return {message: "mind was added"};
    }
}
