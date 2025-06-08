function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text">
            &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}

export default Footer;