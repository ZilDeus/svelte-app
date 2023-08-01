import { redirect } from "@sveltejs/kit";
import { sql} from "drizzle-orm";
import { db } from "$lib/server/db.js";
import { items } from "$lib/server/schema.js";

export const actions = {

  default: async ({request}) => {
    const form = await request.formData();
    const name = form.get("name");
    const cRatio = form.get("Cratio");
    const pRatio = form.get("Pratio");
    const unit = form.get("unit");
    await db.insert(items).values({Name:name,Cratio:cRatio,Pratio:pRatio,Unit:unit});
  },
};
