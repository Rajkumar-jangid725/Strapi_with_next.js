"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from "react";


interface SidebarLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

interface MobileSidebarLink extends SidebarLink {
  closeMenu: () => void;
}

function SidebarLink({ url, text }: SidebarLink) {
  const path = usePathname();

  return (
    <li className="flex border border-gray-100 justify-center py-1">
      <Link
        href={url}
        className={`flex items-center mx-4 dark:border-transparent hover:text-red-300 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function MobileSidebarLink({ url, text, closeMenu }: MobileSidebarLink ) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  }
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`mx-3 block rounded-lg px-3 py-2 text-base leading-7 text-gray-100 hover:bg-gray-900 ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}

export default function Sidebar({
  links,
}: {
  links: Array<SidebarLink>;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }
  return (
    <aside className="overflow-y">
      <div className="container justify-between mx-auto px-0 sm:px-6">
        <div className="items-center flex-shrink-0">
          <ul className="overflow-y">
          <li className="flex border border-gray-100 justify-center py-1">
            <span className={`flex font-bold items-center mx-4 dark:border-transparent hover:text-red-300`}> Categroies</span>
          </li>
            {links.map((item: SidebarLink) => (
              <SidebarLink key={item.id} {...item} />
            ))}
          </ul>
        </div>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 rtl:left-0 ltr:right-0 z-50 w-full overflow-y-auto dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Strapi</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-200/10">
                <div className="space-y-2 py-6">
                {links.map((item) => (
                    <MobileSidebarLink
                      key={item.id}
                      closeMenu={closeMenu}
                      {...item} />
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
          </Dialog>
        <button 
        className="p-4 lg:hidden" 
        onClick={() => setMobileMenuOpen(true)} >
          <Bars3Icon className="h-7 w-7 text-gray-100" aria-hidden="true"/>
        </button>
      </div>
    </aside>
  );
}
