import axios from 'axios'
import {redirect} from '@sveltejs/kit'
import {API_URL,API_KEY} from "$env/static/private"
let userData;
let items;
export async function load({ cookies }) {
    const res = await axios({
      method:"POST",
      url:API_URL+"/start",
      }).catch(()=>{ throw redirect(301,"/404")})

    const sessionid = await cookies.get('session_id');
    if (sessionid === undefined)
    {
      throw redirect(301,'/')
    }
    else
    {
    const userRes = await axios({
      method:"POST",
      url:API_URL+"/get-user",
      headers:{key:API_KEY,id:String(sessionid)},
    }).catch(() => {
      throw redirect(301,"/");
    })
    const itemsRes = await axios({
      method:"POST",
      url:API_URL+"/get-items",
      headers:{key:API_KEY},
    }).catch(() => {
      throw redirect(301,"/");
    })
      if(res)
      {
        userData = await userRes.data;
        items = await itemsRes.data;
        return {
          user: userRes.data,
          items: itemsRes.data,
        }
      }
    }
}
export const actions = {
    addMeal: async (event) => {
      const data = await event.request.formData();
      const mealName = data.get("meal-name");
      const mealDesc = data.get("meal-desc");
      const user = await event.cookies.get("session_id");

    const res = await axios({
      method:"POST",
      url:API_URL+"/add-meal",
      headers:{key:API_KEY,id:String(user)},
      data: { name: mealName, description: mealDesc},
    }).catch(() => {
      throw redirect(301,"/");
    })
    },
    addItem: async (event) => {
      const data = await event.request.formData();
      const itemName = data.get("item-name");
      const itemAmount = data.get("item-amount");
      const mealIndex = event.url.searchParams.get("mealIndex");
      const user = await event.cookies.get("session_id");
      const item = items.find((item) => {
        return item.Name === itemName;
      })

      let selectedMeal = await userData.Meals[mealIndex];


      if(!selectedMeal.Dishes)
        selectedMeal.Dishes = Array();

      selectedMeal.Dishes.push({
          Name: item.Name,
          Cratio: item.Cratio,
          Pratio: item.Pratio,
          Amount: parseFloat(itemAmount),
          Unit: item.Unit,
      });
      
      await axios({
        method: "POST",
        url: API_URL+"/update-meal",
        headers: { key: API_KEY, id: String(user)},
        data: {
          name: selectedMeal.Name,
          Description: selectedMeal.Description,
          Dishes: selectedMeal.Dishes,
        },
      });
    },

    removeMeal: async (event) => {
      const mealName = event.url.searchParams.get("mealName");
      const user = event.cookies.get("session_id");
    await axios({
      method: "POST",
      url: API_URL+"/rem-meal",
      headers: { key: API_KEY, id: String(user)},
      data: {name: mealName},
    }).catch((res) => {
      console.log(res);
      throw redirect(301,"/");
    })
    },
    removeItem: async (event) => {
      const mealIndex = event.url.searchParams.get("mealIndex");
      const itemIndex = event.url.searchParams.get("itemIndex");
      const user = await event.cookies.get("session_id");
      let selectedMeal = await userData.Meals[mealIndex];


      selectedMeal.Dishes.splice(itemIndex,1);
      
      await axios({
        method: "POST",
        url: API_URL+"/update-meal",
        headers: { key: API_KEY, id: String(user)},
        data: {
          name: selectedMeal.Name,
          Description: selectedMeal.Description,
          Dishes: selectedMeal.Dishes,
        },
      });
    },
};
