import { useLocation } from "react-router-dom";
import HistoryDetailComponent from "../../components/history/HistoryDetailComponent";
import SpringFramework from "../../assets/spring_framework.jpg";
import WebDesign from "../../assets/web_design.jpg";
import DevOpsEngineering from "../../assets/devops_engineering.jpg";

export default function HistoryDetail() {
  const location = useLocation();
  const history = location.state;

  // console.log("Location:", location)
  // console.log("New in Detail Page: ", history);

  return (
    <>
      <main className="bg-slate-100">
        <section className="flex flex-col lg:flex-row w-10/12 justify-end items-start h-auto mx-auto py-24">
          <section className="lg:w-2/3 w-full h-auto pb-5 mt-5 border-b border-b-[#222162]">
            <HistoryDetailComponent
              image={history.thumbnail}
              title={history.title}
              body={history.body}
            />
          </section>
          <section className="lg:w-1/3 w-full h-auto relative lg:mt-0 mt-10">
            <section className="lg:absolute top-[160px] flex flex-row lg:flex-col gap-5">
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/Jfre9QVzatKJBvXR/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={SpringFramework}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/N2CX63TYUpmZ8Adj/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={WebDesign}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
              <div className="w-full lg:w-[75%] mx-auto h-auto cursor-pointer rounded-lg overflow-hidden">
                <a
                  href="https://www.facebook.com/share/p/N2CX63TYUpmZ8Adj/"
                  target="_blank"
                  className="block w-full h-full"
                >
                  <img
                    src={DevOpsEngineering}
                    alt="advertisement"
                    className="rounded-lg w-full h-auto block"
                  />
                </a>
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
