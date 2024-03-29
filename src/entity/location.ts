import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({length:225})
    name: string = "placeholder"

    @Column({length:225})
    adress: string = "placeholder"

    @Column()
    icon!: string;

    
}