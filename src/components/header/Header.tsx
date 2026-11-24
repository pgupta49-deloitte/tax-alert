import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";

const Header = () => {
    const { instance } = useMsal();
    const [name, setName] = useState<string>('Anis');
    const activeAccount = instance.getActiveAccount();
    useEffect(() => {
        // console.log('activeAccount>>>>>',activeAccount)
        if (activeAccount && activeAccount.name) {
            setName(activeAccount.name.split(' ')[0]);
        } else {
            setName('');
        }
    }, [activeAccount]);
    return (
        <header className="flex absolute w-[1366px] h-[64px] px-20 py-4 bg-black">
            <div className="flex items-center w-[1206px] h-[33px] gap-x-[16px]" >
                <img className=" w-[104px] h-[24px]" src={"logo.svg"} alt="My Image" />
                <div className=" border-r border-[1px] border-[#A7A8AA] h-8 " > </div>
                <p className="flex items-center font-sans font-semibold text-[20px] w-[969px] h-[27px] leading--[27.24px] text-white"> Tax Alerts Wizard
                    {/* <span className=" font-sans  font-extralight italic text-[20px] leading-[48.41px] text-center px-1">  powered by GenAI </span> */}
                </p>
                <div className="flex gap-[16px] w-[150px] h-[25px]">
                    <button className="font-sans text-lg leading-[24.51px] font-semibold text-white"> Hello {name}</button>
                    <img src={"Userpic.svg"} alt=""/> 
                </div>

            </div>
        </header>
    )
}

export default Header;