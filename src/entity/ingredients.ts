import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";
import { Recipe } from "./recipe";


@Entity()
export class Ingredients {
    @PrimaryGeneratedColumn()
    public ingredientId!: number

    @Column()
    public inventoryId!: number

    @Column()
    public amountNeeded!: number



    // many-one relationships inventory
    @ManyToOne(() => Inventory, (inventory) => inventory.inventoryToCraftables)
    public inventory?: Inventory



    //many-one relation to recipes
    @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
    public recipe?: Recipe

}