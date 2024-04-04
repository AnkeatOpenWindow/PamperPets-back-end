// TODO, recipe enity

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients";
import { Location } from "./location";

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

    @Column({nullable:true})
    locationId?: number;
    

    //recipe can have an array of ingredients from ingredient entity
    @OneToMany(() => Ingredients, ingredients => ingredients.recipe)
    ingredients?: Ingredients[]

    @ManyToOne(() => Location, (location: Location) => location.recipe)
    @JoinColumn()
    public location?: Location;
}