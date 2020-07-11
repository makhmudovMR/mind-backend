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
    firstname: string;

    @Column()
    lastname: string;

    @Column({default: 0})
    age: number;

}
