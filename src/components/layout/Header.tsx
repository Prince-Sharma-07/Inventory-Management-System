// import Image from "next/image";
// import Link from "next/link";
// import ThemeBtn from "../myUI/ThemeBtn";
// import ProfileDropDown from "../myUI/ProfileDropDown";

// export default function Header() {
//   return (
//     <header className="h-16 flex backdrop-blur-3xl bg-white/80 dark:bg-black/80 justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 items-center sticky top-0 border-b dark:border-gray-50 border-black z-50 shadow-sm">
//       <Link href={"/"} className="relative h-8 w-8">
//         <Image fill src={"/storelogo.png"} alt="logo" />
//       </Link>
//       <div className="flex gap-4 md:gap-5 lg:gap-5 xl:gap-6">
//         <ThemeBtn />
//         <ProfileDropDown />
//       </div>
//     </header>
//   );
// }


// import Image from "next/image";
// import Link from "next/link";
// import ThemeBtn from "../myUI/ThemeBtn";
// import ProfileDropDown from "../myUI/ProfileDropDown";

// export default function Header() {
//   return (
//     <header className="h-16 flex backdrop-blur-xl bg-white/90 dark:bg-black/90 justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 items-center sticky top-0 border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-200">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         <Link 
//           href="/" 
//           className="relative h-10 w-10 hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden group"
//         >
//           <Image 
//             fill 
//             src="/storelogo.png" 
//             alt="Store Logo" 
//             className="object-contain group-hover:brightness-110 transition-all duration-200"
//             priority
//           />
//         </Link>
        
//         {/* Optional: Brand name for larger screens */}
//         <Link 
//           href="/" 
//           className="hidden md:block ml-3 text-lg font-light tracking-wide hover:opacity-80 transition-opacity duration-200"
//         >
//           Store
//         </Link>
//       </div>

//       {/* Navigation Actions */}
//       <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
//         {/* Search Icon - Optional */}
//         <button className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
//           <svg
//             className="w-5 h-5 opacity-70"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </button>

//         {/* Divider */}
//         <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>

//         {/* Theme Toggle */}
//         <div className="flex items-center justify-center">
//           <ThemeBtn />
//         </div>

//         {/* Profile Dropdown */}
//         <div className="flex items-center justify-center">
//           <ProfileDropDown />
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import ThemeBtn from "../myUI/ThemeBtn";
import ProfileDropDown from "../myUI/ProfileDropDown";

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
      // You can add navigation to search results page or filter products
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <>
      <header className="h-16 flex backdrop-blur-xl bg-white/90 dark:bg-black/90 justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-3 items-center sticky top-0 border-b border-gray-200/50 dark:border-gray-700/50 z-50 transition-all duration-200 shadow-sm">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="relative h-10 w-10 hover:scale-105 transition-transform duration-200 rounded-lg overflow-hidden group"
          >
            <Image 
              fill 
              src="/storelogo.png" 
              alt="Store Logo" 
              className="object-contain group-hover:brightness-110 transition-all duration-200"
              priority
            />
          </Link>
          
          {/* Brand name for larger screens */}
          <Link 
            href="/" 
            className="hidden md:block ml-3 text-lg font-semibold tracking-wide hover:opacity-80 transition-opacity duration-200"
          >
            IMS
          </Link>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
          {/* Search Button - Now visible on all screen sizes */}
          {/* <button 
            onClick={handleSearchToggle}
            className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200"
          >
            <Search className="w-5 h-5 opacity-70" />
          </button> */}

          {/* Divider */}
          {/* <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div> */}

          {/* Theme Toggle */}
          <div className="flex items-center justify-center">
            <ThemeBtn />
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center justify-center">
            <ProfileDropDown />
          </div>
        </div>
      </header>

      {/* Search Overlay - Mobile Responsive */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-white/10 backdrop-blur-sm z-50 flex items-start justify-center pt-4 sm:pt-20 px-4"
          onClick={handleSearchToggle}
        >
          <div 
            className="w-full max-w-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg overflow-hidden mt-12 sm:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center gap-3 p-3 sm:p-4 border-b border-gray-100 dark:border-gray-800">
              <Search className="w-5 h-5 opacity-60 flex-shrink-0" />
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products..."
                  className="w-full bg-transparent text-base sm:text-lg outline-none placeholder:opacity-60"
                />
              </form>
              <button
                onClick={handleSearchToggle}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors duration-200 flex-shrink-0"
              >
                <X className="w-5 h-5 opacity-60" />
              </button>
            </div>

            {/* Search Results/Suggestions - Mobile Responsive */}
            <div className="p-3 sm:p-4 max-h-60 sm:max-h-96 overflow-y-auto">
              {searchQuery.trim() ? (
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm opacity-60 mb-2 sm:mb-3">
                    Search results for "{searchQuery}"
                  </p>
                  {/* Add your search results here */}
                  <div className="text-xs sm:text-sm opacity-60 text-center py-6 sm:py-8">
                    No results found. Try a different search term.
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-xs sm:text-sm opacity-60 mb-2 sm:mb-3">Recent searches</p>
                  <div className="space-y-1 sm:space-y-2">
                    {["Electronics", "Clothing", "Books", "Home & Garden", "Sports"].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchQuery(term);
                          // Optionally auto-submit the search
                          // handleSearchSubmit({ preventDefault: () => {} } as any);
                        }}
                        className="flex items-center gap-2 w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded transition-colors duration-200"
                      >
                        <Search className="w-3 h-3 sm:w-4 sm:h-4 opacity-40 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
