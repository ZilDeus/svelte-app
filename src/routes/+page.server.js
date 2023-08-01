import { redirect } from "@sveltejs/kit"; 
import { sql} from "drizzle-orm";
import { db } from "$lib/server/db.js";
import { users } from "$lib/server/schema.js";

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    if (email === "" || password === "") {
      throw redirect(404, "/");
    }

    console.log(email + " ::: " + password);

    const user = await db.select().from(users).where(sql`${users.Email} = ${email} and ${users.Password} = ${password}`);
    if(user.length > 0)
    {
      cookies.set("session_id", user[0].Id, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      throw redirect(303,"/?success=true");
    }
    else
    {
      throw redirect(303,"/?success=false");
    }
  },
};
