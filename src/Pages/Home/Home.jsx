import React from 'react';
import HeroSection from '../../Components/HeroSection/HeroSection';
import FeaturedProducts from '../../Components/FeaturedProducts/FeaturedProducts';
import NewArrivals from '../../Components/NewArrivals/NewArrivals';
import ShopByCategory from '../../Components/ShopByCategory/ShopByCategory';

const Home = () => {
  return (
    <div>
      
      <HeroSection />
      <NewArrivals/>
      <ShopByCategory/>
      <FeaturedProducts />
    
    </div>
  );
};

export default Home;
