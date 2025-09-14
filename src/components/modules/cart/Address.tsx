import { citySelector, shippingAddressSelector, updateCity, updateShippingAddress } from "@/components/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/components/redux/hooks";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cities } from "@/constants";
import { SelectItem, SelectValue } from "@radix-ui/react-select";


const Address = () => {
    const dispatch = useAppDispatch();
    const city = useAppSelector(citySelector);
    const shippingAddress = useAppSelector(shippingAddressSelector);

    const handleCitySelect = (city:string) =>{
        dispatch(updateCity(city))
    }
    const handleShippingAddress = (address:string) =>{
        dispatch(updateShippingAddress(address))
    }
    return (
        <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4">
            <div className="flex flex-col justify-between h-full">
                <h1 className="text-2xl font-bold">Address</h1>
                <p className="text-gray-500">Enter your address</p>
                <div className="mt-5">
                    <Select onValueChange={()=> handleCitySelect(city)}>
                        <SelectTrigger className="mb-5">
                            <SelectValue placeholder="Select a city"/>
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Textarea onChange={(e)=> handleShippingAddress(e.target.value)} rows={5}/>
                </div>
            </div>
        </div>
    );
};

export default Address;