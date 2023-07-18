import { redirect } from "@sveltejs/kit";
import {API_URL} from "$env/static/private";
import axios from 'axios';

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    if (email === "" || password === "") {
      throw redirect(404, "/");
    }
    console.log(email + " ::: " + password);

    const response = await axios(
      {
        method:"POST",
        url: API_URL+"/sign-up",
        data:{email:email,password:password},
        headers:{key:String("1202")},
      }).catch((res)=>{
      console.log(res.status + "::" + "email is already in use");
      throw redirect(303, "/");
      });
    console.log(response.data);
    throw redirect(303,"/");
  },
};
