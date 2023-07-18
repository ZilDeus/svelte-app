import axios from 'axios'
import {redirect} from '@sveltejs/kit'
import {API_URL,API_KEY} from "$env/static/private"

export async function load() {

    await axios({
      method:"POST",
      url:API_URL+"/start",
      }).catch(()=>{ throw redirect(301,"/404")})

    const res = await axios({
      method: "POST",
      headers:{key:API_KEY},
      url:API_URL+"/get-items",
      }).catch(()=>{ throw redirect(301,"/404")})

    return {items:res.data};
}
