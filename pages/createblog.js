import router from 'next/router';
import {useState,useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid';
import {storage,db,serverTimestamp} from '../firebase'
import { useRouter } from 'next/router'

export default function createblog({user}) {

    const router1 = useRouter()

    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [personname,setName] = useState('')
    const [image,setImage] = useState(null)
    const [url,setUrl] = useState('')

    useEffect(()=>{
        if(url){
            try{
                 db.collection('blogs').add({
                  title,
                  body,
                  personname,
                  imageUrl:url,
                  postedBy:user.uid,
                  createdAt:serverTimestamp()
              })
              M.toast({html: 'Blog Created',classes:"green"})         
               router1.push("/")
            }catch(err){
                M.toast({html:'error creating blog',classes:"red"})    
            }
              

        }
    },[url])

    const SubmitDetails = ()=>{
        if (!title || !body || !image){
            M.toast({html: 'please add all the fields',classes:"red"})    
            return
        }
       var uploadTask = storage.ref().child(`image/${uuidv4()}`).put(image)
       uploadTask.on('state_changed', 
       (snapshot) => {
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         if(progress == '100') M.toast({html: 'Image Uploaded',classes:"green"}) 
         
       }, 
       (error) => {
        M.toast({html: error.message,classes:"red"}) 
       }, 
       () => {
       
         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
           console.log('File available at', downloadURL);
           setUrl(downloadURL)
            
         });
       }
     );

    }
    return (
        <div className="input-field rootdiv" style={{ marginTop: "30px !important", marginInline: "auto"}}>
            <h3 style={{color: "white", fontSize: "25px" ,marginBottom: "50px"}}>Create your blog </h3>
            <textarea
               type="text"
            value={personname}
            placeholder="Your Name"
            style={{color:"white", borderRadius: "5px", marginBottom: "5px", padding: "9px"}}
            onChange={(e)=>setName(e.target.value)}
            
            />
            <textarea
            type="text"
            value={title}
            placeholder="Blog Title"
            style={{color:"white", borderRadius: "5px", marginBottom: "5px", padding: "9px"}}
            onChange={(e)=>setTitle(e.target.value)}
            
            />
             
            <textarea
             type="text"
             value={body}
             placeholder="Decription"
             style={{borderRadius: "5px", color: "white",padding: "9px", height: "7rem"}}
             onChange={(e)=>setBody(e.target.value)}
            
            />
             <div className="file-field input-field">
                <div className="btn #fb8c00 orange darken-1">
                    <span>File</span>
                    <input type="file" style={{color: "white"}}  onChange={(e)=>setImage(e.target.files[0])} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" style={{color: "white"}} type="text" />
                </div>
             </div>
             <button className="btn #fb8c00 orange darken-1" onClick={()=>SubmitDetails()}>Submit Post</button>

             <style jsx>
                 {`
                 
                 .rootdiv{
                    
                     margin-inline: auto;
                     max-width:600px;
                     padding:20px;
                     text-align:center;
                    
                     border-radius: 6px;
                     height: 100vh;

                    
                 }
                 `}
             </style>

        </div>
    )
}
