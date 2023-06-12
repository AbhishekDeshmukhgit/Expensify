import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import { collection,getDocs,query,where } from 'firebase/firestore/lite';

export const useCollection = (coll,_query) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  //if we dont use a ref infinite loop in useeffect
  //_query is an array and is different on every function call
    const query1=useRef(_query).current

  useEffect(() => {
    const docRef = collection(projectFirestore, coll);

    const q = query(docRef, where(...query1));
    

    getDocs(q).then((snapshot)=>{
        if(snapshot.empty)
        {
          console.log("No transaction to load")
        }
        else{
          let result=[]
          snapshot.docs.forEach(doc=>{
            result.push({id:doc.id,...doc.data()})
          })
          
      setDocuments(result);
      setError(null);
        }
      }).catch(err=>{
        console.log(err)
        setError(error);
      })


  }, [coll,query1]);

  return { documents, error };
};
