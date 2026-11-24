"use client"
import { TaxDetailsContext } from "@/context/TaxDetailsContext";
import { useRouter } from "next/navigation";


import { useContext, useState } from "react";

function Popup (){
    const router =useRouter();
    
    const [copied, setCopied] = useState(false);

    const context = useContext(TaxDetailsContext);

    const {caseLawIdAPIResponse, setCaseLawIdAPIResponse} = context;

    const handleCopy = () => {
        navigator.clipboard.writeText(caseLawIdAPIResponse).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        })
    }

    const handleHome = () => {
        setCaseLawIdAPIResponse(null);
        router.push('/download-status')
    }

    return (
        <div className="flex flex-col bg-white shadow-2xl items-center justify-center w-[320px] h-[242px] top-[313px] left-[523px] border-[1px] border-[#BBBCBC] px-[16px] py-[24px] gap-[24px]">
            <div>
                <img className="w-[36.61px] h-[36.61px] top-[3.7px] left-[3.7px]" src="status-icons.svg" alt=""/>
            </div>

            <div className="flex-col flex items-center justify-center gap-[10px]">

                <div className="flex">
                    <h1 className="font-sans font-bold text-[16px] leading-[21.79px] text-right"> Your Request ID: {caseLawIdAPIResponse} </h1>
                    <button className="relative flex w-[60px] items-center justify-center" onClick={handleCopy}>
                        {copied && <img className="absolute w-full bottom-full mb-1" src="info.svg" alt=""/>}
                        <img src="copy.svg" alt=""/>
                    </button>

                </div>

                <p className="font-sans font-normal text-[14px] leading-[19.07px] text-center"> Please note down the Request ID
                    and keep it safe for future references.</p>
            </div>
            <button onClick={() => handleHome()} className=" w-[144px] h-[40px] bg-[#26890D] font-sans font-normal text-[14px] leading-[20px] text-white">
                <p>Download Status</p> 
            </button>
        </div>
    )
}

export default Popup;