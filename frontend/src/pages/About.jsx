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
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        
            <p> Explore the ListView.builder widget—it’s perfect for dynamic lists
            like our To-Do List App! 💡 For Web Developers: Check out CSS
            Flexbox for building responsive layouts. Mastering it will make your
            designs shine! ✨ This Week’s Project Reminder: Keep working on your
            To-Do List App! - Beginners: Focus on layout and structure. -
            Advanced: Add features like sorting or filtering tasks.</p>
            <b className="text-gray-800">Our Mission</b>
            <p> Explore the ListView.builder widget—it’s perfect for dynamic lists
            like our To-Do List App! 💡 For Web Developers: Check out CSS
            Flexbox for building responsive layouts. Mastering it will make your
            designs shine! ✨ This Week’s Project Reminder: Keep working on your
            To-Do List App! - Beginners: Focus on layout and structure. -
            Advanced: Add features like sorting or filtering tasks.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}/>

      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600"> Explore the ListView.builder widget—it’s perfect for dynamic lists
            like our To-Do List App! 💡 For Web Developers: Check out CSS
            Flexbox for building responsive layouts. .</p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Convienience</b>
          <p className="text-gray-600"> Explore the ListView.builder widget—it’s perfect for dynamic lists
            like our To-Do List App! 💡 For Web Developers: Check out CSS
            Flexbox for building responsive layouts. .</p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5">
          <b>Exeptional customer service</b>
          <p className="text-gray-600"> Explore the ListView.builder widget—it’s perfect for dynamic lists
            like our To-Do List App! 💡 For Web Developers: Check out CSS
            Flexbox for building responsive layouts. .</p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About