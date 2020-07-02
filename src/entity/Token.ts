import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accessToken: string;

    @Column()
    refreshToken: string;

    @OneToOne(type => User)
    @JoinColumn()
    user: User;

}
