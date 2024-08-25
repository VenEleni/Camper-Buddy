import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
    return (
        <>

        <footer className="text-center text-black mt-5" style={{ backgroundColor: '#dedede' }}>
        <div className="container pt-4">
          <section className="mb-4">
<p className='text-black'>
    Developed with ❤︎ by Eleni Veniou Nikolidaki
</p>

            <a
              className="bi bi-github btn-floating btn-lg text-black m-1 no-underline"
              href="https://github.com/VenEleni"
              role="button"
              data-mdb-ripple-color="dark"
            >
            </a>
      
            <a
              className="bi bi-linkedin btn-floating btn-lg text-dark m-1 no-underline"
              href="https://www.linkedin.com/in/veneleni/"
              role="button"
              data-mdb-ripple-color="dark"
            >
            </a>
           
          </section>
        </div>
        <div className="text-center text-dark  pb-3" style={{ backgroundColor: '#dedede' }}>
          © 2024 Project for:
          <a className="text-dark ml-2" href="https://socialhackersacademy.org/"> socialhackersacademy.com</a>
        </div>
      </footer>
        
      </>
    )
};

export default Footer;
