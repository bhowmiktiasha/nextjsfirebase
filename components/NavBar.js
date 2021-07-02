import Link from 'next/link'
import {auth} from '../firebase'
import { useRouter } from 'next/router'
export default function NavBar({user}) {

  const router = useRouter();
    
    return (
        <nav style={{background: "transparent"}}>
        <div className="nav-wrapper transparent darken-1" >
          <Link href="/"><a className="brand-logo" style={{left: "auto"}}>Vlogg</a></Link>
          <ul id="nav-mobile" className="right">
            {user?
            <>
              <li><Link href="/createblog"><a>Create Blog</a></Link></li>
              <li> <button  className="btn transparent" style={{backgroundColor: "transparent !important"}} onClick={()=>{auth.signOut(); router.push("/login")} }>Logout</button></li>
            </>
            
            :
                <>
                <li><Link href="/signup"><a>Signup</a></Link></li>
                <li><Link href="/login"><a>Login</a></Link></li>
                </>
            }
            
          </ul>
        </div>

        <style jsx>{`
         .brand-logo {
               left: auto;
         }
         @media (max-width: 768px) {
            .brand-logo {
               left: 46px !important;
               }
              }
          `}
</style>
      </nav>
    )
}
