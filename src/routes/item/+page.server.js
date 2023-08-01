import { db } from "$lib/server/db.js";
import { items } from '$lib/server/schema.js'
import {redirect} from '@sveltejs/kit'

export async function load() {
    const returnedItems = await db.select().from(items);
    return {items:returnedItems};
}
