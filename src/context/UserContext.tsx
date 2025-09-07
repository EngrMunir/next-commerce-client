import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserProvideValues {
    user:IUser | null;
    isLoading: boolean;
    setUser: (user:IUser | null) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<IUserProvideValues | undefined>(undefined);

const UserProvider = ({children}:{ children: React.ReactNode }) =>{
    const [user, setUser] = useState<IUser| null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleUser = async () =>{
        const user = await getCurrentUser();
        setUser(user)
        setIsLoading(false)
    }

    useEffect(()=>{
        handleUser();
    },[isLoading]);
    return (
        <UserContext.Provider value={{user, setUser, isLoading, setIsLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUser = () =>{
    const context = useContext(UserContext);

    if(context == undefined){
        throw new Error("useUser must be used within the UserProvider")
    }
    return context;
}