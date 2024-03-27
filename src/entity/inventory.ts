// Todo: 
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients";
import { OneToMany } from "typeorm";


@Entity()
export class Inventory {

    @PrimaryGeneratedColumn ()
    id!: number

    @Column()
    name!: string;

    @Column()
    icon!: string;

    @Column()
    description!: string;

    @Column()
    amount!: number;

    //id: number; 
    //name: string;
    //category: string;
    //icon: string;
    //description: string;
    //amount: number;  


    @OneToMany(() => Ingredients, (ingredients: Ingredients) => ingredients.inventory)
    public inventoryToCraftables?: Ingredients[];
}