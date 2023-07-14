import { redirect } from "@sveltejs/kit";
import axios from 'axios';

export async function load({ cookies }) {
    const res = await axios({
      method:"POST",
      url: "https://gobackend2-zildeus.b4a.run/start",
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
        url:"https://gobackend2-zildeus.b4a.run/sign-in",
        data:{email:email,password:password},
        headers:{key:String("1202")},
      }).catch((res)=>{
      console.log(res.status + "::" + "email and or password are incorrect");
      throw redirect(303, "/");
      });
    console.log(response.data);
    if(response.status == 200)
    {
      cookies.set("session_id", response.data, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7, // one week
      });
    }
  },
};
