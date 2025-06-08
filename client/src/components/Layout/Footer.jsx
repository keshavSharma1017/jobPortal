function Footer() {
  return (
    <footer className="footer bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-white">&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;