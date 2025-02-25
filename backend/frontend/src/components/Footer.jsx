/* eslint-disable no-unused-vars */
import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo2} className='mb-5 w-32' alt=""/>
                <p className='w-full md:w-2/3 text-gray-600'>At our store, we are committed to providing quality products and excellent service. Explore our website to learn more about our company, our values, and how we ensure fast and reliable delivery. Your privacy is important to us, so we maintain a strict privacy policy to protect your information. We strive to bring you the latest collections with trendy and high-quality items that suit your needs. </p>
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
                    <li>contact@faizamohammed0882@gmail.com</li>
                </ul>
            </div>

        </div>

        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2024@ faiza mohammed- All Right Reserved</p>
        </div>
    </div>
  )
}

export default Footer