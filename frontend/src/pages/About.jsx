import { assets } from "../assets/assets"
import NewsletterBox from "../components/NewsletterBox"
import Title from "../components/Title"


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={'US'} />

      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.bg} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        
            <p> At our store, we are passionate about delivering high-quality products with a seamless shopping experience. We aim to provide the latest trends, excellent service, and fast, reliable delivery to our valued customers.</p>
            <b className="text-gray-800">Our Mission</b>
            <p> Our mission is to bring convenience and quality together, ensuring that every customer enjoys a smooth and enjoyable shopping experience. We strive to offer the best products at competitive prices while maintaining a high level of customer satisfaction.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}/>

      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>✔ Quality Assurance</b>
          <p className="text-gray-600">
          We carefully select our products to ensure they meet high standards of quality, durability, and value. Your satisfaction is our top priority.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>✔ Convenience</b>
          <p className="text-gray-600"> 
          With a user-friendly platform and fast delivery, we make shopping effortless. Browse, purchase, and receive your orders hassle-free from the comfort of your home.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>✔ Exceptional Customer Service</b>
          <p className="text-gray-600">
          Our dedicated support team is always ready to assist you. Whether you have questions, need recommendations, or require help with an order, we are here to help.</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About