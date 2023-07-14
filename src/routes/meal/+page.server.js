import axios from 'axios'
import {redirect} from '@sveltejs/kit'
export async function load({ cookies }) {
    const res = await axios({
      method:"POST",
      url:"https://gobackend2-zildeus.b4a.run/start",
      }).catch(()=>{ throw redirect(301,"/404")})

    const sessionid = await cookies.get('session_id');
    if (sessionid === undefined)
    {
      throw redirect(301,'/')
    }
    else
    {
    const res = await axios({
      method:"POST",
      url:"https://gobackend2-zildeus.b4a.run/get-user",
      headers:{key:String("1202"),id:String(sessionid)},
    }).catch(() => {
      throw redirect(301,"/");
    })
      if(res)
      {
        return {
          user: res.data,
          id: sessionid,
        }
      }
    }
}
