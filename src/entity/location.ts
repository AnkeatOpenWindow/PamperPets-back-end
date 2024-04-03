import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";

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
    
}