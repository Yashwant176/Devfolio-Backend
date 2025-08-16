import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] dark:bg-[#141624] py-16 px-6 lg:px-20">
      <div className="max-w-[1280px] mx-auto flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">
        {/* DevFolio section */}
        <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
          <h1 className="text-[#141624] text-2xl dark:text-[#FFFFFF]">
            DevFolio
          </h1>
          <p className="text-[14px] text-[#696A75] leading-[1.5] max-md:text-center dark:text-[#97989F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">
            Quick Links
          </p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>Home</li>
            <li>About</li>
            <li>Blog</li>
            <li>Archived</li>
            <li>Author</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Category */}
        <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
          <p className="font-semibold text-[16px] dark:text-white">Category</p>
          <ul className="flex flex-col gap-4 text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
            <li>Lifestyle</li>
            <li>Technology</li>
            <li>Travel</li>
            <li>Business</li>
            <li>Economy</li>
            <li>Sports</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2 rounded-lg dark:bg-[#242535] py-6">
          <h3 className="font-semibold text-xl dark:text-white">
            Weekly Newsletter
          </h3>
          <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#97989F]">
            Get blog articles and offers via email
          </p>
          <div className="w-full relative">
            <input
              placeholder="Your Email"
              className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-[#181A2A]"
            />
            <CiMail className="absolute top-[12px] right-[10px] text-[16px] dark:text-[#97989F]" />
          </div>
          <button className="bg-[#4B6BFB] text-[#FFFFFF] text-[16px] rounded-md w-full py-3">
            Subscribe
          </button>
        </div>
      </div>

      {/* Social Icons */}
      <div className="max-w-[1280px] mx-auto py-3 flex items-center gap-6 cursor-pointer max-md:mt-6 max-md:justify-center">
        <FaInstagram className="dark:text-white text-[20px] text-[#141624]" />
        <FaFacebookF className="dark:text-white text-[20px] text-[#141624]" />
        <BsTwitterX className="dark:text-white text-[20px] text-[#141624]" />
        <FaYoutube className="dark:text-white text-[20px] text-[#141624]" />
      </div>
    </footer>
  );
};

export default Footer;
