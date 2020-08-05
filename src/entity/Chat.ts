import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm'
import { User } from './User';
import { Message } from './Message';

@Entity()
export class Chat {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user1: User;

    @OneToOne(() => User)
    @JoinColumn()
    user2: User;

    @OneToMany(() => Message, message => message.chat)
    @JoinColumn()
    messages: Message;
}