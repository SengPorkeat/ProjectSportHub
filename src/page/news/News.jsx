import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../assets/newsPage/HeroSectionNews.jpg";
import NewsComponent1 from "../../components/newsComponent/NewsComponent1";
import NewsComponent2 from "../../components/newsComponent/NewsComponent2";
import NewsLoadingCard from "../../components/newsComponent/NewsLoadingCard";
import Carousel from "react-multi-carousel";
import { responsive } from "../../redux/newsData";
import "react-multi-carousel/lib/styles.css";
import "../../index.css";
import {
  fetchContents,
  selectAllNews,
} from "../../redux/feature/content/contentSlice";
import { useNavigate } from "react-router-dom";
import NewsLoadingCard2 from "../../components/newsComponent/NewsLoadingCard2";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/SportHubLogo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function News() {
  const news = useSelector(selectAllNews);
  const status = useSelector((state) => state.content.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  // Make a shallow copy of the news array before sorting it
  const sortedRecentNews = [...news].sort(
    (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
  );

  // handle news page detail
  const handleNewsDetail = (news) => {
    navigate("/news-detail", { state: news });
  };

  // map data for Component_2
  const recentNews = sortedRecentNews.slice(0, 8).map((item, index) => (
    <NewsComponent2
      key={index}
      image={item.thumbnail}
      title={item.title}
      released_date={item.updated_at}
      view={item.view_count}
      handleNewsDetail={() => handleNewsDetail(item)} // pass the handler
    />
  ));

  // map data for Component_1
  const topNews = sortedRecentNews.slice(8).map((item, index) => (
    <NewsComponent1
      key={index}
      image={item.thumbnail}
      title={item.title}
      released_date={item.updated_at}
      handleNewsDetail={() => handleNewsDetail(item)} // pass the handler
      className={index === 0 ? "xl:col-span-2 xl:row-span-2" : ""}
    />
  ));

  const loadingCards = Array.from({ length: 4 }).map((_, index) => (
    <NewsLoadingCard key={index} />
  ));
  const loadingCards2 = Array.from({ length: 4 }).map((_, index) => (
    <NewsLoadingCard2 key={index} />
  ));

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>SportHub</title>
          <meta
            name="description"
            content="SportHub - Your ultimate destination for sports clubs and activities."
          />
          <meta
            name="keywords"
            content="sports, clubs, activities, SportHub, fitness, workouts, athletic clubs, local sports, team sports, individual sports, recreational activities, sport events, sports community, sports enthusiasts, sports leagues, exercise, health and fitness, gym memberships, personal training, sports coaching, sports training, outdoor sports, indoor sports, youth sports, adult sports, sports programs, sports facilities, sports nutrition, sports gear, sport tournaments, sports tournaments, sport camps, fitness classes, wellness, physical fitness, sports news, sports updates, sports schedules"
          />

          <meta name="author" content="SportHub Team" />
          <meta property="og:title" content="SportHub" />
          <meta
            property="og:description"
            content="Find and join sports clubs and activities near you with SportHub."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.sporthub.com" />
          <meta property="og:image" content={Logo} />
        </Helmet>
        <header className="relative">
          <img
            className="object-cover h-[585px] w-full top-0 -z-30"
            src={Hero}
            alt="Background image description"
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          />
          <div className="w-10/12 mx-auto">
            <div className="absolute top-[430px] text-white font-extrabold">
              <div className="inline-block">
                <h1 data-aos="zoom-in" className="text-[56px]">
                  ព័ត៌មានកីឡាថ្មីៗ
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="News flex justify-center w-11/12 items-center flex-col gap-5 mx-auto p-5 pb-20">
          {/* section 1: Top News */}
          <section className="w-full h-auto">
            <h2
              data-aos="zoom-in"
              className="text-center text-4xl text-[#172554] font-bold mt-20 mb-7 "
            >
              ព័ត៌មានល្បីៗ
            </h2>
            <div
              data-aos="fade-up"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full h-auto mx-auto"
            >
              {status === "Loading" ? loadingCards2 : topNews}
            </div>
          </section>

          {/* section 2: Recent News */}
          <section className="w-full h-auto">
            <h2
              data-aos="zoom-in"
              className="text-center text-4xl text-[#172554] font-bold m-7 "
            >
              ព័ត៌មានថ្មីៗ
            </h2>
            <div
              data-aos="fade-up"
              style={{
                paddingBottom: "30px",
                position: "relative",
              }}
            >
              {status === "Loading" ? (
                <Carousel
                  responsive={responsive}
                  showDots={true}
                  renderDotsOutside={true}
                  swipeable={true}
                >
                  {loadingCards}
                </Carousel>
              ) : (
                <Carousel
                  responsive={responsive}
                  showDots={true}
                  renderDotsOutside={true}
                  swipeable={true}
                >
                  {recentNews}
                </Carousel>
              )}
            </div>
          </section>
        </div>
      </HelmetProvider>
    </>
  );
}
