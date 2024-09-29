import CardGrid from "./cardGrid";
import Filters from "./Filters";
import SearchComponent from "./SearchComponent";

const Homepage = () => {
  return (
    <div className="">
      <div className="wrapper flex justify-center py-5">
        <SearchComponent />
      </div>
      <div className="flex justify-center py-5">
        <Filters />
      </div>
      <div className="justify-center">
        <CardGrid />
      </div>
    </div>
  );
};

export default Homepage;
