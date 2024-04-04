import express from "express";
import AppDataSource from "../datasource";
import { Inventory } from "../entity/inventory";

const inventoryRouter = express.Router()

inventoryRouter.use(express.json())
const appDataSource = AppDataSource
//todo: create CRUD

// Get all Inventory item
inventoryRouter.get("/:locationId", async (req, res) => {
    try {
        const  locationId  = + req.params.locationId; // Retrieve locationId from query parameters

        const items = await appDataSource
            .getRepository(Inventory).createQueryBuilder("inventory")
            .where("inventory.locationId = :id", { id: locationId })
            .getMany();

        res.json(items);
    } catch (error) {
        console.error("Error fetching inventory items", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); // TODO: update this get by passing the location id (url param, or body params)

// update single Inventory item
inventoryRouter.put("/:id", async (req, res) => {

    try {
        const id = parseInt(req.params.id) //id of the item we want to update

        const { name, category, icon, description, amount } = req.body//all the values that want to update

        // see if item exist
        const inventoryItem = await appDataSource.getRepository(Inventory)
            .findOneBy({ id: id })



        if (!inventoryItem) {// if the item doesn't exit respond with 404
            res.status(404).json({ message: "No Item Found" })
        } else {
            //update value
            inventoryItem!.amount = amount
            //update all the vars of inventoryItem that you want

            //save the changes
            const updateItem = await appDataSource.getRepository(Inventory).save(inventoryItem!)
            res.json(updateItem)
        }






    } catch (error) {
        console.error("Error updating inventory items", error);
        res.status(500).json({ error: "Internal Sever Error" });
    }


})



export default inventoryRouter