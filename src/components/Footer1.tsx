'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-48 pb-20 sm:mt-32 sm:pb-12">
      <div className="flex w-[1272px] max-w-[90%] mx-auto flex-wrap sm:flex-wrap justify-between gap-y-6">
        <div className="text-base text-gray-500 font-normal hidden sm:flex items-center">
          © Buy Me a Coffee
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-base font-medium select-none">
          <Link href="https://buymeacoffee.com/about" className="hover:text-gray-500">
            About
          </Link>
          <Link href="https://help.buymeacoffee.com/en/" target="_blank" className="hover:text-gray-500">
            Help Center
          </Link>

          {/* Apps Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-gray-500 mt-2">
              Apps
              <svg className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 12 9">
                <path d="M10.59 8.3L6 3.72 1.41 8.3 0 6.89 6 .89l6 6-1.41 1.41z" fill="currentColor" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white shadow-md p-3 rounded-xl hidden group-hover:block min-w-[150px] z-10">
              <a href="https://apps.apple.com/in/app/buy-me-a-coffee/id1480229954" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                iOS
              </a>
              <a href="https://play.google.com/store/apps/details?id=app.buymeacoffee" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Android
              </a>
            </div>
          </div>

          {/* Resources Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-gray-500 mt-2">
              Resources
              <svg className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 12 9">
                <path d="M10.59 8.3L6 3.72 1.41 8.3 0 6.89 6 .89l6 6-1.41 1.41z" fill="currentColor" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 bg-white shadow-md p-3 rounded-xl hidden group-hover:block min-w-[200px] z-10">
              <a href="https://form.typeform.com/to/oCHpJ8qt" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Feature requests
              </a>
              <a href="https://buymeacoffee.com/brand" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Buttons
              </a>
              <a href="https://buymeacoffee.com/ko-fi-alternative" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Ko-fi comparison
              </a>
              <a href="https://buymeacoffee.com/patreon-alternative" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Patreon comparison
              </a>
              <a href="https://bio.link/" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Link in Bio
              </a>
              <a href="https://voicenotes.com/" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Voicenotes
              </a>
              <a href="https://buymeacoffee.com/security" target="_blank" className="block px-3 py-2 rounded-lg hover:bg-gray-100">
                Security policy
              </a>
            </div>
          </div>

          <Link href="https://buymeacoffee.com/privacy-policy" className="hover:text-gray-500 sm:hidden">
            Privacy
          </Link>
          <Link href="https://buymeacoffee.com/terms" className="hover:text-gray-500 sm:hidden">
            Terms
          </Link>
        </div>
      </div>

      {/* Socials */}
      <div className="mt-10 flex justify-center gap-6">
        <a href="https://twitter.com/buymeacoffee" target="_blank" aria-label="Twitter">
          <svg width="24" height="24" fill="currentColor" className="text-gray-800 hover:text-gray-500 transition" viewBox="0 0 24 24">
            <path d="M18.3263 1.90381H21.6998L14.3297 10.3273L23 21.7898H16.2112L10.894 14.8378L4.80995 21.7898H1.43443L9.31743 12.7799L1 1.90381H7.96111L12.7674 8.25814L18.3263 1.90381ZM17.1423 19.7706H19.0116L6.94539 3.81694H4.93946L17.1423 19.7706Z" />
          </svg>
        </a>
        <a href="https://www.youtube.com/buymeacoffee" target="_blank" aria-label="YouTube">
          <svg width="24" height="24" fill="currentColor" className="text-gray-800 hover:text-gray-500 transition" viewBox="0 0 24 24">
            <path d="M23.5 6.2c-.1-.5-.4-1-.8-1.4s-.9-.7-1.5-.9c-1.9-.5-9.2-.5-9.2-.5s-7.3 0-9.2.5c-.6.2-1.1.5-1.5.9s-.7.9-.8 1.4c-.5 1.9-.5 5.8-.5 5.8s0 3.9.5 5.8c.1.5.4 1 .8 1.4s.9.7 1.5.9c1.9.5 9.2.5 9.2.5s7.3 0 9.2-.5c.6-.2 1.1-.5 1.5-.9s.7-.9.8-1.4c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6v-7.1l6.3 3.6-6.3 3.5z" />
          </svg>
        </a>
        <a href="https://www.instagram.com/buymeacoffee" target="_blank" aria-label="Instagram">
          <svg width="24" height="24" fill="currentColor" className="text-gray-800 hover:text-gray-500 transition" viewBox="0 0 24 24">
            <path d="M7.75 2h8.5C20.1 2 22 3.9 22 7.75v8.5C22 20.1 20.1 22 16.25 22h-8.5C3.9 22 2 20.1 2 16.25v-8.5C2 3.9 3.9 2 7.75 2zm4.25 5.5a4.25 4.25 0 100 8.5 4.25 4.25 0 000-8.5zM12 10a2 2 0 110 4 2 2 0 010-4zm4.75-2.75a.75.75 0 110 1.5.75.75 0 010-1.5zM19.5 7.75a3.25 3.25 0 00-3.25-3.25h-8.5a3.25 3.25 0 00-3.25 3.25v8.5a3.25 3.25 0 003.25 3.25h8.5a3.25 3.25 0 003.25-3.25v-8.5z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}