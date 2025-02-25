/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    console.log("Product ID in ProductItem:", id); // Debugging
    const { currency } = useContext(ShopContext);
    
    return (
        <Link to={`/product/${id}`}>
            <div className='w-full h-48 md:h-56 lg:h-64 overflow-hidden rounded-lg bg-gray-800'>
                < img className='w-full h-full object-cover hover:scale-110 transition-transform ease-in-out duration-300 ' src={image[0]} alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    );
};

export default ProductItem ;
