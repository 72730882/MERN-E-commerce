import BestSeller from "../components/BestSeller"
import Carousel from "../components/Carousel"
import LatestCollection from "../components/LatestCollection"
import NewsletterBox from "../components/NewsletterBox"
import OurPolicy from "../components/OurPolicy"



const Home = () => {
  return (
    <div>
      <Carousel />
      <LatestCollection />
      <BestSeller />
    
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}
export default Home