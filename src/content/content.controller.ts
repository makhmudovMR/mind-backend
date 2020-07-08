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

    @Get('getallpost')
    async getAllPost(@Req() req, @Body() body) {
        return this.contentService.getAllPost(req, body);
    }

    @Get('getfollowingpost')
    async getFollowingPost(@Req() req, @Body() body) {
        // return this.contentService.getFollowingPost(req, body);
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
