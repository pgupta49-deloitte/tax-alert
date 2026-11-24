"use client"
import { TaxDetailsContext } from "@/context/TaxDetailsContext";
import React, { useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragAndDrop from "../drag-and-drop/DragAndDrop";
import Popup from "../popup/Popup";

const Upload = () => {
    const context = useContext(TaxDetailsContext);

    const {issuePresent, pocPresent, caseLawIdAPIResponse, poc, setPoc, issue, setIssue, droppedFile } = context;

    const handlePoc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPoc(e.target.value);
    }

    const handleIssue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIssue(e.target.value);
    }

    return (
        <div className=" flex flex-col bg-white w-[1206px] h-[480px] top-[129px] left-[80px] px-[44px] py-[15px] space-y-[35px] ">

            {caseLawIdAPIResponse &&
                <div className="flex fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 items-center justify-center z-50">
                    <Popup />
                </div>}


            <div className=" relative flex w-[1118px] h-[71px] justify-between space-x-[28px]">
                <div className="w-[540px] h-[71px]  space-y-[5px]">
                    <div className="justify-between flex items-center">
                        <label className={`font-sans font-semibold text-[16px] leading-[16px] tracking-[-0.02em] `}> Point Of Contact <span className="font-normal text-red-500"> * </span></label>
                        <p className={`font-sans font-normal text-sm ${String(poc).length > 1000 ? 'text-[#DA291C]' : 'text-black'} `}> {String(poc).length}/1000 </p>
                        
                    </div>
                    <input placeholder="Enter Point Of Contact" className={`w-full h-43px border-[1.5px] px-[16px] py-[12px] gap-[10px] ${(!pocPresent && String(poc).length === 0) ? 'border-[#DA291C]' : 'border-[#DADADA]'}`} onChange={handlePoc} />
                    
                    {String(poc).length > 1000 && 
                    <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> Text limit reached </p>}
                    
                    {(!pocPresent && String(poc).length === 0) && 
                    <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> This is a mandatory field </p>}

                </div>
                <div className="w-[540px] h-[71px] space-y-[5px]">
                    <div className="justify-between flex items-center">
                        <label className="font-sans font-semibold text-[16px] leading-[16px] tracking-[-0.02em]"> Issue on which Tax Alert is required <span className="font-normal text-red-500"> * </span></label>
                        <p className={`font-sans font-normal text-sm ${String(issue).length > 1000 ? 'text-[#DA291C]' : 'text-black'}`}> {String(issue).length}/1000 </p>
                    </div>
                    <input placeholder="Enter Issue" className={`w-full h-43px border-[1.5px] px-[16px] py-[12px] gap-[10px] ${(!issuePresent && String(issue).length === 0) ? 'border-[#DA291C]' : 'border-[#DADADA]'}`} onChange={handleIssue} />
                    
                    {String(issue).length > 1000 && 
                    <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> Text limit reached </p>}

                    {(!issuePresent && String(issue).length === 0) && 
                    <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> This is a mandatory field </p>}
                </div>

            </div>
            <div className="w-[540px] h-[71px] space-y-[10px]">
                <div className="justify-between">
                    <label className="font-sans font-semibold font text-[16px] leading-[16px] tracking-[-0.02em]"> Upload  your document  <span className="font-normal text-red-500"> * </span></label>
                </div>
                <p className="font-sans font-normal text-[12px] leading-[16px]"> Format: DOCX, DOC, PDF, RTF | Max. size: 100MB </p>
                <DndProvider backend={HTML5Backend}>
                    <DragAndDrop />
                </DndProvider>
            </div>


        </div>
    );
}
export default Upload;
