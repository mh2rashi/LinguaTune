/**
 * The code below defines the Footer for redering  that rendering contact information, social media, and a copyright notice.
 * @returns The Footer component is returning a JSX element representing the footer section of a
 * website.
**/

// Import icons
import {
LinkedInIcon,
GitHubIcon,
EmailIcon
 } from "../assets/icons"



const Footer = () => {
    return (
      <footer className="border-t border-white border-solid border-white-500 mt-auto text-white fill-white">
        {/* Contact section */}
        <div className="py-10 flex flex-col justify-center items-center gap-4 sm:gap-6 ">
          <p className="bold font-semibold text-3xl">Get in touch</p>
  
          {/* Social media icons */}
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-center mx-auto w-fit gap-4 sm:gap-6 flex-wrap max-w-[600px] text-3xl sm:text-4xl">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/mhamza-rashid/" target="_blank" className="duration-200 hover:fill-blue-300 fill-white">
                <LinkedInIcon height={46} weight={46}/>
              </a>
              {/* GitHub */}
              <a href="https://github.com/mh2rashi" target="_blank" className="duration-200 hover:fill-blue-300 fill-white">
                <GitHubIcon height={46} weight={46}/>
              </a>
              {/* Email */}
              <a href="mailto:hamza022697@gmail.com" target="_blank" className="duration-200 hover:fill-blue-300">
                <EmailIcon height={46} weight={46}/>
              </a>
            </div>
          </div>
  
          {/* Copyright notice */}
          <p className="text-xl text-center justify-center flex">Copyright © 2024 Hamza Rashid. All rights reserved.</p>
  
        </div>
      </footer>
    );
  };
  
  export default Footer;
  