import { redirect } from "@sveltejs/kit";
import axios from 'axios';
import {API_URL,API_KEY} from "$env/static/private";

export async function load({ cookies }) {
    const res = await axios({
      method:"POST",
      url: API_URL+"/start",
      }).catch(()=>{ throw redirect(301,"/404")})
}

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
        url:API_URL+"/sign-in",
        data:{email:email,password:password},
        headers:{key:API_KEY},
      }).catch(()=>{
      console.log("email and or password are incorrect");
      throw redirect(303, "/?success=false");
      });
    console.log(response.data);
    if(response.status == 200)
    {
      cookies.set("session_id", response.data, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      throw redirect(303,"/?success=true");
    }
  },
};
