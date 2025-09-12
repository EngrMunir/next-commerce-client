"use client"

import Category from "@/components/modules/home/category";
import HeroSection from "@/components/modules/home/hero/HeroSection";
import { useUser } from "@/context/UserContext";

const HomePage = () => {
    const user = useUser();
    return (
        <div>
            <HeroSection/>
            <Category/>
        </div>
    );
};

export default HomePage;