import Hub from "./Hub";
import Investment from "./Investment";
import Overview from "./Overview";
import Partnership from "./Partnership";
import ToolProduct from "./ToolProduct";

const Home = () => {
  return (
    <div className=" relative overflow-hidden md:px-120px px-5">
      <Hub />
      <ToolProduct />
      <Overview />
      <Investment />
      <Partnership />
    </div>
  );
};

export default Home;
