import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import Logo from "@/components/ui/Icons/Logo";
import LogoSm from "@/components/ui/Icons/LogoSm";
import { useUser } from "@/components/auth";
import links from "./links.json";
import guestLinks from "./guestLinks.json";
import Notification from "@/components/Notification";
import useNotifications from "@/components/useNotifications";

function Navbar(): JSX.Element {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [showNotifications, setShowNotifications] = React.useState<boolean>(
    false
  );
  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    notifications,
    // makeNotificationsSeen,
    newNotificationsNumber,
  } = useNotifications();
  const [{ loggedIn, user }, { logout, loading }] = useUser();
  const pathname = router.pathname;

  const handleNotificationIconClick = () => {
    // console.log("handleNotificationIconClick");
    // if (!showNotifications) makeNotificationsSeen();
    setShowNotifications(!showNotifications);
  };

  const renderLink = (textSize: "sm" | "base") => (
    link: { href: string; label: string },
    index: number
  ) => {
    const isCurrentLink = link.href === pathname;
    return (
      <Link href={link.href} key={`l-${index}`}>
        <a
          className={`${
            isCurrentLink
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }  block px-3 py-2 rounded-md ${
            textSize === "sm" ? "text-sm" : "text-base"
          } font-medium`}
        >
          {link.label}
        </a>
      </Link>
    );
  };

  return (
    <nav className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <svg
                className={`${showMenu ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className={`${showMenu ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <div className="block sm:hidden">
                <LogoSm />
              </div>
              <div className="sm:block hidden">
                <Logo />
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {loggedIn
                  ? links.map(renderLink("base"))
                  : guestLinks.map(renderLink("base"))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-40">
            {loggedIn && (
              <button
                onClick={handleNotificationIconClick}
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white relative"
              >
                {console.log({ newNotificationsNumber })}
                {Boolean(newNotificationsNumber) && (
                  <div className="bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-0 left-0">
                    <p className="text-white text-xs m-0">
                      {newNotificationsNumber}
                    </p>
                  </div>
                )}
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            )}
            <Transition
              show={showNotifications}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu"
              >
                {notifications.length === 0 ? (
                  <Notification type="noNew" key="empty-notification" />
                ) : (
                  notifications.map((elem, index) => (
                    <>
                      {console.log("elem notif", elem)}
                      <Notification key={`notification-${index}`} {...elem} />
                    </>
                  ))
                )}
              </div>
            </Transition>
            <div className="ml-3 relative">
              {loggedIn && (
                <div>
                  <button
                    onClick={() => setShowDropDown(!showDropDown)}
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    {loading ? (
                      "Loading..."
                    ) : (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user?.ProfileImageSrc}
                        alt=""
                      />
                    )}
                  </button>
                </div>
              )}
              <Transition
                show={showDropDown}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  {loggedIn ? (
                    <>
                      <Link href={`/profile/${user?.data.id || ""}`}>
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          View my profile
                        </a>
                      </Link>
                      <Link href="/settings">
                        <a
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        Sign out
                      </button>
                    </>
                  ) : (
                    <a
                      href="/signin"
                      className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign in
                    </a>
                  )}
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <div className={`${showMenu ? "block" : "hidden"} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {loggedIn
            ? links.map(renderLink("sm"))
            : guestLinks.map(renderLink("sm"))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
