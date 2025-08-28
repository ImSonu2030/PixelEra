import axios from 'axios'
import { useAuth } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [credit,setCredit]=useState(false)

    const {getToken} = useAuth()
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    
    const loadCreditData=async () => {
        try {
            const token=await getToken()
            const {data} = await axios.get(`${backendUrl}/api/user/credits`,{headers:{token}})
            if(data.success) {
                setCredit(data.credits)
                console.log('user credit: ');
                
                console.log(data.credits);
                
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    // state variable here
    const value={
        credit,
        setCredit,
        loadCreditData,
        backendUrl
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider