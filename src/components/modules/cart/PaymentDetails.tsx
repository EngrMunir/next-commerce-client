import { grandTotalSelector, orderSelector, shippingCostSelector, subTotalSelector } from "@/components/redux/features/cartSlice";
import { useAppSelector } from "@/components/redux/hooks";
import { Button } from "@/components/ui/button";
import { currencyFormatter } from "@/lib/currencyFormatter";

const PaymentDetails = () => {
    const subTotal = useAppSelector(subTotalSelector);
    const shippingCost = useAppSelector(shippingCostSelector);
    const grandTotal = useAppSelector(grandTotalSelector)
    const order = useAppSelector(orderSelector);

    const handleOrder =()=>{
        console.log(order)
    }

    return (
        <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-7">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                    <p className="text-gray-500">Subtotal</p>
                    <p className="font-semibold">{currencyFormatter(subTotal)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500">Discount</p>
                    <p className="font-semibold">00</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-500">Shipment Cost</p>
                    <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
                </div>
            </div>
            <div className="flex justify-between mt-10 mb-5">
                <p className="text-gray-500">Grand Total</p>
                <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
            </div>
            <Button onClick={handleOrder} className="w-full text-xl font-semibold py-5">Order Now</Button>
        </div>
    );
};

export default PaymentDetails;