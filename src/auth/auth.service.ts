import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectEntityManager() manager: EntityManager,
    ) { }

    login(body) {
        // TODO
    }
}
