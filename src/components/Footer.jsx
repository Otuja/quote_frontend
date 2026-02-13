const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E293B] border-t border-[#334155] mt-auto">
      <div className="my-20">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-[#94A3B8]">
            &copy; {currentYear} iQuote | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
