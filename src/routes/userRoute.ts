import express from "express";
import AppDataSource from "../datasource";
import { User } from "../entity/user";
import * as bcrypt from 'bcrypt';

const userRouter = express.Router()

userRouter.use(express.json())
const appDataSource = AppDataSource

userRouter.post("/" , async (req, res) =>{

    try {

        const {username, email, password, years, isAdmin} = req.body

        var newUser = new User()

        newUser.username = username
        newUser.email = email
        newUser.password = password //hashing
        newUser.years = years
        newUser.isAdmin = isAdmin

        var addedUser = await appDataSource.getRepository(User).save(newUser);

        return res.json(addedUser)

    } catch (error) {
        console.log("Error occured: " + error) 
        return res. status(500).json({message : error})
    }

})

userRouter.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;

        if(username && password){

            let userRequest = await appDataSource.getRepository(User).findOneBy({username: username})

            if(!userRequest){
                return res.status(404).json({message: "No User Found"})
            } else {

                bcrypt.compare(password, userRequest.password, (error, result) => {

                    if (result) { 
                        userRequest!.password = "" 
                        return res.json(userRequest)
                    } else {
                        return res.status(500).json({message: 'Invalid Credentials'});
                    }
                })
            }

        } else {
            return res.status(500).json({message: "Invalid Credentials"})
        }

    } catch (error){
        console.log("Error message: " + error)
        return res.status(500).json ({message: error})
    }
})

export default userRouter