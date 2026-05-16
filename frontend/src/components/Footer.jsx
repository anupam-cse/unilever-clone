const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        
        <div>
          <h3 className="text-2xl font-black mb-4">UNILEVER</h3>
          <p className="text-blue-200 text-sm">Making sustainable living commonplace since 1929.</p>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm">Brands</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li className="hover:text-white cursor-pointer">Lux</li>
            <li className="hover:text-white cursor-pointer">Dove</li>
            <li className="hover:text-white cursor-pointer">Lifebuoy</li>
            <li className="hover:text-white cursor-pointer">Sunsilk</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm">Company</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Sustainability</li>
            <li className="hover:text-white cursor-pointer">News</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 uppercase text-sm">Contact</h4>
          <ul className="space-y-2 text-blue-200 text-sm">
            <li>📧 info@unilever.com</li>
            <li>📞 +880 1234-567890</li>
            <li>📍 Dhaka, Bangladesh</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-blue-800 mt-10 pt-6 text-center text-blue-300 text-sm">
        © 2026 Unilever Clone. Built with ❤️ using Django + React
      </div>
    </footer>
  );
};

export default Footer;