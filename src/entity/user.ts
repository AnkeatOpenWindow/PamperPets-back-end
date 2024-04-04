import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({length:225})
    username: string = "placeholder"

    @Column({length:225})
    email: string = "email@gemail.com"

    @Column()
    password!: string

    @Column()
    years: number = 1

    @Column()
    isAdmin: boolean = false

    @BeforeInsert()
    async hashPaswword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);    
    }

    
}