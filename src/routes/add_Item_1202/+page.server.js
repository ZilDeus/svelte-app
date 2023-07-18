import { redirect } from "@sveltejs/kit";
import { API_URL,API_KEY } from "$env/static/private"
import axios from 'axios';

export const actions = {

  default: async ({request}) => {
    const form = await request.formData();
    const name = form.get("name");
    const cRatio = form.get("Cratio");
    const pRatio = form.get("Pratio");
    const unit = form.get("unit");

    const response = await axios(
      {
        method:"POST",
        url:API_URL+"/add_item_8",
        data:{name:String(name),cratio:parseFloat(cRatio),pratio:parseFloat(pRatio),unit:String(unit)},
        headers:{key:String("1202")},
      }).catch((res)=>{
      console.log(res.status + "::" + "item could not be creted");
      throw redirect(303, "/");
      });
    console.log(response.data);
  },
};
