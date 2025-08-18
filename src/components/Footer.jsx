const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-orange-500 p-4 text-white text-center">
      <p className="text-sm  tracking-wide">
        &copy; {currentYear} | Crafted with 🚀 | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
