import CartProducts from "@/components/modules/cart/CartProducts";
import PaymentDetails from "@/components/modules/cart/PaymentDetails";
import NMContainer from "@/components/ui/core/NMContainer";

const CartPage = () => {
    return (
        <NMContainer>
            <ProductBanner title="Cart Page" path="Home - Cart" />
            <div className="grid grid-cols-12 gap-8 my-5">
                <CartProducts />
                <Coupon/>
                <PaymentDetails/>
            </div>
        </NMContainer>
    );
};

export default CartPage;