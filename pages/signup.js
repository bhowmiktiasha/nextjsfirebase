import {useState} from 'react'
import Link from 'next/link'
import {auth} from '../firebase'
import { useRouter } from 'next/router'

export default function Signup() {

    const router = useRouter()
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const handleSubmit = async (e)=>{
       e.preventDefault()
       try{
         const result = await auth.createUserWithEmailAndPassword(email,password)
       await result.user.updateProfile({
           displayName:name
       })
       M.toast({html: `Welcome ${result.user.displayName}`,classes:"green"}) 
       router.push("/")
       }catch(err){
        M.toast({html: err.message,classes:"red"})    
       }
       
    }
    return (
        <div className="container center" style={{height: "100vh"}}>
            <h3 style={{color: "white", fontSize: "25px", marginTop: "60px"}} >Sign-Up</h3>
             <form onSubmit={(e)=>handleSubmit(e)}>
                 <div className="input-field">
                     <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)}  style={{color: "white"}}/>
                     <input type="email" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)}  style={{color: "white"}} />
                     <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}  style={{color: "white"}} />
                 </div>
                 <button type="submit" className="btn #fb8c00 orange darken-1">Signup</button>
                <Link href="/login"><a><h5 style={{fontSize: "inherit", color: "white"}}>Already have an account? Click to login</h5></a></Link>
             </form>
            
        </div>
    )
}
