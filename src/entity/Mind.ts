import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import { User } from "./User";

export class Mind {
    @PrimaryGeneratedColumn()
    id: string;

    @OneToOne(type => User)
    user: User;

    @Column()
    body: string;

    @Column()
    createdDate: Date;
}