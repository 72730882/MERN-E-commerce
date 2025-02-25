/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState , useEffect} from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  
    // eslint-disable-next-line no-unused-vars
    const { products } = useContext(ShopContext);
    // eslint-disable-next-line no-unused-vars
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    }, [products]);// Only run this effect when `products` changes


    return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            < Title text2={' LATEST  COLLECTIONS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600  ' style={{
      overflowWrap: "break-word" 
   }}>Check out our latest collection, filled with fresh and stylish products just for you! We’ve handpicked the top 10 new arrivals to bring you the best in fashion and quality. Find something you love and stay trendy with our newest items!</p>
        </div>

        {/*Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

            {
            latestProducts.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />

            ))
            }

        </div>


    
    </div>
  )
}
export default LatestCollection;
