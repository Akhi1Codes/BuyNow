const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center border-[#0d0e14] border-t-2 p-2 text-xs">
      <p className="opacity-70">
        BuyNow - {currentYear}, All Rights Reserverd.
      </p>
    </footer>
  );
};

export default Footer;
