import { Controller, Post, Get, Req, Body } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {

    constructor(
        private readonly contentService: ContentService,
    ) { }

    @Get('getuserinfo')
    async getUserInfo(@Req() req, @Body() body) {
        return this.contentService.getUserInfo(req, body);
    }

    @Get('getallpost')
    async getAllPost() {
        // TODO
    }

    @Get('getfollowingpost')
    async getFollowingPost() {
        // TODO
    }

    @Post('makepost')
    async makePost() {
        // TODO
    }

    @Get('gettags')
    async getTags() {
        // TODO
    }

    @Post('searchpost')
    async searchPost() {
        // TODO
    }

}
