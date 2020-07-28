import { Controller, Post, Get, Req, Body } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {

    constructor(
        private readonly contentService: ContentService,
    ) { }

    @Get('getuser')
    async getUser(@Req() req, @Body() body) {
        return this.contentService.getUser(req, body);
    }

    @Post('getuserinfo')
    async getUserInfo(@Req() req, @Body() body) {
        return this.contentService.getUserInfo(req, body);
    }

    @Get('getallpost')
    async getAllPost() {
        return this.contentService.getAllPost();
    }

    @Get('getfollowingpost')
    async getFollowingPost(@Req() req, @Body() body) {
        return this.contentService.getFollowingPost(req, body);
    }

    @Post('postmind')
    async makePost(@Req() req, @Body() body) {
        return this.contentService.postMind(req, body);
    }

    @Post('followtouser')
    async followToUser(@Req() req, @Body() body) {
        return this.contentService.followToUser(req, body);
    }

    @Get('gettags')
    async getTags() {
        return this.contentService.getTags();
    }


    @Get('getauthuserinfo')
    async getAuthUserInfo(@Req() req, @Body() body) {
        return this.contentService.getAuthUserInfo(req, body);
    }

    @Post('getmindsbyuserid')
    async getMindsByUserId(@Req() req, @Body() body) {
        return this.contentService.getMindsByUserId(req, body);
    }

    @Post('getrelation')
    async getRelation(@Req() req, @Body() body) {
        return this.contentService.getRelation(req, body);
    }

    @Post('getfollowers')
    async getFollowers(@Req() req, @Body() body){
        return this.contentService.getFollowers(req, body);
    }

    // @Post('searchpost')
    // async searchPost() {}

}
