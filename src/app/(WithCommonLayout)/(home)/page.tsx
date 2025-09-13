"use client"

import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import FlashSale from "@/components/modules/home/FlashSale";
import HeroSection from "@/components/modules/home/hero/HeroSection";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <Category/>
            <FeaturedProducts/>
            <FlashSale/>
        </div>
    );
};

export default HomePage;