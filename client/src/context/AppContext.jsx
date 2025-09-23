import axios from 'axios'
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { load } from "@cashfreepayments/cashfree-js";

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

    const [paymentSessionId,setOrderSessionId]=useState(false);

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

    const checkOut = async (paySessionId) => {
        if(!paySessionId) {
            console.log("Payment session Id no generated");
            return;
        }
        const cashfree=await load({
            mode:"sandbox"
        });

        const checkoutOptions = {
            paymentSessionId:paySessionId,
            redirectTarget: "_modal",
        };

        const checkoutStatus=cashfree.checkout(checkoutOptions);
        if(checkoutStatus.error) {
            toast.error("Error occured")
            console.log("User has closed the popup or there is some payment error, Check for Payment Status");
        }
        if(checkoutStatus.redirect) {
            console.log("Payment will be redirected");
        }
        if(checkoutStatus.paymentDetails) {
            toast.success("Payment Successful. Credits will be added to Your account");
            navigate('/')
        }
    }
    const createOrder = async (orderRequest) => {
        try {
            if(!isSignedIn) {
                return openSignIn();
            }

            const token=await getToken();
            const {data}=await axios.post(`${backendUrl}/api/payment/create-order`,orderRequest,{
                headers:{
                    token
                },
            });
            
            if(data.order_status) {
                setOrderSessionId(data.payment_session_id);
                checkOut(data.payment_session_id);
            } else {
                toast.error('Failed to make order. Please try again!');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const value={
        backendUrl,
        credit,setCredit,loadCreditData,
        image,setImage,removeBg,
        outputImg,setOutputImg,
        createOrder,checkOut,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider