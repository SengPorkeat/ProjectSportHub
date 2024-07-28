import { Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { list } from "postcss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/SportHubLogo.png";
import logo2 from "../../assets/SportHubLogoWhite.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export function NavBarComponent3() {
  const [navbarList, setNavbarList] = useState([
    {
      name: "",
      path: "/",
      // active: true,
    },
    // {
    //   name: "Home",
    //   path: "/home",
    //   active: false,
    // },
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
      path: "/events",
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
  // icon search
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("text-black");

  const handleIconClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (item) => {
    setNavbarList((lists) => {
      //   console.log(lists);
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

  // TODO { To nagivate always on top page }
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <section className="relative max-w-screen-2xl mx-auto">
      <section className="relative w-11/12 mx-auto">
        <Navbar
          fluid
          rounded
          className="fixed top-0 w-11/12 mx-auto rounded-b-lg z-10 border-none outline-none backdrop-blur bg-transparent"
        >
          <span className="absolute inset-0 bg-gray-500 opacity-50 blur-[2px] rounded-b-lg -z-10"></span>
          <Navbar.Brand as={Link} to={list.path}>
            <div className="ml-[7px] opacity-[100%]">
              <img className="w-[40px]" src={logo} alt="SportHub Logo" />
            </div>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <div className="relative mr-2">
              <i
                className={`fa-solid fa-magnifying-glass z-10 cursor-pointer absolute top-1/2 right-4 text-slate-900  transform -translate-y-1/2 ${iconColor}`}
                onClick={handleIconClick}
              ></i>
              {showSearchBar && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  className="pl-5 pr-3 py-2 rounded-full border-none text-slate-900 outline-none"
                  placeholder="Search..."
                />
              )}
            </div>

            <Button
              className="bg-[#172554] py-[2px] px-6 rounded-full foucs:ring-0 font-extrabold"
              as={Link}
              to={"/login"}
            >
              ចូល
            </Button>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            {navbarList.map((list, index) => {
              return (
                <Navbar.Link
                  onClick={() => handleClick(list)}
                  as={Link}
                  to={list.path}
                  active={list.active}
                  key={index}
                  className="font-extrabold text-white"
                >
                  {list.name}
                </Navbar.Link>
              );
            })}
          </Navbar.Collapse>
        </Navbar>
      </section>
    </section>
  );
}
