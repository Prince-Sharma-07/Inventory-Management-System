import Image from "next/image";
import Link from "next/link";
import ThemeBtn from "../myUI/ThemeBtn";
import ProfileDropDown from "../myUI/ProfileDropDown";

export default function Header() {
  

  return (
    <div>
      <header className="h-20 flex justify-between px-8 py-2 items-center sticky top-0 border-b border-gray-50">
        <Link href={'/'} className="relative h-8 w-8"><Image fill src={'/storelogo.png'} alt="logo" /></Link>
        <div className="flex gap-6"> 
          <ThemeBtn />
          <ProfileDropDown />
        </div>
      </header>
    </div>
  );
}
