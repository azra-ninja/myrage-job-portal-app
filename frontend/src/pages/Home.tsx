import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faMagnifyingGlass,
  faClock,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import type { Job } from "../types/Job";
import { useGetTrendingJobs } from "../tanstack/query/useGetTrendingJobs";
import Loader from "../components/Loader";

const Home = () => {
  const { data: jobs, isLoading, error } = useGetTrendingJobs();

  const features = [
    {
      icon: (
        <FontAwesomeIcon icon={faBriefcase} className="text-3xl text-primary" />
      ),
      title: "Verified Job Listings",
      description:
        "Browse opportunities from trusted employers and organizations.",
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-3xl text-primary"
        />
      ),
      title: "Easy Job Search",
      description:
        "Find jobs quickly using powerful search and filtering tools.",
    },
    {
      icon: (
        <FontAwesomeIcon icon={faClock} className="text-3xl text-primary" />
      ),
      title: "Quick Applications",
      description:
        "Apply to jobs in just a few clicks without unnecessary steps.",
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faShieldHalved}
          className="text-3xl text-primary"
        />
      ),
      title: "Secure Platform",
      description:
        "Your personal information and applications are handled securely.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      message:
        "Myrage helped me find my first remote developer role. The application process was simple and fast.",
    },
    {
      name: "Michael Brown",
      role: "UI/UX Designer",
      message:
        "I discovered opportunities that matched my skills perfectly. The platform is easy to navigate.",
    },
    {
      name: "David Wilson",
      role: "Hiring Manager",
      message:
        "We found qualified candidates quickly and efficiently. Myrage made recruitment much easier.",
    },
    {
      name: "Jade Westman",
      role: "Backend Developer",
      message:
        "Myrage helped me find my dream job worldwide. The application process was simple, fast and reliable.",
    },
  ];
  return (
    <div>
      <Hero />

      {/* Trending jobs section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Jobs</h2>

            <Link
              to="/jobs"
              className="text-primary font-medium hover:underline"
            >
              See all jobs →
            </Link>
          </div>
          {isLoading ? <Loader /> : null}
          {error && (
            <p className="text-red-500">
              {(error as any)?.response?.data?.message ||
                "Something went wrong"}
            </p>
          )}

          {/* Swiper */}
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {jobs?.map((job: Job) => (
              <SwiperSlide>
                <JobCard
                  _id={job?._id}
                  title={job?.title}
                  company={job?.company}
                  description={job?.description}
                  location={job?.location}
                  salary={{
                    min: job?.salary?.min,
                    max: job?.salary?.max,
                    currency: job?.salary?.currency,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Why choose section */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold">Why Choose Myrage?</h2>

            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              We connect talented professionals with great opportunities while
              making the job search process simple, fast, and secure.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-primary">{feature.icon}</div>

                  <h3 className="card-title">{feature.title}</h3>

                  <p className="text-slate-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-content">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Find Your Dream Job?
          </h2>

          <p className="mt-6 text-lg opacity-90">
            Join thousands of job seekers using Myrage to discover exciting
            career opportunities and connect with top employers.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/jobs" className="btn btn-neutral btn-lg">
              Browse Jobs
            </Link>

            <Link to="/register" className="btn btn-outline btn-lg">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>

            <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
              Hear from job seekers and employers who have found success using
              Myrage.
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name}>
                <div className="card bg-base-100 shadow-md border border-slate-200 h-[250px]">
                  <div className="card-body">
                    <p className="italic text-slate-600">
                      "{testimonial.message}"
                    </p>

                    <div className="mt-auto">
                      <h3 className="font-bold">{testimonial.name}</h3>

                      <p className="text-primary text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Home;
