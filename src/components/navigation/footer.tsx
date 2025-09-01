import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import logoImg from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: 'Pages',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: '/blog' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' }
    ]
  }
  //   {
  //     title: "Product",
  //     links: [
  //       { name: "Overview", href: "#" },
  //       { name: "Pricing", href: "#" },
  //       { name: "Marketplace", href: "#" },
  //       { name: "Features", href: "#" },
  //     ],
  //   },
  //   {
  //     title: "Company",
  //     links: [
  //       { name: "About", href: "#" },
  //       { name: "Team", href: "#" },
  //       { name: "Blog", href: "#" },
  //       { name: "Careers", href: "#" },
  //     ],
  //   },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: '#', label: 'Instagram' },
  { icon: <FaFacebook className="size-5" />, href: '#', label: 'Facebook' },
  { icon: <FaTwitter className="size-5" />, href: '#', label: 'Twitter' },
  { icon: <FaLinkedin className="size-5" />, href: '#', label: 'LinkedIn' }
];

const defaultLegalLinks = [
  { name: 'Terms and Conditions', href: '/term-and-condition' },
  { name: 'Privacy Policy', href: 'privacy-policy' }
];

const Footer = ({
  logo = {
    url: '/',
    src: logoImg,
    alt: 'logo',
    title: 'Image Reshape'
  },
  sections = defaultSections,
  description = 'Image Resize is a free online image resizer that allows you to resize an image, change their format, compress them, and save the resized images as JPG, PNG or GIF.',
  socialLinks = defaultSocialLinks,
  copyright = '© 2025 imagereshaper.com. All rights reserved.',
  legalLinks = defaultLegalLinks
}: FooterProps) => {
  return (
    <footer data-testid="footer" className="mt-20 w-full">
      <div className="w-full border-t"></div>
      <div className=" text-foreground mx-auto max-w-[1200px] px-4 py-10">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div>
              <NavLink to={logo.url} className={'flex items-center gap-2'}>
                <img
                  src={logo.src || logoImg}
                  alt={logo.alt}
                  title={logo.title}
                  className="w-8 rounded-md"
                />
                <h2 className="text-xl font-semibold">{logo.title}</h2>
              </NavLink>
            </div>
            <p className="text-muted-foreground max-w-[70%] text-sm">{description}</p>
            <ul className="text-muted-foreground flex items-center space-x-6">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="hover:text-primary font-medium">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20" style={{ direction: 'rtl' }}>
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="hover:text-primary font-medium">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 w-full border-t"></div>
      <div className="text-foreground mx-auto max-w-[1200px] px-4 py-8">
        <div className="text-muted-foreground flex flex-col justify-between gap-4 pb-8 text-xs font-medium md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
