import { Helmet, HelmetProvider } from "react-helmet-async";
const MetaData = (data) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`${data.title} - BuyNow`}</title>
        <meta name="description" content={data.content} />
      </Helmet>
    </HelmetProvider>
  );
};

export default MetaData;
