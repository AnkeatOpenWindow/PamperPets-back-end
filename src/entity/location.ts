import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";
import { Recipe } from "./recipe";

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({length:225})
    name: string = "placeholder"

    @Column({length:225})
    address: string = "placeholder"

    @Column()
    icon!: string;

    
    @OneToMany(() => Inventory, (inventory: Inventory) => inventory.location)
    public inventory?: Inventory[];

    @OneToMany(() => Recipe, (recipe: Recipe) => recipe.location)
    public recipe?: Recipe[];
}