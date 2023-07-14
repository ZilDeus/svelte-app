import axios from 'axios'
import {redirect} from '@sveltejs/kit'
export async function load({ cookies }) {
    const res = await axios({
      method:"POST",
      url:"https://gobackend2-zildeus.b4a.run/start",
      }).catch(()=>{ redirect(301,"/404")})
}
