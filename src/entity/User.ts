import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable, JoinColumn} from "typeorm";

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
    @OneToMany(type => User, user => user.followers)
    @JoinColumn()
    followers: User[];

    @OneToMany(type => User, user => user.following)
    @JoinTable()
    following: User[];

}
