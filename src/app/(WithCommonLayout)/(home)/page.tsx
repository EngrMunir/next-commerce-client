"use client"

import Category from "@/components/modules/home/category";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import HeroSection from "@/components/modules/home/hero/HeroSection";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
    return (
        <div>
            <HeroSection/>
            <Category/>
            <FeaturedProducts/>
        </div>
    );
};

export default HomePage;