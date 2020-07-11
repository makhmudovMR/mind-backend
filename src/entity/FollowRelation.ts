import {Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm'
import { User } from './User';

@Entity()
export class FollowRelation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    followerId: number;
}