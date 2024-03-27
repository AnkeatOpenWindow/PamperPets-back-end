// TODO, recipe enity

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients";

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

    //recipe can have an array of ingredients from ingredient entity
    @OneToMany(() => Ingredients, ingredients => ingredients.recipe)
    ingredients?: Ingredients[]

}