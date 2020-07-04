import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm"
import { Mind } from "./Mind";

export class MindTags{

    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne((type) => Mind)
    @JoinColumn()
    mind: Mind;

    @Column()
    tag: string;
}