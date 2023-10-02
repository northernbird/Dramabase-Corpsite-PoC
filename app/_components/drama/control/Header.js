'use client'

import 'flowbite'
import Image from 'next/image'
import HeaderLogo from '../../../_assets/logo/dramabase_header_logo.png'
import HamburgerButton from '../../../_assets/button/hamburger.png'
import {useEffect, useRef, useState} from 'react'

export default function Header ({ onUpdateStory }) {
  // MEMO: flowbiteドロップダウン ios safariとchromeだと、動かないための処理
  const [showDropDownMenu, setShowDropDownMenu] = useState(false)

  const onClickDropDownMenu = arg => {
    setShowDropDownMenu(false);
    onUpdateStory(arg);
  }

  const menuButtonRef = useRef(null);

  /*
   * If the outside of menu is clicked, menu should be hidden
   */
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if(menuButtonRef.current && menuButtonRef.current.contains(ev.target)) {
        setShowDropDownMenu(!showDropDownMenu)
      } else {
        setShowDropDownMenu(false)
      }
    };
    window.addEventListener('click', handleClickOutside);

    // Unregister the global click event listener when the component is unmounted.
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  });

  return (
    <header>
      <div className="bg-black">
        <div className="flex items-center justify-between mx-auto p-1 px-2" ref={menuButtonRef}>
          {/*ロゴ*/}
          <Image
            src={HeaderLogo}
            alt="header logo"
            width={150}
            height={"auto"}
          />
          {/*//ロゴ*/}
          {/*メニュー*/}
          <div className="flex items-center md:order-2 relative z-30">
            <button
              type="button"
              id="header-dropdown-menu-button"
              className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <Image
                src={HamburgerButton}
                alt="hamburger button"
                width={33}
                height={44}
              />
            </button>
            <div
              id="header-dropdown-menu"
              className={`absolute z-10 top-12 -right-2 !-mt-1 bg-black/80 w-40 ${showDropDownMenu ? 'block' : 'hidden'}`}
            >
              <ul className="py-6 space-y-5 grid grid-cols-1 justify-items-center text-white"
              >
                <li className="w-24">
                  <button
                    className="hover:dramabese-text-shadow"
                    onClick={() => onClickDropDownMenu('service')}
                  >- SERVICE
                  </button>
                </li>
                <li className="w-24">
                  <button
                    className="hover:dramabese-text-shadow"
                    onClick={() => onClickDropDownMenu('company')}
                  >- COMPANY
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/*//メニュー*/}
        </div>
      </div>
    </header>
  )
}
