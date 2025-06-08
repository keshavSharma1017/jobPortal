function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#1f2937', 
      color: '#ffffff', 
      padding: '2rem 0',
      marginTop: 'auto',
      borderTop: '1px solid #374151'
    }}>
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p style={{ 
            color: '#ffffff', 
            margin: 0, 
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            &copy; {new Date().getFullYear()} Job Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;