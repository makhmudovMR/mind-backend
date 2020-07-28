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
        const user: any = await this.manager.getRepository(User).findOne({ where: { id: body.userId } });
        let following = await this.manager.getRepository(FollowRelation).find({ where: { followerId: body.userId } })
        let followers = await this.manager.getRepository(FollowRelation).find({ where: { userId: body.userId } })

        let followingIds = following.map(item => item.userId)
        let followersIds = followers.map(item => item.followerId);

        let followingUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', { ids: followingIds }).getMany();
        let followerUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', { ids: followersIds }).getMany();

        user.follower = followerUsers;
        user.following = followingUsers;
        user.followerLength = followerUsers.length;
        user.followingLength = followingUsers.length;

        return user;
    }

    async getAuthUserInfo(req, body) {
        const user: any = await this.manager.getRepository(User).findOne({ where: { id: req.userInfo.userId } });
        let following = await this.manager.getRepository(FollowRelation).find({ where: { followerId: user.id } })
        let followers = await this.manager.getRepository(FollowRelation).find({ where: { userId: user.id } })

        let followingIds = following.map(item => item.userId)
        let followersIds = followers.map(item => item.followerId);

        let followingUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', { ids: followingIds }).getMany();
        let followerUsers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...ids)', { ids: followersIds }).getMany();

        user.follower = followerUsers;
        user.following = followingUsers;
        user.followerLength = followerUsers.length;
        user.followingLength = followingUsers.length;

        console.log(user);

        return user;
    }

    async getUserMinds(req, body) {
        const user = await this.manager.getRepository(User).findOne(body.userId);
        const minds = await this.manager.getRepository(Mind).find({ where: { user: user } })
        return minds;
    }

    async getMindsByUserId(req, body) {
        const minds = await this.manager.getRepository(Mind).find({ where: { user: { id: body.userId } }, relations: ['user'] })
        return minds;
    }

    async getAllPost() {
        return await this.manager.getRepository(Post).find();
    }

    async getTags() {
        return await this.manager.getRepository(MindTags).find();
    }

    async followToUser(req, body) {
        const followingRelation = await this.manager.getRepository(FollowRelation)
            .findOne({ where: { followerId: req.userInfo.userId, userId: body.userId } });
        if (followingRelation) {
            this.manager.remove(followingRelation);
            return { message: 'follow relation is removed' };
        } else {
            const followRelation = new FollowRelation();
            followRelation.userId = body.userId;
            followRelation.followerId = req.userInfo.userId;
            await this.manager.save(followRelation);
            return { message: 'user is followed' };
        }
    }

    async getFollowingPost(req, body) {
        console.log(req.userInfo)
        const following = await this.manager.getRepository(FollowRelation).find({ where: { followerId: req.userInfo.userId } });
        console.log(following);
        console.log('---')
        const followingIds = following.map(item => {
            return item.userId
        })
        followingIds.push(req.userInfo.userId);
        console.log('---')
        console.log(followingIds)
        console.log('------')
        // const minds = await this.manager.getRepository(Mind).find({ where: { __user: { id: followingIds } } });
        const minds = await this.manager.createQueryBuilder(Mind, 'mind').leftJoinAndSelect('mind.user', 'user').where('mind.userId IN (:...users)', { users: followingIds }).orderBy('createdDate', 'DESC').getMany();
        console.log('minds', minds);
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
        const user = await this.manager.getRepository(User).findOne(req.userInfo.userId);
        const mind = new Mind();
        mind.body = body.body;
        mind.user = user;
        mind.createdDate = new Date();
        this.manager.save(mind);
        return { message: "mind was added" };
    }

    async getRelation(req, body) {
        const relation = await this.manager.getRepository(FollowRelation)
            .findOne({ where: { followerId: req.userInfo.userId, userId: body.userId } });
        if (relation !== null && relation !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    async getFollowers(req, body){
        console.log(body);
        let followersRelations = await this.manager.getRepository(FollowRelation).find({where: {userId: body.userId}})
        const followersIds = followersRelations.map(item => item.followerId);
        console.log(followersIds);
        const followers = await this.manager.createQueryBuilder(User, 'user').where('user.id IN (:...users)', {users: followersIds}).getMany();
        return followers;
    }
}
