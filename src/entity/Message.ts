import { Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn, Column} from 'typeorm'
import {Chat} from './Chat'
import { User } from './User';
@Entity()
export class Message {
    
    @PrimaryGeneratedColumn()
    id :number;

    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    message: string;

    @Column()
    date: Date;
}