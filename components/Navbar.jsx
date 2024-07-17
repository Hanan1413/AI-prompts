"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

("useClint");
function Navbar() {
  const isUserLoggedIn = true;
  const [providers, setProvider] = useState(null);
  const[toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();

      setProvider(response);
    };

    setProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="logo_text">AI-powered</p>
      </Link>

      {/* desktop  nav */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black-btn "
                >
                  Sign up with {provider.name}
                </button>
              ))}
          </>
        )}
        <Link href="/profile" className="flex gap-2 flex-center">
          <Image
            src="/assets/images/logo.svg"
            width={30}
            height={30}
            alt="profile"
            className="object-contain ml-2"
          />
        </Link>
      </div>

      {/* mobile navbar */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div>
            <Image
              src="/assets/images/logo.svg"
              width={30}
              height={30}
              alt="profile"
              className="object-contain ml-2"
              onClick={()=> setToggleDropdown((prev) => ! prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link href="/profile"
                className="dropdown_link"
                onClick={()=> setToggleDropdown(false)}>
                  My Profile
                </Link>

                <Link href="/profile"
                className="dropdown_link"
                onClick={()=> setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button type="button"
                onClick={()=> {
                  setToggleDropdown(false);
                  signOut()
                                }}
                                className="mt-5 w-full black_btn"
                >
                Sign Out
                </button>

              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black-btn "
                >
                  Sign up with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
