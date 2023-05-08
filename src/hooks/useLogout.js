import { useAuthContext } from "./useAuthContext"
import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"

export const useLogout = () =>{
    const [error,setError]=useState(null)
    const [isPending,setIsPending]=useState(false)
    const [isCancelled,setIsCancelled]=useState(false)
    const {dispatch}=useAuthContext()

    const logout= async () =>{
        setError(null)
        setIsPending(true)

        //sign the user out
        try{
             await projectAuth.signOut()

             //dispatch logout action
             dispatch({type:'LOGOUT'})
            if(!isCancelled)
            {
             setIsPending(false)
             setError(null)
            }
        }
        catch(err){
            if(!isCancelled)
            {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
            }
        }
    }

    useEffect(
        ()=>{
            return ()=>setIsCancelled(true)
        }
    ,[])

    return {logout,error,isPending}
}