"use client"
import { usePathname } from "next/navigation";
import Link from "../../../node_modules/next/link";

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className=" absolute flex w-[362px] h-[40px] top-[89px] left-[80px] ">
            <ul className="flex gap-[12px]">
                <li>
                    <Link className={`w-[90px] h-[40px] px-[12px] py-[9px] gap-[8px]`} href={"/upload"}> 
                        <label className={`w-[58px] h-[20px] px-[4px] font-sans active:font-bold hover:font-bold hover: cursor-pointer text-sm leading-[20px] ${pathname==='/upload' ? 'font-bold underline underline-offset-4 decoration-[#26890D] decoration-2' : ''}`}> Upload  </label>
                    </Link>
                </li>
                <li>
                    <Link className={ `w-[74px] h-[40px] px-[12px] py-[9px] gap-[8px]`} href={"/download-status"}>    
                        <label className={` w-[50px] h-[20px] px-[4px] font-sans hover:font-bold hover:cursor-pointer text-sm leading-[20px] ${pathname==='/download-status' ? 'font-bold underline underline-offset-4 decoration-[#26890D] decoration-2' : ''}`}> Download Status </label> 
                    </Link>
                </li>
                <li>
                    <Link  className={`w-[174px] h-[40px] px-[12px] py-[9px] gap-[8px] active:font-bold`} href={"/feedback"}> 
                        <label  className={`w-[142px] h-[20px] px-[4px] font-sans active:font-bold hover:font-bold hover: cursor-pointer text-sm leading-[20px] ${pathname==='/feedback' ? 'font-bold underline underline-offset-4 decoration-[#26890D] decoration-2' : ''}`}> Feedback </label>
                    </Link>
                </li>
            </ul>

        </nav>
    )
}

export default Navbar;