/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo2} className='mb-5 w-32' alt=""/>
                <p className='w-full md:w-2/3 text-gray-600'>
                lerem epsum  is simply dummy text of the pricicng and typesetting industy and its is so good at typing where my and you is fly on the sky they type something new on the desctop so please be on your time for that we dont got to thea</p>
            </div>
            <div className=''>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>

            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+251 9 72730882</li>
                    <li>caontact@fayo.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ fayo.com - All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer