import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({default: 0})
    age: number;

    // How that thing is work ask Abakar
    @ManyToMany(type => User, user => user.followers)
    @JoinTable()
    followers: User[];

    @ManyToMany(type => User, user => user.following)
    @JoinTable()
    following: User[];

}
