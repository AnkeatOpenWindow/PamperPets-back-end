import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

//use the table called "users" , user is reserved for postgres
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0

    @Column({ length: 225 })
    username: string = "placeholder"

    @Column({ length: 225 })
    email: string = "email@gemail.com"

    @Column()
    password!: string

    @Column()
    years: number = 1

    @Column()
    isAdmin: boolean = false

    // BEFORE UPDATE  (own resrearch)
    // BeforeInsert run this code when ever calling getRepository.save()
    @BeforeInsert()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt)
    }

    // hash converts a string to a hash, and a salt gets added before the hash
    //1234, salt=> 1234salt
    //hash(1234salt)



    //install for Authentication(hashing password)
    
    //npm install bcrypt
    //npm install --save-dev @types/bcrypt
}