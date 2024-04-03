// Todo: (douplicate 3)
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredients } from "./ingredients";
import { OneToMany } from "typeorm";
import { Location } from "./location";


@Entity()
export class Inventory {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @Column()
    icon!: string;

    @Column()
    description!: string;

    @Column()
    amount!: number;

    @Column()
    locationId!: number;


    //id: number; 
    //name: string;
    //category: string;
    //icon: string;
    //description: string;
    //amount: number; 
    // locationId!: number;


    @OneToMany(() => Ingredients, (ingredients: Ingredients) => ingredients.inventory)
    public inventoryToCraftables?: Ingredients[];

    @ManyToOne(() => Location, (location: Location) => location.inventory)
    @JoinColumn()
    public location?: Location;
} //added a locationid (one to many)
// add an entry of each inventory item of each location