import React, { Fragment } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition, Menu } from "@headlessui/react";
import Logo from "@/components/ui/Icons/Logo";
import LogoSm from "@/components/ui/Icons/LogoSm";
import { useUser } from "@/components/auth";
import links from "./links.json";
import guestLinks from "./guestLinks.json";
import Notification from "@/components/Notification";
import useNotifications from "@/components/useNotifications";
import NotificationIcon from "../Icons/NotificationICon";
import HamburgerOpenIcon from "../Icons/HamburgerOpenIcon";
import HamburgerCloseIcon from "../Icons/HamburgerCloseIcon";

function Navbar(): JSX.Element {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const router = useRouter();
  const {
    notifications,
    // makeNotificationsSeen,
    newNotificationsNumber,
  } = useNotifications();
  const [{ loggedIn, user }, { logout, loading }] = useUser();
  const pathname = router.pathname;

  const handleNotificationIconClick = () => {
    // makeNotificationsSeen();
  };
  console.log({ newNotificationsNumber });
  const renderLink =
    (textSize: "sm" | "base") =>
    (link: { href: string; label: string }, index: number) => {
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
              {!showMenu && <HamburgerOpenIcon />}
              {showMenu && <HamburgerCloseIcon />}
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
          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 z-40">
            <Menu as="div" className="relative">
              {loggedIn && (
                <Menu.Button
                  onClick={handleNotificationIconClick}
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white relative"
                >
                  {Boolean(newNotificationsNumber) && (
                    <div className="bg-red-500 rounded-full h-4 w-4 flex justify-center items-center absolute top-0 left-0">
                      <p className="text-white text-xs m-0">
                        {newNotificationsNumber}
                      </p>
                    </div>
                  )}
                  <NotificationIcon />
                </Menu.Button>
              )}
              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  {notifications.length === 0 ? (
                    <Menu.Item key="empty-notification">
                      {({ active }) => (
                        <Notification type="noNew" isActive={active} />
                      )}
                    </Menu.Item>
                  ) : (
                    notifications.map((elem, index) => (
                      <Menu.Item key={`notification-${index}`}>
                        {({ active }) => (
                          <Notification {...elem} isActive={active} />
                        )}
                      </Menu.Item>
                    ))
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="ml-3 relative">
              {loggedIn && (
                <div>
                  <Menu.Button
                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-haspopup="true"
                  >
                    {loading ? (
                      "Loading..."
                    ) : user?.ProfileImageSrc ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.ProfileImageSrc}
                        alt=""
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full object-cover bg-gray-200" />
                    )}
                  </Menu.Button>
                </div>
              )}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  as="div"
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  {loggedIn ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href={`/profile/${user?.data.id || ""}`}>
                            <a
                              className={`block px-4 py-2 text-sm text-gray-700  hover:bg-gray-100 ${
                                active ? "bg-gray-100" : ""
                              }`}
                              role="menuitem"
                            >
                              View my profile
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/settings">
                            <a
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                                active ? "bg-gray-100" : ""
                              }`}
                              role="menuitem"
                            >
                              Settings
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link href="/activity-logs">
                            <a
                              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                                active ? "bg-gray-100" : ""
                              }`}
                              role="menuitem"
                            >
                              Activity logs
                            </a>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                              active ? "bg-gray-100" : ""
                            }`}
                            role="menuitem"
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="/signin"
                          className={`block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 ${
                            active ? "bg-gray-100" : ""
                          }`}
                          role="menuitem"
                        >
                          Sign in
                        </a>
                      )}
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
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
