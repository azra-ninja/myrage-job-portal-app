import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import heroBg from "../assests/swiper-img1.jpg";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?q=${search}`);
  }
  return (
    <div
      className="hero min-h-[90vh]"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="hero-overlay bg-black/60"></div>

      <div className="hero-content text-center text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Find The Perfect Job For Your Career
          </h1>

          <p className="mt-6 text-lg text-slate-200">
            Discover thousands of job opportunities from top companies around
            the world.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search for the title of the job..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full text-black rounded-xl h-14"
            />

            <button className="btn btn-primary rounded-xl h-14 px-8" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
