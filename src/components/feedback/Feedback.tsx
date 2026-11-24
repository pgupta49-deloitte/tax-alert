"use client"
import { TaxDetailsContext } from "@/context/TaxDetailsContext";
import { useContext, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragAndDrop from "../drag-and-drop/DragAndDrop";

const Feedback = () => {
    const context = useContext(TaxDetailsContext);
    const { id, idPresent, handleId, updatedAlertResponse, setUpdatedAlertResponse } = context;

    useEffect(() => {
        setUpdatedAlertResponse('');
    },[setUpdatedAlertResponse]);


    return (

        <div className="  flex flex-col  bg-white w-[1206px] h-[480px] top-[129px] left-[80px] px-[44px] py-[15px] space-y-[35px] ">
            {updatedAlertResponse == "File Successfully Uploaded"
                ?
                <div className="flex w-full h-full justify-center items-center">
                    <div className="flex flex-col justify-center items-center gap-[8px]">
                        <img src="Step Symbol Green.svg" alt=""/>
                        <h1 className="font-sans font-semibold text-[18px] leading-[24.51px]"> {updatedAlertResponse} </h1>
                    </div>
                </div>

                : <>
                    <div className=" relative flex w-[1118px] h-[71px] justify-between">
                        <div className="w-[540px] h-[71px]  space-y-[5px]">
                            <div className="justify-between">
                                <label className="font-sans font-semibold text-[16px] leading-[16px] tracking-[-0.02em]"> Request ID <span className="font-normal text-red-500"> * </span></label>
                            </div>
                            <input className={`w-full h-43px border-[1.5px] px-[16px] py-[12px] gap-[10px] ${(!idPresent && String(id).length === 0)     ? 'border-[#DA291C]' : 'border-[#DADADA]'}`} placeholder="Enter your Request ID" onChange={e => handleId(e.target.value)} />
                            {updatedAlertResponse == "Case ID entered is incorrect. No details found." && <p className="absolute font-sans font-normal text-xs text-[#DA291C] flex top-[74px]"> Request ID is not available </p>}
                            {(!idPresent && String(id).length === 0) && 
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
                    </div></>}

        </div>)
}
export default Feedback;
