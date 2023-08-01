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

    const user = await db.select().from(users).where(sql`${users.Email} = ${email}`);
    if(user.length != 0)
    {
      throw redirect(303,"/sign-up/?success=false");
    }

    await db.insert(users).values({Email: email , Password:password});

    throw redirect(303, "/");
  },
};
