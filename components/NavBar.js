import Link from 'next/link'
import {auth} from '../firebase'
import { useRouter } from 'next/router'
export default function NavBar({user}) {

  const router = useRouter();
    
    return (
        <nav style={{background: "transparent"}}>
        <div className="nav-wrapper transparent darken-1" >
          <Link href="/"><a className="brand-logo" style={{left: "auto"}}>Vlogg</a></Link>
          {/* <img src="https://lh3.googleusercontent.com/proxy/w6YCwd7PfQFE6mwTpZVrjwOGSBrMWFOwxkl-qqFIplMK6rd9mwVuWb0YaDFqyYGO7AMqufTLS_jAMyj8cXrnlktmZf88IJHdSCcTARrQYgo" style={{width: "45px", height: "41px"}} alt ="pic"/> */}
          <ul id="nav-mobile" className="right">
            {user?
            <>
                 {/* <li> <button  className="btn transparent" style={{backgroundColor: "transparent !important"}}  >Refresh</button></li> */}
                 {/* <button onClick={() => Router.reload('/')} > */}
       {/* <img src="https://lh3.googleusercontent.com/proxy/SxU5q7R5mC55I3DQvFBzDur8HAMdangEvH42aHBT-uUGjAo1GclYFtvljiMXCWt05Sw9S8ESWOLeBQI9HI7JNtdmQ-YI8MOhDMd3L1b0P8I" style={{width: "30px", height: "20px"}} alt ="pic"/> */}
        {/* </button> */}
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
