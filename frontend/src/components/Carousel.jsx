/* eslint-disable react/jsx-key */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { assets } from '../assets/assets';

const responsive = {
    0: { items: 1 },
    568: { items: 1 },
    1024: { items: 1 },
};


const items = [
    <div className="item" data-value="1" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
            <img src={assets.cl1} alt="Slide 1" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 className='prata-regular ' style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Tekiya Bridals</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>Designer lehengas for the exceptional you.</p>
            <button className='relative' style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Shop now
            </button>
        </div>
    </div>,
    <div className="item" data-value="2" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
            <img src={assets.cl2} alt="Slide 2" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 className='prata-regular ' style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Fascinating Floral</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>Accentuate your beauty in floral gowns.</p>
            <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Shop Now
            </button>
        </div>
    </div>,
    <div className="item" data-value="3" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
            <img src={assets.cl3} alt="Slide 3" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 className='prata-regular ' style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Elegant Embrace</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>Sophistication meets style in our exclusive range.</p>
            <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Shop Now
            </button>
        </div>
    </div>,
    <div className="item" data-value="4" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
            <img src={assets.cl4} alt="Slide 4" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 className='prata-regular ' style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Classic Charm</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>Timeless fashion for the modern wearer.</p>
            <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Shop Now
            </button>
        </div>
    </div>,
    <div className="item" data-value="5" style={{ display: 'flex', width: '100%' }}>
        <div style={{ width: '50%' }}>
            <img src={assets.cl5} alt="Slide 5" style={{ width: '100%', height: 'auto' }} />
        </div>
        <div style={{ width: '50%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <h3 className='prata-regular ' style={{ fontWeight: 'bold', fontSize: '1.8rem', color: '#333', marginBottom: '15px' }}>Modern Majesty</h3>
            <p style={{ fontSize: '1.1rem', color: '#555', marginTop: '10px' }}>Unleash elegance with our latest collection.</p>
            <button style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Shop Now
            </button>
        </div>
    </div>,
];

const Carousel = () => (
    <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
    />
);

export default Carousel;
