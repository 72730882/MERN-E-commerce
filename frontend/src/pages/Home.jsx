import BestSeller from "../components/BestSeller"
import Carousel from "../components/Carousel"
import LatestCollection from "../components/LatestCollection"
import NewsletterBox from "../components/NewsletterBox"
import OurPolicy from "../components/OurPolicy"
import Testimonials from "../components/Testimonials"


const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestCollection />
      <BestSeller />
      <Testimonials />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}
export default Home