import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne} from "typeorm"
import { User } from "./User";
import { MindTags } from "./MindTags";

@Entity()
export class Mind {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

    @Column()
    body: string;

    @ManyToMany(type => MindTags, mindTag => mindTag.mind)
    tags: MindTags[];

    @Column()
    createdDate: Date;

}