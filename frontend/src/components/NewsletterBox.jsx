/* eslint-disable no-unused-vars */
import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = () =>{
        event.preventDefault();

    }


  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>
            Subscribe now and get 40% off on your first purchase!</p>
            <p className='text-gray-400 mt-3'>Stay updated with the latest trends, exclusive offers, and special discounts by joining our newsletter. Be the first to know about new collections and exciting deals.<br/>
          Enter your email below and start saving today! </p>
                <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 '>
                    <input className=' w-full sm:flex-1 outline-none' type="email" placeholder='enter your email' required/>
                    <button type='submit' className='bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
                </form>
    </div>

  )
}

export default NewsletterBox