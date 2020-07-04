import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm";

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

    // @OneToMany(type => User, user => user.followers)
    // followers: User

}
