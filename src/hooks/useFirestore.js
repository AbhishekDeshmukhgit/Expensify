import { projectFirestore, Timestamp } from "../firebase/config";
import { useReducer, useEffect, useState } from "react";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore/lite";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    sucess: null
}
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, sucess: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, sucess: true, error: null }
        case 'DELETED_DOCUMENT':
            return {isPending:false,document:action.payload,sucess:true,error:null}
        case 'ERROR':
            return { isPending: false, document: null, sucess: false, error: action.payload }

        default:
            return state
    }
}

export const useFirestore = (col) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref
    // const ref= projectFirestore.collection(collection)
    const ref = collection(projectFirestore, col)


    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }


    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = Timestamp.fromDate(new Date())
            //    const addedDocument= await  ref.add({...doc,createdAt})
            const addedDocument = await addDoc(ref, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
        }
        catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' })
        const docRef = doc(projectFirestore, col, id);
        try {
            const deleteDocument=deleteDoc(docRef)
                .then(() => {
                    console.log('Document successfully deleted!');
                })
                dispatchIfNotCancelled({type:'DELETED_DOCUMENT',payload:deleteDocument})
        }
        catch (err) {
            dispatchIfNotCancelled({type:'ERROR',payload:'could not delete documents'})
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, deleteDocument, response }
}