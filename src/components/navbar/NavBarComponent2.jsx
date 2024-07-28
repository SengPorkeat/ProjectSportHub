import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAccessToken } from "../../lib/secureLocalStorage";
import UserProfile from "../userProfile/UserProfile.jsx";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import axios from "axios";
import placeHolder from "../../assets/placeholder.jpeg";

export function NavBarComponent2() {
  const [navbarList, setNavbarList] = useState([
    {
      name: "",
      path: "/home",
    },
    {
      name: "អំពីយើង",
      path: "/about-us",
      active: false,
    },
    {
      name: "ក្លឹបកីឡា",
      path: "/sport-club",
      active: false,
    },
    {
      name: "ព្រឹត្តិការណ៍",
      path: "/event-home",
      active: false,
    },
    {
      name: "ព័ត៌មាន",
      path: "/news",
      active: false,
    },
    {
      name: "ប្រវត្តិកីឡា",
      path: "/history",
      active: false,
    },
  ]);

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(getAccessToken())
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const [APIData, setAPIData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://136.228.158.126:50003/api/sportclubs/all/`)
      .then((response) => {
        // console.log(response.data);
        setAPIData(response.data.results || []);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = APIData.filter((item) =>
        item.sport_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  const handleClick = (item) => {
    setNavbarList((lists) => {
      return lists.map((list) => {
        if (list.name === item.name) {
          return {
            ...list,
            active: true,
          };
        } else {
          return {
            ...list,
            active: false,
          };
        }
      });
    });
  };

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearchItemClick = (item) => {
    navigate("/sportclub-details", { state: item });
  };

  return (
    <section className="fixed w-full top-0 z-50 bg-white">
      <div className="w-11/12 mx-auto">
        <Navbar fluid className="border-none outline-none">
          <Navbar.Brand as={Link} to={navbarList[0].path}>
            <div className="ml-[7px] opacity-[100%]">
              <img
                className="w-[40px] cursor-pointer"
                src={logo}
                alt="SportHub Logo"
              />
            </div>
          </Navbar.Brand>

          <div className="flex md:order-2">
            <div className="mr-3 mt-1 hidden lg:block">
              <div className="relative max-w-72">
                <div className="relative w-full">
                  <PiMapPinAreaBold
                    onClick={() => navigate("/map")}
                    className="absolute mt-1 -left-10 text-2xl cursor-pointer"
                  />
                  <input
                    type="text"
                    placeholder="Search Sport Club"
                    onChange={(e) => searchItems(e.target.value)}
                    className="max-w-52 p-1 pr-12 pl-3 border rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <FaMagnifyingGlass className="absolute top-1/4 right-4 text-base" />
                </div>
                {searchInput && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10 scrollbar-hide">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSearchItemClick(item)}
                        >
                          {item.sport_name}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {isAuthenticated ? (
              <UserProfile onLogout={handleLogout} />
            ) : (
              <Button
                className="bg-[#172554] py-[2px] px-6 rounded-full foucs:ring-0 font-extrabold cursor-pointer"
                as={Link}
                to={"/login"}
              >
                ចូល
              </Button>
            )}
            <Navbar.Toggle className="text-black focus:ring-0 hover:bg-transparent md:block lg:hidden" />
          </div>
          <Navbar.Collapse>
            <div className="flex justify-center items-center md:hidden lg:hidden">
              <div className="relative max-w-72">
                <div className="relative w-full">
                  <PiMapPinAreaBold
                    onClick={() => navigate("/map")}
                    className="absolute mt-1 -left-10 text-2xl cursor-pointer"
                  />
                  <input
                    type="text"
                    placeholder="Search Sport Club"
                    onChange={(e) => searchItems(e.target.value)}
                    className="max-w-80 p-1 pr-12 pl-3 border rounded-3xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <FaMagnifyingGlass className="absolute top-1/4 right-4 text-base" />
                </div>
                {searchInput && (
                  <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-2xl shadow-lg max-h-60 overflow-y-auto z-10 scrollbar-hide">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSearchItemClick(item)}
                        >
                          {item.sport_name}
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            {navbarList.map((list, index) => (
              <Navbar.Link
                onClick={() => handleClick(list)}
                as={Link}
                to={list.path}
                active={list.active}
                key={index}
                style={
                  list.active
                    ? { color: "#172554", backgroundColor: "transparent" }
                    : { color: "black", backgroundColor: "transparent" }
                }
                className={`font-semibold group`}
              >
                <span className="group-hover:text-[#172554] cursor-pointer">
                  {list.name}
                </span>
              </Navbar.Link>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </section>
  );
}
