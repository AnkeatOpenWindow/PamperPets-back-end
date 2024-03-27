import express from "express";
import AppDataSource from "../datasource";
import { Recipe } from "../entity/recipe";
import { Ingredients } from "../entity/ingredients";
import { Inventory } from "../entity/inventory";

const recipeRouter = express.Router()

recipeRouter.use(express.json())
const appDataSource = AppDataSource
//todo: create CRUD

recipeRouter.get("/", async (req, res) => {
    try {
        const recipe = await appDataSource.getRepository(Recipe).createQueryBuilder("recipe")
            .leftJoinAndSelect("recipe.ingredients", "ingredient")
            .leftJoinAndSelect("ingredient.inventory", "inventory")
            .getMany()
        //optionally check the craftability here
        res.json(recipe);
    } catch (error) {
        console.log("something went wrong")
        return res.status(500).json({ message: error })
    }
})

//Update of recipe and inventory into when crafted 

recipeRouter.put("/:id/craft", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let {amount, ingredients} = req.body;

        var recipeRequest = await appDataSource.getRepository(Recipe).findOneBy({ id: id })

        if (!recipeRequest) {
            return res.status(500).json({message: "no recipe found"})
        } else {
            recipeRequest!.amountCrafted = amount // updates (already incremented in frontend)

            // Loop through thre ingredients and deduct the inventory amount 
            await updateInventoryAmounts(ingredients)

            // Save our recipe amount & return it 
            var newRecipeData = await appDataSource.getRepository(Recipe).save(recipeRequest);
            return res.json(newRecipeData)
        }
    } catch (error) {
        console.log("something went wrong:" + error)
        return res.status(500).json({ message: error })
    }
})




const updateInventoryAmounts = async (ingredients: Ingredients[]) => {
    try {
        for (var ingredient of ingredients){

            var inventoryItem = await appDataSource.getRepository(Inventory).findOneBy({id: ingredient.inventoryId})

            if (!inventoryItem) {
                throw new Error(`Inventory item with ID ${ingredient.inventoryId} not found`);
            }
            inventoryItem!.amount = ingredient.inventory!.amount - ingredient.amountNeeded
            await appDataSource.getRepository(Inventory).save(inventoryItem!)
        }
    } catch (error) {
        console.log("something went wrong: " + error)
        throw error;
    }
}


export default recipeRouter