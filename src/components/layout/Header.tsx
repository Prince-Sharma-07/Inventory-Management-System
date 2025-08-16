import Image from "next/image";
import Link from "next/link";
import ThemeBtn from "../myUI/ThemeBtn";
import ProfileDropDown from "../myUI/ProfileDropDown";

export default function Header() {
  return (
    <header className="h-16 flex backdrop-blur-3xl bg-white/80 dark:bg-black/80 justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2 items-center sticky top-0 border-b border-gray-50 z-50">
      <Link href={"/"} className="relative h-8 w-8">
        <Image fill src={"/storelogo.png"} alt="logo" />
      </Link>
      <div className="flex gap-6">
        <ThemeBtn />
        <ProfileDropDown />
      </div>
    </header>
  );
}
