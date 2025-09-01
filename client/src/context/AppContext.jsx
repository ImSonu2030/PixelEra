import axios from 'axios'
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backendUrl=import.meta.env.VITE_BACKEND_URL

    const {getToken} = useAuth();
    const [credit,setCredit]=useState(false);
    const [image,setImage] = useState(false);
    const [outputImg,setOutputImg]=useState(false);
    
    const navigate=useNavigate();
    const {isSignedIn}=useUser();
    const {openSignIn}=useClerk();

    const loadCreditData=async () => {
        try {
            const token=await getToken()
            const {data} = await axios.get(`${backendUrl}/api/user/credits`,{headers:{token}})
            if(data.success) {
                setCredit(data.credits)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const removeBg=async (inputImage) => {
        try {
            if(!isSignedIn) {
                return openSignIn();
            }

            setImage(inputImage);
            setOutputImg(false);

            navigate('/result');

            //requesting the removal of background from server
            const token=await getToken()

            const formdata=new FormData();
            inputImage && formdata.append('image',inputImage)

            const {data}=await axios.post(`${backendUrl}/api/image/remove-bg`,formdata,{
                headers:{token}
            })
            
            if(data.success) {
                setOutputImg(data.resultImg);
                setCredit(data.creditBalance);
            } else {
                setOutputImg(null)
                toast.warn(data.message)
                data.creditBalance && setCredit(data.creditBalance)
                if(data.creditBalance===0){
                    navigate('/buy')
                }
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    // state variable here
    const value={
        backendUrl,
        credit,setCredit,loadCreditData,
        image,setImage,removeBg,
        outputImg,setOutputImg
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider