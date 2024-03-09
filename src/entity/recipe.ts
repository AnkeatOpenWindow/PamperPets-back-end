// TODO, recipe enity

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Recipe{
    @PrimaryGeneratedColumn ()
    id: number = 0

    @Column ({length: 225})
    name!: string

    @Column ({length: 225})
    description!: string

    @Column ()
    amountCrafted!: number

}