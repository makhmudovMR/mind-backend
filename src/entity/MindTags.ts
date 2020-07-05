import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm"
import { Mind } from "./Mind";

export class MindTags{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToMany((type) => Mind, mind => mind.tags)
    @JoinTable()
    mind: Mind[];

    @Column()
    tag: string;
}