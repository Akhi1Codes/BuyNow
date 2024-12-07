const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-center bg-[#0d0e14] p-2 text-xs">
      <p>BuyNow - {currentYear}, All Rights Reserverd.</p>
    </footer>
  );
};

export default Footer;
