import { Controller } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {

    constructor(
        private readonly contentService: ContentService,
    ) { }

    async getUserInfo() {
        // TODO
    }

    async getAllPost() {
        // TODO
    }

    async getFollowingPost() {
        // TODO
    }

    async makePost() {
        // TODO
    }

    async getTags() {
        // TODO
    }

    async searchPost() {
        // TODO
    }

}
