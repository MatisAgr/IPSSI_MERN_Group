import React from 'react';

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

export default function FooterComponent() {
  return (
    <Footer container className="bg-gray-800 text-white rounded-none">
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="https://flowbite.com"
              src="https://www.geek-chretien.fr/wp-content/uploads/2018/01/logo-leboncoin.png"
              alt="Logo"
              name={<span className="text-white">Le Coin Bon</span>}
              />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="about" className="text-gray-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-gray-400">Le Coin Bon</Footer.Link>
                <Footer.Link href="#" className="text-gray-400">Tailwind CSS</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow us" className="text-gray-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-gray-400">Github</Footer.Link>
                <Footer.Link href="#" className="text-gray-400">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" className="text-gray-400" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-gray-400">Privacy Policy</Footer.Link>
                <Footer.Link href="#" className="text-gray-400">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider className="border-gray-700" />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Le Coin Bon™" year={2024} className="text-gray-400" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="text-gray-400" />
            <Footer.Icon href="#" icon={BsInstagram} className="text-gray-400" />
            <Footer.Icon href="#" icon={BsTwitter} className="text-gray-400" />
            <Footer.Icon href="#" icon={BsGithub} className="text-gray-400" />
            <Footer.Icon href="#" icon={BsDribbble} className="text-gray-400" />
          </div>
        </div>
      </div>
    </Footer>
  );
};