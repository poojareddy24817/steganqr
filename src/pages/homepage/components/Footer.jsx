import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'QR Generator', path: '/generator-dashboard' },
        { name: 'Scanner Interface', path: '/scanner-interface' },
        { name: 'Technology Hub', path: '/technology-hub' },
        { name: 'Developer API', path: '/developer-api' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'Enterprise Security', path: '/pricing-enterprise' },
        { name: 'Creative Marketing', path: '/generator-dashboard' },
        { name: 'Personal Privacy', path: '/scanner-interface' },
        { name: 'Brand Protection', path: '/technology-hub' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', path: '/technology-hub' },
        { name: 'API Reference', path: '/developer-api' },
        { name: 'Security Audits', path: '/technology-hub' },
        { name: 'Best Practices', path: '/technology-hub' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/homepage' },
        { name: 'Privacy Policy', path: '/homepage' },
        { name: 'Terms of Service', path: '/homepage' },
        { name: 'Contact Support', path: '/homepage' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', url: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', url: '#' },
    { name: 'GitHub', icon: 'Github', url: '#' },
    { name: 'Discord', icon: 'MessageCircle', url: '#' }
  ];

  const securityBadges = [
    { name: 'ISO 27001', icon: 'Shield', color: 'text-success' },
    { name: 'SOC 2', icon: 'CheckCircle', color: 'text-accent' },
    { name: 'GDPR', icon: 'Lock', color: 'text-primary' },
    { name: 'CCPA', icon: 'UserCheck', color: 'text-success' }
  ];

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 crypto-pattern opacity-10"></div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link to="/homepage" className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-xl flex items-center justify-center shadow-brand-card group-hover:scale-110 transition-transform duration-300">
                  <Icon name="Shield" size={24} color="white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">SteganQR</span>
                  <span className="text-sm text-slate-400 font-medium">Security Hidden in Plain Sight</span>
                </div>
              </Link>
              
              <p className="text-slate-300 leading-relaxed max-w-md">
                Revolutionary steganographic QR codes that embed invisible data within ordinary images. 
                Advanced cryptography meets elegant simplicity for covert communications.
              </p>
              
              {/* Security Badges */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-200">Security Certifications</h4>
                <div className="flex flex-wrap gap-3">
                  {securityBadges?.map((badge, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
                    >
                      <Icon name={badge?.icon} size={14} className={badge?.color} />
                      <span className="text-xs font-medium">{badge?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            {footerSections?.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-white">{section?.title}</h3>
                <ul className="space-y-3">
                  {section?.links?.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link?.path}
                        className="text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-t border-white/10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Stay Updated</h3>
              <p className="text-slate-300">
                Get the latest updates on steganographic technology, security insights, and platform features.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />
              </div>
              <button className="px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <span>Subscribe</span>
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-slate-400 text-sm">
              © {currentYear} SteganQR. All rights reserved. Built with advanced steganographic technology.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-slate-400 text-sm">Follow us:</span>
              <div className="flex items-center space-x-4">
                {socialLinks?.map((social, index) => (
                  <a
                    key={index}
                    href={social?.url}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/20 transition-all duration-200"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 backdrop-blur-sm rounded-full border border-success/20">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-success text-sm font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-500">
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Security Policy</Link>
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Compliance</Link>
            <Link to="/homepage" className="hover:text-slate-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
      {/* Floating Security Indicator */}
      <div className="absolute top-8 right-8 hidden lg:block">
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm font-medium text-white">Secure Connection</span>
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;