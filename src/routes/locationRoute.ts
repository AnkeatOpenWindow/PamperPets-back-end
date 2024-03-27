import  express from "express";
import AppDataSource from "../datasource";
import { Location } from "../entity/location";

const locationRouter = express.Router ()

locationRouter.use(express.json())
const appDataSource= AppDataSource
//todo: create CRUD

// Get all Location item
locationRouter.get("/", async (req, res)=>{
    try {
        const items = await appDataSource
                            .getRepository(Location)
                            .find()

        res.json(items)
    }catch(error){
        console.error("Error fetching location items", error);
        res.status(500).json({ error: "Internal Sever Error"});
    }
})

// update single location item
locationRouter.put("/:id", async (req, res)=>{
    
try {
    const id = parseInt (req.params.id) //id of the item we want to update

    const { name, adress, icon } = req.body//all the values that want to update

    // see if item exist
    const locationItem = await appDataSource.getRepository(Location)
                                             .findOneBy({id:id})



    //if(!locationItem){// if the item doesn't exit respond with 404
        //res.status(404).json({message:"No Item Found"})
    //}else{
        //update value
       // locationItem!.amount = amount
        //update all the vars of locationItem that you want

        //save the changes
       // const updateItem = await appDataSource.getRepository(Location).save(locationItem!)
       // res.json(updateItem)
    //}


    



} catch (error) {
    console.error("Error updating location items", error);
    res.status(500).json({ error: "Internal Sever Error"});
}


})



export default locationRouter