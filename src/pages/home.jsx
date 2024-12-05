import MetaData from "../utils/MetaData";
import Loader from "../components/Loader";
import Cards from "../components/products/Cards";
import { useSelector } from "react-redux";
import { useGetAllProductQuery } from "../redux/api/productApi";

const Home = () => {
  const category = useSelector((state) => state.category.selectedCategory);
  const keyword = useSelector((state) => state.search.searched);
  const { data, isLoading } = useGetAllProductQuery({ category, keyword });
  let products = data?.products;
  return (
    <div>
      <MetaData title={"Best Products"} content={"best products ever"} />
      {isLoading ? (
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
                product={product}
              />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
