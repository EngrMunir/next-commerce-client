import { Button } from "@/components/ui/button";
import { getFlashSaleProducts } from "@/services/FlashSale";
import { IProduct } from "@/types/product";
import Link from "next/link";

const FlashSale = async() => {
    const {data: products} = await getFlashSaleProducts();
    return (
        <div className="bg-white bg-opacity-50">
           <div className="container mx-auto py-10">
             <div className="flex items-center justify-between">
                <h2 className="font-bold text-2xl">Flash Sale</h2>
                <Link href="/product"><Button variant="outline" className="rounded-full">All Collections</Button></Link>
            </div>
            <div className="grid grid-cols-5 gap-8 my-5">
                {
                    products.map((product:IProduct, idx:number) => <ProductCard key={idx} product={product}/>)
                }
            </div>
           </div>
        </div>
    );
};

export default FlashSale;