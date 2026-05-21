import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Home = () => {
  return (
    <div>
      <Hero />

      <div className="flex mt-10 m-6 p-4">
        <div className="flex-1">
          <h2 className="text-2xl">Trending Jobs</h2>
        </div>
        <div className="flex-none">
          <Link to="/jobs" className="items-center text-cyan-700 underline">
            See all jobs
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {/* <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <JobCard />
          </SwiperSlide>
          <SwiperSlide>
            <JobCard />
          </SwiperSlide>
          <SwiperSlide>
            <JobCard />
          </SwiperSlide>
        </Swiper> */}
        <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide><JobCard /></SwiperSlide>
      <SwiperSlide><JobCard /></SwiperSlide>
      <SwiperSlide><JobCard /></SwiperSlide>
    </Swiper>
      </div>
      {/* 
      <Footer /> */}
    </div>
  );
};

export default Home;
