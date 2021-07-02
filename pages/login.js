import {useState} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {auth} from '../firebase'
export default function login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const router = useRouter()

       const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
          const result = await auth.signInWithEmailAndPassword(email,password)
          M.toast({html: `Welcome back ${result.user.displayName}`,classes:"green"})  
          router.push("/")
        }catch(err){
          M.toast({html: err.message,classes:"red"})    
        }     
     }
   
    return (
        <div className="container center" style={{height: "100vh"}}>
            <h3 style={{color: "white", fontSize: "25px", marginTop: "60px"}}>Sign-In</h3>
             <form onSubmit={(e)=>handleSubmit(e)}>
                 <div className="input-field">
                     <input type="email"  placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} style={{color: "white"}} />
                     <input type="password"  placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{color: "white"}}/>
                 </div>
                 <button type="submit" className="btn #fb8c00 orange darken-1">Login</button>
                <Link href="/signup"><a><h5 style={{fontSize: "inherit", color: "white"}}>Click here to create an account</h5></a></Link>
             </form>
            
        </div>
    )
}
