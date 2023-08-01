import {redirect} from '@sveltejs/kit'
import { db } from "$lib/server/db.js";
import { sql , eq} from "drizzle-orm";
import { users,items } from "$lib/server/schema.js";
let userData;
let allItems;
export async function load({ cookies }){
    const sessionid = await cookies.get('session_id');
    if (sessionid == undefined)
    {
      throw redirect(301,'/')
    }
    else
    {
      userData = await db.select().from(users).where(sql`${users.Id} = ${sessionid}`);
      allItems = await db.select().from(items);
        return { user: userData[0], items: allItems, }
    }
}
export const actions = {
    addMeal: async (event) => {
      const data = await event.request.formData();
      const mealName = data.get("meal-name");
      const mealDesc = data.get("meal-desc");
      userData[0].Meals.push({Name:mealName,Description:mealDesc,Dishes:[]});
      await db.update(users).set({Meals:userData[0].Meals}).where(eq(users.Id,userData[0].Id));
    },
    addItem: async (event) => {
      const data = await event.request.formData();
      const itemName = data.get("item-name");
      const itemAmount = data.get("item-amount");
      const mealIndex = event.url.searchParams.get("mealIndex");
      const item = allItems.find((item) => {
        return item.Name === itemName;
      })


      let selectedMeal = userData[0].Meals[mealIndex];


      if(!selectedMeal.Dishes)
        selectedMeal.Dishes = Array();

      selectedMeal.Dishes.push({
          Item:item.Id,
          Amount: parseFloat(itemAmount),
      });

      userData[0].Meals[mealIndex] = selectedMeal;

      await db.update(users).set({Meals:userData[0].Meals}).where(eq(users.Id,userData[0].Id));
    },

    removeMeal: async (event) => {
      const mealName = event.url.searchParams.get("mealName");
      const remIndex = userData[0].Meals.findIndex((meal) => meal.Name == mealName);
      console.log(userData[0].Meals.length);
      userData[0].Meals.splice(remIndex,1);
      console.log(userData[0].Meals.length);
      await db.update(users).set({Meals:userData[0].Meals}).where(eq(users.Id,userData[0].Id));
    },
    removeItem: async (event) => {
      const mealIndex = event.url.searchParams.get("mealIndex");
      const itemIndex = event.url.searchParams.get("itemIndex");

      userData[0].Meals[mealIndex].Dishes.splice(itemIndex,1);

      await db.update(users).set({Meals:userData[0].Meals}).where(eq(users.Id,userData[0].Id));
    },
};
