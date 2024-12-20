'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
export default function Home() {
  const [showServiceList, setShowServiceList] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Track active menu
  const menuWrapperRef = useRef<HTMLDivElement>(null); // Ref for menu wrapper to detect outside clicks
  const [showLoginList, setShowLoginList] = useState(false);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  const toggleServiceList = () => setShowServiceList(!showServiceList);
  const toggleMenu = (menu: string | null) => {
    // If clicking on the already active menu, deactivate it
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  
  const [placeholderText, setPlaceholderText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const placeholderTexts = [
    "Try 'Gst Filing'",
    "Try 'FASSAI Registration'",
    "Try 'Trademark'",
    "Try 'Copyright Registration'",
  ];

  useEffect(() => {
    const currentText = placeholderTexts[currentTextIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setPlaceholderText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100); // Adjust speed of typewriter effect here
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholderText('');
        setCharIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % placeholderTexts.length);
      }, 2000); // Pause before switching to the next text
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentTextIndex, placeholderTexts]);

    // Close menus on body click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          menuWrapperRef.current &&
          !menuWrapperRef.current.contains(event.target as Node)
        ) {
          setActiveMenu(null); // Close all active menus
          setShowServiceList(false); // Close the "Consult an Expert" menu
          setShowLoginList(false); // Close the login list
          setShowHamburgerMenu(false); // Close the hamburger menu
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
  const toggleLogin = () => setShowLoginList(!showLoginList);
  const toggleHamburgerMenu = () => setShowHamburgerMenu(!showHamburgerMenu);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {/* Header Section with Navigation */}
      <header className="custom-header w-full bg-customHeader flex justify-between items-center">
          {/* Logo */}
          <Image
            src="/images/header-logo.svg"
            alt="Site Logo"
            width={126}
            height={40}
            className="mr-4"
          />
          {/* Navigation Wrapper */}
          <div className="webNavWrapper flex items-center relative">
            {/* Service Button */}
            <div className="servc-wrapper relative">
            <button
              onClick={toggleServiceList}
              className="service-button rounded-md"
            >
              Consult an Expert
              <i className="clib-border-black clib-border-l-[5px] clib-border-r-[5px] clib-border-t-[5px] clib-border-x-transparent"></i>
            </button>

            {/* Service List */}
            {showServiceList && (
              <div className="servc-list absolute bg-white">
                <ul>
                  <li>Talk to a Lawyer</li>
                  <li>Talk to a Chartered Accountant</li>
                  <li>Talk to a Company Secretary</li>
                  <li>Talk to a IP/Trademark Lawyer</li>
                </ul>
              </div>
            )}
            </div>
            {/* Navigation Menu */}
            <div className="menu-wrapper relative flex items-center content-between">
              <div className={`menu-item parent-item ${activeMenu === 'businessSetup' ? 'itemActive' : ''}`}>
                <button
                  onClick={() => toggleMenu('businessSetup')}
                  className={`menu-button text-white relative ${
                    activeMenu === 'businessSetup' ? 'menuActive' : ''
                  }`}
                >
                  Business Setup
                  <i
                    className={`clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 ${
                      activeMenu === 'businessSetup' ? '-clib-rotate-[135deg]' : 'clib-rotate-45'
                    } arrowStyleNotSimple zolvitArrowStyleInActive`}
                  ></i>
                </button>
                {activeMenu === 'businessSetup' && (
                  <div className="submenu-wrapper absolute left-0 bg-white flex justify-between items-start direction-row">
                    <div className="left-side flex direction-column items-start justify-start">
                      <button className="submenu-item flex items-center justify-start direction-row">
                      <img alt="Business Registration" title="Business Registration" loading="lazy" width="35" height="30" decoding="async" data-nimg="1" src="https://assets.vakilsearch.com/header-desktop/Register+a+Business.svg" />
                      Submenu 1
                      <i className="clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 -clib-rotate-45 arrow"></i>
                      </button>
                      <button className="submenu-item  flex items-center justify-start direction-row">
                      <img alt="Business Registration" title="Business Registration" loading="lazy" width="35" height="30" decoding="async" data-nimg="1" src="https://assets.vakilsearch.com/header-desktop/Register+a+Business.svg" />
                      Submenu 2
                      <i className="clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 -clib-rotate-45 arrow"></i>
                      </button>
                      <button className="submenu-item  flex items-center justify-start direction-row">
                      <img alt="Business Registration" title="Business Registration" loading="lazy" width="35" height="30" decoding="async" data-nimg="1" src="https://assets.vakilsearch.com/header-desktop/Register+a+Business.svg" />
                      Submenu 3
                      <i className="clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 -clib-rotate-45 arrow"></i>
                      </button>
                    </div>
                    <div className="right-side">
                      <h4>Heading</h4>
                      <div className="submenu-item">
                        <button className="submenu-button">Submenu 4</button>
                      </div>
                      <div className="submenu-item">
                        <button className="submenu-button">Submenu 5</button>
                      </div>
                      <div className="submenu-item">
                        <button className="submenu-button">Submenu 6</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={`menu-item parent-item ${activeMenu === 'taxCompliance' ? 'itemActive' : ''}`}>
                <button
                  onClick={() => toggleMenu('taxCompliance')}
                  className={`menu-button text-white relative ${
                    activeMenu === 'taxCompliance' ? 'menuActive' : ''
                  }`}
                >
                  Tax & Compliance
                  <i
                    className={`clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 ${
                      activeMenu === 'taxCompliance' ? '-clib-rotate-[135deg]' : 'clib-rotate-45'
                    } arrowStyleNotSimple zolvitArrowStyleInActive`}
                  ></i>
                </button>
                {activeMenu === 'taxCompliance' && (
                  <div className="submenu-wrapper absolute left-0 bg-white">
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 1</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 2</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 3</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`menu-item parent-item ${activeMenu === 'tradeMarkiP' ? 'itemActive' : ''}`}>
                <button
                  onClick={() => toggleMenu('tradeMarkiP')}
                  className={`menu-button text-white relative ${
                    activeMenu === 'tradeMarkiP' ? 'menuActive' : ''
                  }`}
                >
                  Trademark & IP
                  <i
                    className={`clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 ${
                      activeMenu === 'tradeMarkiP' ? '-clib-rotate-[135deg]' : 'clib-rotate-45'
                    } arrowStyleNotSimple zolvitArrowStyleInActive`}
                  ></i>
                </button>
                {activeMenu === 'tradeMarkiP' && (
                  <div className="submenu-wrapper absolute left-0 bg-white">
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 1</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 2</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 3</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`menu-item parent-item ${activeMenu === 'docuMentation' ? 'itemActive' : ''}`}>
                <button
                  onClick={() => toggleMenu('docuMentation')}
                  className={`menu-button text-white relative ${
                    activeMenu === 'docuMentation' ? 'menuActive' : ''
                  }`}
                >
                  Documentation
                  <i
                    className={`clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 ${
                      activeMenu === 'docuMentation' ? '-clib-rotate-[135deg]' : 'clib-rotate-45'
                    } arrowStyleNotSimple zolvitArrowStyleInActive`}
                  ></i>
                </button>
                {activeMenu === 'docuMentation' && (
                  <div className="submenu-wrapper absolute left-0 bg-white">
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 1</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 2</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 3</button>
                    </div>
                  </div>
                )}
              </div>
              <div className={`menu-item parent-item ${activeMenu === 'oThers' ? 'itemActive' : ''}`}>
                <button
                  onClick={() => toggleMenu('oThers')}
                  className={`menu-button text-white relative ${
                    activeMenu === 'oThers' ? 'menuActive' : ''
                  }`}
                >
                  Others
                  <i
                    className={`clib-border-r-[3px] clib-border-b-[3px] clib-border-white clib-inline-block clib-p-1 ${
                      activeMenu === 'oThers' ? '-clib-rotate-[135deg]' : 'clib-rotate-45'
                    } arrowStyleNotSimple zolvitArrowStyleInActive`}
                  ></i>
                </button>
                {activeMenu === 'oThers' && (
                  <div className="submenu-wrapper absolute left-0 bg-white">
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 1</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 2</button>
                    </div>
                    <div className="submenu-item">
                      <button className="submenu-button">Submenu 3</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Login Button */}
            <div className="login-wrapper relative">
            <button onClick={toggleLogin} className="login-button text-white rounded-md">
              Login
            </button>
            {/* Login List */}
            {showLoginList && (
              <div className="login-list hamburger-menu absolute top-full right-0 mt-2 bg-white p-4 shadow-lg w-48">
                <ul>
                  <li className="block py-2 px-4">Sign In</li>
                  <li className="block py-2 px-4">Sign Up</li>
                </ul>
              </div>
            )}
            </div>
            {/* Hamburger Menu Button */}
            <div className="hamburger-wrapper">
            <button
              onClick={toggleHamburgerMenu}
              className="hamburger-button text-white flex items-center">
              <div className="clib-block clib-bg-white clib-h-[3px] clib-w-6 clib-rounded-[3px] clib-relative clib-transition-all"></div>
              <div className="clib-block clib-bg-white clib-h-[3px] clib-w-6 clib-rounded-[3px] clib-relative clib-transition-all"></div>
              <div className="clib-block clib-bg-white clib-h-[3px] clib-w-6 clib-rounded-[3px] clib-relative clib-transition-all"></div>
              <span></span>
            </button>
            {/* Hamburger Menu List */}
            {showHamburgerMenu && (
              <div className="hamburger-menu absolute top-full right-0 mt-2 bg-white p-4 shadow-lg w-48">
                <ul>
                  <li><a href="#home" className="block py-2 px-4">Home</a></li>
                  <li><a href="#about" className="block py-2 px-4">About</a></li>
                  <li><a href="#services" className="block py-2 px-4">Services</a></li>
                  <li><a href="#contact" className="block py-2 px-4">Contact</a></li>
                </ul>
              </div>
            )}
            </div>
          </div>
      </header>
      {/* Announcement Bar */}
      <div className="announcement-bar w-full flex items-center justify-center">
        <img alt="attention" loading="lazy" width="18" height="18" src="https://assets.vakilsearch.com/announcement_alert.svg" />
        <p className="emergencyText"><span className="boldText">Attention: </span>File GSTR 9/9C by 31 Dec — Avoid Penalties Now! <span className="applyWrapper">Talk to our expert</span></p>
      </div>
      {/* Main Content */}
      <main className="text-center">
        {/*Banner Section*/}
        <div className="tw-flex tw-flex-col">
          <div className="tw-flex tw-flex-col tw-bg-[#022B50] md:tw-px-[5px] tw-relative tw-items-center md:tw-pt-[70px] tw-pt-[40px] md:tw-pb-[280px] max-md:tw-h-[683px] md:tw-h-[780px] tw-gap-[16px]">
              <a target="_blank" href="https://g.co/kgs/Aro7t3m">
                  <div className="max-md:tw-w-[200px] tw-flex md:tw-flex-row tw-flex-wrap tw-items-center tw-justify-center tw-bg-[#022B50] md:tw-gap-2 tw-gap-1">
                      <img
                          alt="user-image"
                          loading="lazy"
                          width="150"
                          height="47"
                          decoding="async"
                          data-nimg="1"
                          className="md:tw-w-[160px] md:tw-h-[50px] tw-w-[90px] tw-h-[26px]"
                          
                          src="https://assets.vakilsearch.com/ic-user-grp.svg"
                      />
                      <img
                          alt="rating-image"
                          loading="lazy"
                          width="150"
                          height="31"
                          decoding="async"
                          data-nimg="1"
                          className="md:tw-w-[160px] md:tw-h-[35px] tw-w-[100px] tw-h-[20px]"
                          
                          src="https://assets.vakilsearch.com/live-images/ic-rating-star.svg"
                      />
                      <p className="tw-text-white md:tw-text-[28px] tw-text-[16px] tw-font-medium tw-leading-8">4.5/5</p>
                      <p className="tw-text-white md:tw-text-xl tw-text-[16px] tw-font-thin tw-leading-7">(16k+ Reviews)</p>
                  </div>
              </a>
              <div className="md:tw-mb-[64px] tw-mb-[32px] tw-flex tw-flex-col tw-items-center tw-justify-center">
                  <h1 className="tw-text-white md:tw-text-[60px] tw-text-[32px] tw-font-bold md:tw-leading-[72px] tw-leading-[37px] md:tw-text-center max-lg:tw-text-center">
                      India's <span className="tw-text-[#FFC24F]">Top Rated </span>Professional Services Platform
                  </h1>
                  <p className="tw-text-white md:tw-text-[24px] max-md:tw-w-[300px] tw-text-[16px] tw-font-normal md:tw-leading-8 tw-leading-[18px] tw-text-center tw-mt-3">Connecting you with experts to simplify your legal, tax &amp; compliance.</p>
              </div>
              <div className="tw-w-full tw-z-50">
                  <div
                      className="tw-w-full md:tw-max-w-[949px] md:tw-rounded-3xl tw-rounded-[32px] tw-max-w-[343px] tw-mx-auto tw-flex tw-flex-row tw-justify-between tw-relative md:tw-py-[16px] md:tw-px-[24px] tw-py-[12px] tw-px-[12px] tw-border tw-border-white tw-bg-white"
                  >
                      <input id="autosuggestfor" className="tw-w-full tw-text-lg tw-text-blue-900 tw-border-none tw-outline-none tw-px-[12px]&quot;" type="text" placeholder={placeholderText} />
                      <img alt="searchIcon" loading="lazy" width="24" height="24" src="https://assets.vakilsearch.com/live-images/ic-search-blue.svg" />
                  </div>
              </div>
              <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-2 md:tw-gap-4 tw-z-10">
                  <a className="tw-text-xs tw-cursor-pointer md:tw-text-base tw-bg-[#22384D] tw-border-[#5E6E7C] tw-border-[1px] tw-rounded-xl tw-px-4 tw-py-1 hover:tw-bg-[#5E6E7C]" href="https://vakilsearch.com/gst-registration">
                      <p className="tw-text-white">GST Registration</p>
                  </a>
                  <a className="tw-text-xs tw-cursor-pointer md:tw-text-base tw-bg-[#22384D] tw-border-[#5E6E7C] tw-border-[1px] tw-rounded-xl tw-px-4 tw-py-1 hover:tw-bg-[#5E6E7C]" href="https://vakilsearch.com/company-registration">
                      <p className="tw-text-white">Company Registration</p>
                  </a>
                  <a className="tw-text-xs tw-cursor-pointer md:tw-text-base tw-bg-[#22384D] tw-border-[#5E6E7C] tw-border-[1px] tw-rounded-xl tw-px-4 tw-py-1 hover:tw-bg-[#5E6E7C]" href="https://vakilsearch.com/online-accounting-compliance-service">
                      <p className="tw-text-white">Accounting &amp; Business Compliance</p>
                  </a>
                  <a className="tw-text-xs tw-cursor-pointer md:tw-text-base tw-bg-[#22384D] tw-border-[#5E6E7C] tw-border-[1px] tw-rounded-xl tw-px-4 tw-py-1 hover:tw-bg-[#5E6E7C]" href="https://vakilsearch.com/ipindia/trademark-registration">
                      <p className="tw-text-white">Trademark</p>
                  </a>
              </div>
              <img
                  alt="logo-banner"
                
                  width="443"
                  height="449"
                  decoding="async"
                  data-nimg="1"
                  className="tw-absolute tw-left-0 tw-bottom-0 md:tw-w-[443px] md:tw-h-[449px] tw-w-[223px] tw-h-[223px]"
                  src="https://vakilsearch.com/_next/image?url=https%3A%2F%2Fassets.vakilsearch.com%2Flive-images%2Fic-zolvit-logo-gray.png&w=1080&q=75"
              />
          </div>
          <div className="tw-flex tw-flex-row tw-mt-[-189px] md:tw-mt-[-249px] tw-z-10 md:tw-justify-center">
            <div className="tw-flex tw-overflow-x-scroll lg:tw-overflow-x-hidden">
                <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#F5FCFF] tw-to-[#FFFFFF] tw-bg-opacity-20 tw-rounded-lg tw-p-[16px] tw-border-[1px] tw-m-2 max-md:tw-shadow-lg">
                    <div className="!tw-w-[200px] md:tw-w-[53px]">
                        <div className="max-md:tw-min-h-[210px]">
                            <p className="tw-text-[20px] md:tw-h-[46px] tw-font-bold tw-leading-[23px]">Register your company</p>
                            <p className="tw-text-[16px] tw-text-[#243A4F] tw-font-normal tw-py-[12px] tw-leading-[18px]">Starting from ₹999/-</p>
                            <div className="tw-min-h-[114px]">
                                <img
                                    alt="Register your company"
                                    loading="lazy"
                                    width="100"
                                    height="84"
                                    decoding="async"
                                    data-nimg="1"
                                    className="md:tw-py-3 w-auto"
                                    
                                    src="https://assets.vakilsearch.com/ic-brief-case.svg"
                                />
                            </div>
                        </div>
                        <a href="https://vakilsearch.com/company-registration/private-limited">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Private Limited company</p>
                                <img alt="Register your company" width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/company-registration/llp-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Limited Liability Partnership</p>
                                <img alt="Register your company" width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/company-registration/opc-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">One Person company</p>
                                <img alt="Register your company"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/company-registration/partnership-firm">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Partnership Firm</p>
                                <img alt="Register your company"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/company-registration/sole-proprietorship">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Sole Proprietorship</p>
                                <img alt="Register your company"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#F5FCFF] tw-to-[#FFFFFF] tw-bg-opacity-20 tw-rounded-lg tw-p-[16px] tw-border-[1px] tw-m-2 max-md:tw-shadow-lg">
                    <div className="!tw-w-[200px] md:tw-w-[53px]">
                        <div className="max-md:tw-min-h-[210px]">
                            <p className="tw-text-[20px] md:tw-h-[46px] tw-font-bold tw-leading-[23px]">File GST</p>
                            <p className="tw-text-[16px] tw-text-[#243A4F] tw-font-normal tw-py-[12px] tw-leading-[18px]">Starting from ₹399/-</p>
                            <div className="tw-min-h-[114px]">
                                <img alt="File GST" loading="lazy" width="100" height="84" decoding="async" data-nimg="1" className="md:tw-py-3 w-auto"  src="https://assets.vakilsearch.com/ic-books.svg" />
                            </div>
                        </div>
                        <a href="https://vakilsearch.com/gst-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">GST Registration</p>
                                <img alt="File GST"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/gst/return-filing">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">GST Filing</p>
                                <img alt="File GST"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/gst/cancellation-revocation">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">GST Cancellation and Revocation</p>
                                <img alt="File GST"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/gst/notice">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Reply to GST Notice</p>
                                <img alt="File GST"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/gst/indirect-tax">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Indirect Tax</p>
                                <img alt="File GST"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#F5FCFF] tw-to-[#FFFFFF] tw-bg-opacity-20 tw-rounded-lg tw-p-[16px] tw-border-[1px] tw-m-2 max-md:tw-shadow-lg">
                    <div className="!tw-w-[200px] md:tw-w-[53px]">
                        <div className="max-md:tw-min-h-[210px]">
                            <p className="tw-text-[20px] md:tw-h-[46px] tw-font-bold tw-leading-[23px]">Protect your Intellectual Property</p>
                            <p className="tw-text-[16px] tw-text-[#243A4F] tw-font-normal tw-py-[12px] tw-leading-[18px]">Starting from ₹1499/-</p>
                            <div className="tw-min-h-[114px]">
                                <img
                                    alt="Protect your Intellectual Property"
                                    loading="lazy"
                                    width="100"
                                    height="84"
                                    decoding="async"
                                    data-nimg="1"
                                    className="md:tw-py-3 w-auto"
                                    
                                    src="https://assets.vakilsearch.com/ic-locker.svg"
                                />
                            </div>
                        </div>
                        <a href="https://vakilsearch.com/ipindia/trademark-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Trademark Registration</p>
                                <img
                                    alt="Protect your Intellectual Property"
                                    
                                    width="8"
                                    height="4"
                                    decoding="async"
                                    data-nimg="1"
                                    
                                    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/ipindia/copyright-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Copyright Registration</p>
                                <img
                                    alt="Protect your Intellectual Property"
                                    
                                    width="8"
                                    height="4"
                                    decoding="async"
                                    data-nimg="1"
                                    
                                    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/ipindia/patent-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Patent Registration</p>
                                <img
                                    alt="Protect your Intellectual Property"
                                    
                                    width="8"
                                    height="4"
                                    decoding="async"
                                    data-nimg="1"
                                    
                                    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/ipindia/trademark-objection">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Trademark Objection</p>
                                <img
                                    alt="Protect your Intellectual Property"
                                    
                                    width="8"
                                    height="4"
                                    decoding="async"
                                    data-nimg="1"
                                    
                                    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/ipindia/trademark-infringement-india">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Trademark Infringement</p>
                                <img
                                    alt="Protect your Intellectual Property"
                                    
                                    width="8"
                                    height="4"
                                    decoding="async"
                                    data-nimg="1"
                                    
                                    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#F5FCFF] tw-to-[#FFFFFF] tw-bg-opacity-20 tw-rounded-lg tw-p-[16px] tw-border-[1px] tw-m-2 max-md:tw-shadow-lg">
                    <div className="!tw-w-[200px] md:tw-w-[53px]">
                        <div className="max-md:tw-min-h-[210px]">
                            <p className="tw-text-[20px] md:tw-h-[46px] tw-font-bold tw-leading-[23px]">Maintain your Accounts</p>
                            <p className="tw-text-[16px] tw-text-[#243A4F] tw-font-normal tw-py-[12px] tw-leading-[18px]">Starting from ₹4999/-</p>
                            <div className="tw-min-h-[114px]">
                                <img alt="Maintain your Accounts" loading="lazy" width="100" height="84" decoding="async" data-nimg="1" className="md:tw-py-3 w-auto"  src="https://assets.vakilsearch.com/ic-graph.svg" />
                            </div>
                        </div>
                        <a href="https://vakilsearch.com/accounting-bookkeeping-services">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Accounting and Book-keeping</p>
                                <img alt="Maintain your Accounts"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/online-accounting-compliance-service">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Annual Compliance</p>
                                <img alt="Maintain your Accounts"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/online-tds-return-filing">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">TDS Return Filing</p>
                                <img alt="Maintain your Accounts"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/income-tax-return-filing-online/notice">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Income Tax Notice</p>
                                <img alt="Maintain your Accounts"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/company-secretary/audit">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">Secretarial Audit</p>
                                <img alt="Maintain your Accounts"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-bg-gradient-to-b tw-from-[#F5FCFF] tw-to-[#FFFFFF] tw-bg-opacity-20 tw-rounded-lg tw-p-[16px] tw-border-[1px] tw-m-2 max-md:tw-shadow-lg">
                    <div className="!tw-w-[200px] md:tw-w-[53px]">
                        <div className="max-md:tw-min-h-[210px]">
                            <p className="tw-text-[20px] md:tw-h-[46px] tw-font-bold tw-leading-[23px]">Licenses</p>
                            <p className="tw-text-[16px] tw-text-[#243A4F] tw-font-normal tw-py-[12px] tw-leading-[18px]">Starting from ₹999/-</p>
                            <div className="tw-min-h-[114px]">
                                <img alt="Licenses" loading="lazy" width="100" height="84" decoding="async" data-nimg="1" className="md:tw-py-3 w-auto"  src="https://assets.vakilsearch.com/ic-license.svg" />
                            </div>
                        </div>
                        <a href="https://vakilsearch.com/iso-certification">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">ISO Registration</p>
                                <img alt="Licenses"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/fssai-registration">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">FSSAI Registration</p>
                                <img alt="Licenses"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/import-export-code">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">IEC Registration</p>
                                <img alt="Licenses"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/liquor-license">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">LIQUOR License Registration</p>
                                <img alt="Licenses"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                        <a href="https://vakilsearch.com/psara-license-services">
                            <div className="md:tw-mt-[12px] tw-mt-[8px] tw-flex tw-flex-row tw-cursor-pointer tw-items-center tw-justify-between hover:tw-bg-[#ECF6FF] tw-px-2 tw-rounded-lg">
                                <p className="tw-text-[12px] tw-text-[#2E2E2E] tw-text-left tw-font-normal md:tw-py-[12px] tw-py-[4px] tw-leading-[18px]">PSARA Registration</p>
                                <img alt="Licenses"  width="8" height="4" decoding="async" data-nimg="1"  src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="tw-flex tw-flex-col md:tw-mt-[100px] tw-mt-[52px] tw-md:gap-[40px] tw-gap-[70px] tw-overflow-hidden">
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
              <h2 className="md:tw-max-w-[984px] tw-max-w-[342px] tw-text-center md:tw-text-[40px] tw-text-[18px] md:tw-leading-[46px] tw-leading-[21px] tw-font-semibold tw-text-[#022B50]">
                  350+ Verified CA, CS, and Legal Experts Ready to Streamline Your Business Operations.
              </h2>
              <div className="tw-flex tw-flex-row max-lg:tw-flex-col tw-gap-[70px] md:tw-max-w-[1333px] tw-items-center md:tw-mt-[50px] tw-mt-[32px] tw-p-[16px]">
                  <img alt="logo-banner" loading="lazy" width="500" height="500"   className="max-lg:tw-hidden"  src="https://assets.vakilsearch.com/ic-experts_man.svg" />
                  <div className="tw-flex tw-flex-col tw-justify-center tw-gap-[12px]">
                      <a className="onhover" href="https://vakilsearch.com/talk-to-a-lawyer">
                          <div
                              className="onhover-wrap tw-flex tw-flex-row tw-items-center tw-gap-[16px] max-md:tw-shadow-[0px_0px_8px_0px_#00000026] tw-p-[12px] tw-border-[1px] tw-rounded-[4px] tw-cursor-pointer max-sm:hover:tw-shadow-[0px_0px_15.6px_0px_#00000026] max-sm:hover:tw-border-[#FFFFFF]"
                          >
                              <img
                                  alt="logo-banner"
                                  loading="lazy"
                                  width="112"
                                  height="111"
                                  
                                  
                                  className="md:tw-w-[112px] md:tw-h-[111px] tw-w-[53px] tw-h-[53px]"
                                  
                                  src="https://assets.vakilsearch.com/ic-ttl.svg"
                              />
                              <div className="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between">
                                  <div className="tw-flex tw-flex-col tw-justify-center tw-gap-[4px]">
                                      <p className="md:tw-text-[24px] tw-text-[16px] tw-text-left tw-font-semibold md:tw-leading-[30px] tw-leading-[18px]">Talk to Lawyer</p>
                                      <p className="md:tw-text-[16px] tw-text-[12px] md:tw-max-w-[306px] tw-max-w-[212px] md:tw-leading-[21px] tw-leading-[14px] text-left">
                                          Provide legal advice, draft contracts, handle litigation, and offer legal representation.
                                      </p>
                                  </div>
                                  <div className="">
                                      <img
                                          alt="arrow"
                                          loading="lazy"
                                          width="12"
                                          height="10"
                                          
                                          
                                          className="tw-w-[12px] tw-h-[10px] md:tw-w-[22px] md:tw-h-[22px]"
                                          
                                          src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                      />
                                  </div>
                              </div>
                          </div>
                      </a>
                      <a className="onhover" href="https://vakilsearch.com/chartered-accountant-services">
                          <div
                              className="onhover-wrap tw-flex tw-flex-row tw-items-center tw-gap-[16px] max-md:tw-shadow-[0px_0px_8px_0px_#00000026] tw-p-[12px] tw-border-[1px] tw-rounded-[4px] tw-cursor-pointer max-sm:hover:tw-shadow-[0px_0px_15.6px_0px_#00000026] max-sm:hover:tw-border-[#FFFFFF]"
                          >
                              <img
                                  alt="logo-banner"
                                  loading="lazy"
                                  width="112"
                                  height="111"
                                  
                                  
                                  className="md:tw-w-[112px] md:tw-h-[111px] tw-w-[53px] tw-h-[53px]"
                                  
                                  src="https://assets.vakilsearch.com/ic-calc.svg"
                              />
                              <div className="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between">
                                  <div className="tw-flex tw-flex-col tw-justify-center tw-gap-[4px]">
                                      <p className="md:tw-text-[24px] tw-text-[16px] tw-text-left tw-font-semibold md:tw-leading-[30px] tw-leading-[18px]">Talk to Chartered accountant</p>
                                      <p className="md:tw-text-[16px] tw-text-[12px] md:tw-max-w-[306px] tw-max-w-[212px] md:tw-leading-[21px] tw-leading-[14px] text-left">Provide financial auditing, taxation advice, and financial planning services.</p>
                                  </div>
                                  <div className="">
                                      <img
                                          alt="arrow"
                                          loading="lazy"
                                          width="12"
                                          height="10"
                                          
                                          
                                          className="tw-w-[12px] tw-h-[10px] md:tw-w-[22px] md:tw-h-[22px]"
                                          
                                          src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                      />
                                  </div>
                              </div>
                          </div>
                      </a>
                      <a className="onhover" href="https://vakilsearch.com/company-secretary">
                          <div
                              className="onhover-wrap tw-flex tw-flex-row tw-items-center tw-gap-[16px] max-md:tw-shadow-[0px_0px_8px_0px_#00000026] tw-p-[12px] tw-border-[1px] tw-rounded-[4px] tw-cursor-pointer max-sm:hover:tw-shadow-[0px_0px_15.6px_0px_#00000026] max-sm:hover:tw-border-[#FFFFFF]"
                          >
                              <img
                                  alt="logo-banner"
                                  loading="lazy"
                                  width="112"
                                  height="111"
                                  
                                  
                                  className="md:tw-w-[112px] md:tw-h-[111px] tw-w-[53px] tw-h-[53px]"
                                  
                                  src="https://assets.vakilsearch.com/ic-at.svg"
                              />
                              <div className="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between">
                                  <div className="tw-flex tw-flex-col tw-justify-center tw-gap-[4px]">
                                      <p className="md:tw-text-[24px] tw-text-[16px] tw-text-left tw-font-semibold md:tw-leading-[30px] tw-leading-[18px]">Talk to Company secretary</p>
                                      <p className="md:tw-text-[16px] tw-text-[12px] md:tw-max-w-[306px] tw-max-w-[212px] md:tw-leading-[21px] tw-leading-[14px] text-left">
                                          Advisory on corporate governance, regulatory compliance, and secretarial services for businesses and enterprises.
                                      </p>
                                  </div>
                                  <div className="">
                                      <img
                                          alt="arrow"
                                          loading="lazy"
                                          width="12"
                                          height="10"
                                          
                                          
                                          className="tw-w-[12px] tw-h-[10px] md:tw-w-[22px] md:tw-h-[22px]"
                                          
                                          src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                      />
                                  </div>
                              </div>
                          </div>
                      </a>
                      <a className="onhover" href="https://vakilsearch.com/intellectual-property-lawyer-services-in-india">
                          <div
                              className="onhover-wrap tw-flex tw-flex-row tw-items-center tw-gap-[16px] max-md:tw-shadow-[0px_0px_8px_0px_#00000026] tw-p-[12px] tw-border-[1px] tw-rounded-[4px] tw-cursor-pointer max-sm:hover:tw-shadow-[0px_0px_15.6px_0px_#00000026] max-sm:hover:tw-border-[#FFFFFF]"
                          >
                              <img
                                  alt="logo-banner"
                                  loading="lazy"
                                  width="112"
                                  height="111"
                                  
                                  
                                  className="md:tw-w-[112px] md:tw-h-[111px] tw-w-[53px] tw-h-[53px]"
                                  
                                  src="https://assets.vakilsearch.com/ic-court.svg"
                              />
                              <div className="tw-flex tw-flex-row tw-w-full tw-items-center tw-justify-between">
                                  <div className="tw-flex tw-flex-col tw-justify-center tw-gap-[4px]">
                                      <p className="md:tw-text-[24px] tw-text-[16px] tw-text-left tw-font-semibold md:tw-leading-[30px] tw-leading-[18px]">Talk to Intellectual Property Lawyer</p>
                                      <p className="md:tw-text-[16px] tw-text-[12px] md:tw-max-w-[306px] tw-max-w-[212px] md:tw-leading-[21px] tw-leading-[14px] text-left">
                                          Assist with trademarks, copyrights, patents, and intellectual property rights enforcement and protection.
                                      </p>
                                  </div>
                                  <div className="">
                                      <img
                                          alt="arrow"
                                          loading="lazy"
                                          width="12"
                                          height="10"
                                          
                                          
                                          className="tw-w-[12px] tw-h-[10px] md:tw-w-[22px] md:tw-h-[22px]"
                                          
                                          src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg"
                                      />
                                  </div>
                              </div>
                          </div>
                      </a>
                  </div>
              </div>
          </div>
          <div className="tw-flex tw-flex-col tw-text-[#ffffff] tw-py-[30px] md:tw-py-[50px] md:tw-mt-[40px] md:tw-w-full tw-bg-[#022B50] tw-items-center tw-justify-center">
              <h2 className="md:tw-text-[35px] tw-text-[24px] tw-leading-[41px] tw-font-bold">Our Customers</h2>
              <div className="tw-flex md:tw-flex-row tw-flex-wrap md:tw-gap-20 tw-gap-[18px] max-md:tw-max-w-[273px] tw-items-center tw-justify-center tw-pt-[14px]">
                  <div className="tw-flex tw-flex-col tw-border-1 tw-rounded-lg md:tw-pt-[52px] tw-pt-[14px]">
                      <img alt="logo" loading="lazy" width="78" height="27"    src="https://assets.vakilsearch.com/live-images/ic-oyo.svg" />
                  </div>
                  <div className="tw-flex tw-flex-col tw-border-1 tw-rounded-lg md:tw-pt-[52px] tw-pt-[14px]">
                      <img alt="logo" loading="lazy" width="91" height="27"    src="https://assets.vakilsearch.com/live-images/ic-small-swiggy.svg" />
                  </div>
                  <div className="tw-flex tw-flex-col tw-border-1 tw-rounded-lg md:tw-pt-[52px] tw-pt-[14px]">
                      <img alt="logo" loading="lazy" width="124" height="27"    src="https://assets.vakilsearch.com/live-images/ic-bigbasket.svg" />
                  </div>
                  <div className="tw-flex tw-flex-col tw-border-1 tw-rounded-lg md:tw-pt-[52px] tw-pt-[14px]">
                      <img alt="logo" loading="lazy" width="162" height="27"    src="https://assets.vakilsearch.com/live-images/ic-hdfc.svg" />
                  </div>
                  <div className="tw-flex tw-flex-col tw-border-1 tw-rounded-lg md:tw-pt-[52px] tw-pt-[14px]">
                      <img alt="logo" loading="lazy" width="90" height="27"    src="https://assets.vakilsearch.com/live-images/ic-amazon.svg" />
                  </div>
              </div>
          </div>
          <div className="tw-flex tw-flex-col tw-pb-[50px] tw-w-full md:tw-max-w-[1200px] md:tw-mt-[40px] md:tw-mx-auto md:tw-w-full tw-items-center tw-justify-center">
              <h2 className="md:tw-text-[35px] tw-text-[24px] tw-font-bold tw-leading-[35px] tw-text-[#022B50]">Our Free Product Suite Trial</h2>
              <p className="md:tw-text-[24px] tw-text-[16px] tw-text-center max-md:tw-w-[303px] tw-text-[#284B6A] md:tw-leading-[28px] tw-py-[12px]">Increase efficiency and productivity with our scalable solutions</p>
              <div className="tw-flex lg:tw-flex-row tw-flex-col md:tw-gap-20 tw-gap-[40px] md:tw-mt-[71px] tw-mt-[30px] max-lg:tw-mx-[16px]">
                  <div
                      className="tw-flex tw-flex-col tw-w-full tw-bg-[#F6F6F6] md:tw-rounded-[30px] tw-rounded-[8px] tw-border-[1px] tw-border-[#F6F6F6] tw-shadow-[0px_0px_15.6px_0px_#00000026] md:tw-pt-[72px] tw-pt-[32px] md:tw-px-[50px] tw-px-[20px]"
                  >
                      <img
                          alt="AI-powered case alerts &amp; research for your legal practice"
                          loading="lazy"
                          width="148"
                          height="26"
                          
                          
                          className="align-left"
                          
                          src="https://assets.vakilsearch.com/live-images/ic-libra-logo.svg"
                      />
                      <div className="tw-flex tw-flex-col tw-mt-[24px]"><p className="md:tw-text-[40px] tw-text-[20px] tw-font-medium tw-text-[#022B50]">AI-powered case alerts &amp; research for your legal practice</p></div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-blue-round-tick.svg" />
                          <p className="tw-text-[#022B50] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Hearings:</b> Get instant court notifications, including case number and room details, with just one click.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-blue-round-tick.svg" />
                          <p className="tw-text-[#022B50] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Judgements:</b> Access over 5 million judgments quickly by searching keywords, citations, parties, or judges.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-blue-round-tick.svg" />
                          <p className="tw-text-[#022B50] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Display Board:</b> Stay updated on daily item numbers with our live display board.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-blue-round-tick.svg" />
                          <p className="tw-text-[#022B50] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Case Alerts:</b> Stay ahead in your legal strategy with real-time case updates from India's largest case directory.</p>
                      </div>
                      <div className="tw-pt-[40px] tw-flex tw-items-center tw-justify-center">
                          <img
                              alt="demo-banner"
                              loading="lazy"
                              width="473"
                              height="223"
                          
                              src="https://vakilsearch.com/_next/image?url=https%3A%2F%2Fassets.vakilsearch.com%2Flive-images%2Flibra-demo-banner.png&w=1080&q=75"
                          />
                      </div>
                  </div>
                  <div
                      className="tw-flex tw-flex-col tw-w-full tw-bg-[#022B50] md:tw-rounded-[30px] tw-rounded-[8px] tw-border-[1px] tw-border-[#F6F6F6] tw-shadow-[0px_0px_15.6px_0px_#00000026] md:tw-pt-[72px] tw-pt-[32px] md:tw-px-[50px] tw-px-[20px]"
                  >
                      <img
                          alt="A complete overview of your business"
                          loading="lazy"
                          width="148"
                          height="26"
                          
                          
                          className="align-left"
                          
                          src="https://assets.vakilsearch.com/live-images/ic-zolvit-logo.svg"
                      />
                      <div className="tw-flex tw-flex-col tw-mt-[24px]"><p className="md:tw-text-[40px] tw-text-[20px] tw-font-medium tw-text-[#ffffff]">A complete overview of your business</p></div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-white-round-tick.svg" />
                          <p className="tw-text-[#ffffff] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Unified Dashboard:</b> Compliance to legal, all in one place.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-white-round-tick.svg" />
                          <p className="tw-text-[#ffffff] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]">Expert lawyer + CA + CS in your pocket!</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-white-round-tick.svg" />
                          <p className="tw-text-[#ffffff] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Automatic Compliance Reminder:</b> Stay aligned with regulations.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-py-[22px] tw-items-start tw-gap-2">
                          <img loading="lazy" width="24" height="24"    src="https://assets.vakilsearch.com/live-images/ic-white-round-tick.svg" />
                          <p className="tw-text-[#ffffff] md:tw-text-[16px] tw-text-[14px] tw-font-normal tw-leading-[19px]"><b>Efficient Compliance Tracking:</b> Automated monitoring and reminders for regulatory alignment.</p>
                      </div>
                      <div className="tw-flex tw-flex-row tw-max-w-[161px] md:tw-mt-[8px] tw-py-[16px] tw-px-[18px] tw-items-center tw-justify-between tw-bg-[#FED130] tw-rounded-[30px] tw-cursor-pointer">
                          <p className="tw-text-[#022B50] tw-text-[16px] md:tw-text-[16px] tw-font-medium">EXPLORE NOW</p>
                          <img alt="arrow" loading="lazy" width="8" height="4"    src="https://assets.vakilsearch.com/live-images/ic-right-arrow-black.svg" />
                      </div>
                      <div className="tw-pt-[40px] tw-flex tw-items-center tw-justify-center">
                          <img
                              alt="demo-banner"
                              loading="lazy"
                              width="473"
                              height="223"
                            
                              src="https://vakilsearch.com/_next/image?url=https%3A%2F%2Fassets.vakilsearch.com%2Flive-images%2Fzolvit-demo-banner.png&w=1080&q=75"
                          />
                      </div>
                  </div>
              </div>
          </div>
          <div className="md:tw-flex md:tw-flex-col md:tw-w-full md:tw-items-center md:tw-justify-center">
              <div
                  className="tw-flex tw-flex-col tw-relative md:tw-max-w-[1200px] max-md:tw-m-[16px] max-md:tw-mt-[50px] tw-items-center tw-justify-center tw-rounded-[20px] tw-py-[24px] tw-bg-gradient-to-r tw-from-[#FDF4C8] tw-to-[#FFFDF27D] tw-border-[1px] tw-border-[#FFFDF27D] tw-shadow-lg"
              >
                  <div className="tw-flex tw-flex-col tw-items-center tw-justify-center md:tw-gap-[24px] md:tw-pl-20 md:tw-pr-10 md:tw-min-w-[1200px]">
                      <p className="max-md:tw-w-[268px] md:tw-text-[35px] tw-text-[24px] max-md:tw-text-center max-md:tw-mt-[52px] max-lg:tw-mt-[90px] tw-font-bold md:tw-leading-[41px] tw-text-[#001D37]">Security, Confidentiality &amp; Results</p>
                      <div className="tw-flex tw-absolute lg:tw-left-[-70px] lg:tw-top-[10px] tw-top-[-50px] tw-items-center tw-justify-center">
                          <img
                              alt="Security, Confidentiality &amp; Results"
                              loading="lazy"
                              width="151"
                              height="157"
                              
                              
                              className="md:tw-w-[151px] md:tw-h-[157px] tw-w-[112px] tw-h-[112px]"
                              
                              src="https://assets.vakilsearch.com/ic-security-shield.svg"
                          />
                      </div>
                      <div className="tw-flex lg:tw-flex-row tw-flex-col md:tw-gap-[30px] tw-gap-[16px] max-md:tw-p-[24px] md:tw-pl-[34px]">
                          <div className="tw-flex tw-flex-row tw-gap-[10px] lg:tw-w-[300px] tw-items-start">
                              <img loading="lazy" width="26" height="26"    src="https://assets.vakilsearch.com/live-images/ic-yellow-round-tick.svg" />
                              <p className="tw-text-[#434A53] md:tw-text-lg tw-text-[16px]">Operate with discretion and professionalism.</p>
                          </div>
                          <div className="tw-flex tw-flex-row tw-gap-[10px] lg:tw-w-[300px] tw-items-start">
                              <img loading="lazy" width="26" height="26"    src="https://assets.vakilsearch.com/live-images/ic-yellow-round-tick.svg" />
                              <p className="tw-text-[#434A53] md:tw-text-lg tw-text-[16px]">Ensure timely delivery with quick turnaround.</p>
                          </div>
                          <div className="tw-flex tw-flex-row tw-gap-[10px] lg:tw-w-[300px] tw-items-start">
                              <img loading="lazy" width="26" height="26"    src="https://assets.vakilsearch.com/live-images/ic-yellow-round-tick.svg" />
                              <p className="tw-text-[#434A53] md:tw-text-lg tw-text-[16px]">Deliver accurate and reliable results consistently.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="w-full bg-gray-800 p-4 text-white text-center">
        <p>&copy; 2024. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

// Removed local declarations of useRef and useEffect

