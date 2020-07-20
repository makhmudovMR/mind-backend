import { Injectable, Logger, Post } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';
import { Mind, FollowRelation, MindTags } from '../entity';
// import { Mind } from '../entity/Mind';


@Injectable()
export class ContentService {
    constructor(
        @InjectEntityManager() private readonly manager: EntityManager,
    ) { }

    async getUser(req, body) {
        Logger.log(req.userInfo);
        const user = await this.manager.getRepository(User).findOne({ where: { id: req.userInfo.userId } });
        Logger.log(user);
        return { user };
    }

    async getUserInfo(req, body) {
        const user = await this.manager.getRepository(User).findOne({ where: { id: body.userId } });
        return user;
    }

    async getAuthUserInfo(req, body){
        const user: any = await this.manager.getRepository(User).findOne({ where: { id: req.userInfo.userId } });
        let following = await this.manager.getRepository(FollowRelation).find({where: {followerId: user.id}})
        let followers = await this.manager.getRepository(FollowRelation).find({where: {userId: user.id}})
        console.log(following)
        console.log(followers)
        let followingIds = following.map(item => item.userId)
        let followersIds = followers.map(item => item.followerId);
        console.log(followersIds);
        console.log(followingIds);
        let followingUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', {ids: followingIds}).getMany();
        let followerUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', {ids: followersIds}).getMany();
        user.follower = followerUsers;
        user.following = followingUsers;
        console.log(user)
        return user
    }

    async getUserMinds(req, body) {
        const user = await this.manager.getRepository(User).findOne(body.userId);
        const minds = await this.manager.getRepository(Mind).find({ where: { user: user } })
        return minds;
    }

    async getAllPost() {
        return await this.manager.getRepository(Post).find();
    }

    async getTags() {
        return await this.manager.getRepository(MindTags).find();
    }

    async followToUser(req, body) {
        const followRelation = new FollowRelation();
        followRelation.userId = body.followingId;
        followRelation.followerId = req.userInfo.id;
        await this.manager.save(followRelation);
        return { message: 'user is followed' };
    }

    async getFollowingPost(req, body) {
        console.log(req.userInfo)
        const following = await this.manager.getRepository(FollowRelation).find({ where: { followerId: req.userInfo.userId } });
        console.log('following',following);
        const followingIds = following.map(item => {
            return item.userId
        })
        console.log('followingIds',followingIds);
        // const minds = await this.manager.getRepository(Mind).find({ where: { __user: { id: followingIds } } });
        const minds = await this.manager.createQueryBuilder(Mind, 'mind').leftJoinAndSelect('mind.user', 'user').where('mind.userId IN (:...users)', {users: followingIds}).getMany();
        console.log('minds',minds);
        return minds;
    }

    // async getFollowingPost2(req, body) {
    //     const posts = [];
    //     const me = 1;
    //     const following = await this.manager.getRepository(FollowRelation).find({where: {followerId:me}});
    //     console.log(following)
    //     const followingIds = following.map(item => {
    //         return item.userId
    //     })
    //     console.log(followingIds);
    //     const minds = await this.manager.getRepository(Mind).find({where: {__user: {id: followingIds }}});
    //     return minds;
    // }

    async postMind(req, body) {
        const user = await this.manager.getRepository(User).findOne(req.userInfo.id);
        const mind = new Mind();
        mind.body = "user1";
        mind.user = user;
        mind.createdDate = new Date();
        this.manager.save(mind);
        return { message: "mind was added" };
    }
}
