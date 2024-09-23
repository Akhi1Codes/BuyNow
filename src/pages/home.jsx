import MetaData from "../utils/MetaData";
import Loader from "../components/Loader";
import Cards from "../components/Cards";
import { getAllProducts, priceFilter } from "../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const { allProducts, loading } = useSelector((state) => state.product);
  let products = allProducts?.products;
  return (
    <div>
      <MetaData title={"Best Products"} content={"best products ever"} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <section className="w-fit mx-auto grid px-6 grid-cols-2 lg:grid-cols-5 md:grid-cols-3 justify-items-center justify-center gap-y-8 gap-x-10 mt-4 mb-4">
            {products?.map((product) => (
              <Cards
                key={product?._id}
                name={product?.name}
                price={product?.price}
                id={product?._id}
                image={product?.images}
                seller={product?.seller}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
