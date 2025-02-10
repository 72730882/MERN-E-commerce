import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';

const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};

const items = [
    {
        title: "Dress to Impress",
        text: "Find the perfect outfit that makes you look and feel amazing!",
        img: assets.cl1,
    },
    {
        title: "Everyday Style, Made Easy",
        text: "Trendy, comfy, and stylish clothes for men, women, and kids.",
        img: assets.cl2,
    },
    {
        title: "Shop Local, Wear Quality",
        text: "Branded fashion at great prices—right here in your neighborhood!",
        img: assets.cl3,
    },
    {
        title: "Cute & Comfy for the Little Ones",
        text: "Adorable kids' outfits that are soft, stylish, and perfect for playtime!",
        img: assets.cl4,
    },
    {
        title: "Your Style, Your Way",
        text: "From casual wear to fancy looks, we’ve got something for everyone!",
        img: assets.cl5,
    },
];

const carouselItems = items.map((item, index) => (
    <div key={index} className="flex w-full">
        <hr/>
        <div className="w-full h-[400px] flex items-center justify-center">
    <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
</div>

        <div className="w-1/2 p-5 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-2xl text-gray-800 mb-4">{item.title}</h3>
            <p className="text-lg text-gray-600 mt-2">{item.text}</p>
            <NavLink 
                to="/collection" 
                className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition-all"
            >
                Shop Now
            </NavLink>
        </div>
    </div>
));

const Carousel = () => (
    <AliceCarousel
        mouseTracking
        items={carouselItems}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);

export default Carousel;
