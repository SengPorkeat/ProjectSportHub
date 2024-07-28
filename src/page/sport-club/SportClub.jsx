import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../../assets/sportsPage/HeroSectionSport.jpg";
import {
  fetchSportclubs,
  selectAllSportclubs,
} from "../../redux/feature/sportclub/SportClubSlice";
import ClubsLoadingCard from "../../components/sportClubs/ClubsLoadingCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../assets/SportHubLogo.png";
import { Helmet, HelmetProvider } from "react-helmet-async";

const sports = [
  { title: "កីឡាបាល់ទាត់", ref: "sliderRef3", sport_category_name: "football" },
  { title: "កីឡាវាយសី", ref: "sliderRef1", sport_category_name: "badminton" },
  {
    title: "កីឡាបាល់បោះ",
    ref: "sliderRef2",
    sport_category_name: "basketball",
  },
  { title: "កីឡាបាល់ទះ", ref: "sliderRef4", sport_category_name: "volleyball" },
];

const endPoint = import.meta.env.VITE_BASE_IMAGE_URL;

const SportClub = () => {
  const dispatch = useDispatch();
  const sportclubs = useSelector(selectAllSportclubs);
  const status = useSelector((state) => state.sportclubs.status);

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  useEffect(() => {
    dispatch(fetchSportclubs());
  }, [dispatch]);

  const sliderRefs = useRef(
    sports.reduce((acc, sport) => {
      acc[sport.ref] = useRef(null);
      return acc;
    }, {})
  );

  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const navigate = useNavigate();

  const handleCLubDetails = (sportDetails) => {
    if (!sportDetails) {
      console.error("Sport details are missing!");
      return;
    }
    navigate("/sportclub-details", { state: sportDetails });
  };

  const renderCards = (clubs) =>
    clubs.map((club, index) => (
      <section className="relative max-w-screen-xl mx-auto" key={index}>
        <div
          data-aos="zoom-in"
          className="grid cursor-pointer justify-center items-center"
        >
          <Card
            onClick={() => handleCLubDetails(club)}
            className="max-w-96 mx-auto relative group pointer-event"
          >
            <img
              src={`${endPoint}${club.image}`}
              alt={`${endPoint}${club.image}`}
              className="w-96 object-cover h-64 rounded-md"
            />
            <div className="absolute text-white left-0 bottom-0 w-full h-2/4 bg-gradient-to-b from-transparent to-gray-800 rounded-md flex flex-col text-left pb-2">
              <h5 className="flex justify-center items-center text-center text-xl font-bold tracking-tight text-white dark:text-white mt-auto mb-2 bg-gradient-to-b from-[#000000] to-[#ffffff] bg-clip-text">
                {club.sport_name}
              </h5>
            </div>
          </Card>
        </div>
      </section>
    ));

  const renderLoadingCards = () => {
    const loadingCards = Array.from({ length: 3 }).map((_, index) => (
      <section className="relative max-w-screen-xl mx-auto" key={index}>
        <ClubsLoadingCard />
      </section>
    ));
    return loadingCards;
  };

  const renderSection = (sport, sliderRef, clubs) => {
    const filteredClubs = clubs.filter(
      (club) => club.sport_category_name === sport.sport_category_name
    );

    // console.log(
    //   `Filtered Clubs for ${sport.sport_category_name}: `,
    //   filteredClubs
    // );
    return (
      <div key={sliderRef} className="relative max-w-screen-xl mx-auto">
        <h2
          data-aos="fade-right"
          className="font-bold text-[#172554] xl:text-5xl md:text-3xl text-base mt-12 mb-5 ml-8"
        >
          {sport.title}
        </h2>
        <div className="relative xl:m-0 md:m-8 m-8">
          <button
            className="absolute shadow-md z-10 xl:left-[0px] md:left-[-22px] left-[-24px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-200"
            onClick={() => sliderRefs.current[sliderRef].current.slickPrev()}
          >
            <FontAwesomeIcon className="text-[#222162]" icon={faAngleLeft} />
          </button>
          <Slider ref={sliderRefs.current[sliderRef]} {...settings}>
            {status === "loading"
              ? renderLoadingCards()
              : renderCards(filteredClubs)}
          </Slider>
          <button
            className="absolute shadow-md z-10 xl:right-[0px] md:right-[-22px] right-[-24px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-200"
            onClick={() => sliderRefs.current[sliderRef].current.slickNext()}
          >
            <FontAwesomeIcon className="text-[#222162]" icon={faAngleRight} />
          </button>
        </div>
      </div>
    );
  };

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
                  ក្លឹបកីឡា
                </h1>
              </div>
            </div>
          </div>
        </header>
        <div className="gap-2 mt-10 w-11/12 mx-auto relative mb-56">
          {sports.map((sport) => renderSection(sport, sport.ref, sportclubs))}
        </div>
      </HelmetProvider>
    </>
  );
};

export default SportClub;
