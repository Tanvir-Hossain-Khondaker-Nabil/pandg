import React, { useState, useEffect } from "react";
import logo from "../assets/PG Complete Logo 1.png";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [footerData, setFooterData] = useState({
    logo: "",
    copyright: "",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: ""
    },
    navigationLinks: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch("https://dev.pandgholding.binary-group.com/admin/api/footers");
        if (!response.ok) {
          throw new Error("Failed to fetch footer data");
        }
        const data = await response.json();
        
        // Assuming the API returns an array with one footer object
        const footer = data[0] || {};
        
        setFooterData({
          logo: footer.logo || "",
          copyright: footer.copyright || "",
          socialLinks: {
            facebook: footer.facebook || "",
            twitter: footer.twitter || "",
            instagram: footer.instagram || "",
            linkedin: footer.linkedin || ""
          },
          // Default navigation links that can be overridden by API if needed
          navigationLinks: [
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/insights", label: "Insights" },
            { path: "/corporatesustainability", label: "Corporate Sustainability" },
            { path: "/career", label: "Career" }
          ]
        });
      } catch (err) {
        setError(err.message);
        console.error("Error fetching footer data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) return <div className="text-center py-8"></div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <footer className="w-full bg-[#25184F] text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4 sm:px-12 lg:px-32">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              {footerData.logo ? (
                <img 
                  src={`https://dev.pandgholding.binary-group.com/${footerData.logo}`} 
                  alt="Company Logo" 
                  className="h-10"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = logo;
                  }}
                />
              ) : (
                <img src={logo} alt="Default Logo" className="h-10" />
              )}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col md:flex-row gap-3 text-center md:text-left font-medium">
            {footerData.navigationLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.path} 
                className="whitespace-nowrap hover:underline transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="flex gap-6 text-xl justify-center md:justify-end">
            {footerData.socialLinks.facebook && (
              <a
                href={footerData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-500 transition-colors"
              >
                <FaFacebookF />
              </a>
            )}
            {footerData.socialLinks.twitter && (
              <a
                href={footerData.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-sky-400 transition-colors"
              >
                <FaTwitter />
              </a>
            )}
            {footerData.socialLinks.instagram && (
              <a
                href={footerData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors"
              >
                <FaInstagram />
              </a>
            )}
            {footerData.socialLinks.linkedin && (
              <a
                href={footerData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-blue-700 transition-colors"
              >
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        {footerData.copyright && (
          <div className="text-center text-sm sm:text-base pt-4">
            {footerData.copyright}
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;