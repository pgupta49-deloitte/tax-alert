"use client"

import { useEffect, useState } from "react";

const DownloadStatus = () => {

    const [caseLawId, setCaseLawId] = useState('');
    const [json, setJson] = useState<any | null>(null);
    const [isError, setIsError] = useState<boolean>(false);

    const accountName = 'taxalerts';

    const handleExtractDetails = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setJson('');

        if(!caseLawId){
           return setIsError(true);
        }

        setIsError(false);

        const data = new FormData();
        data.append('caselawid', caseLawId);

        //const apiUrl: string | undefined = process.env.NEXT_PUBLIC_HOME_API;
        // TODO: fix env variable undefined issue 
        const apiUrl = "https://taxalertswizarddevbe.azurewebsites.net/Home";
        console.log(apiUrl);

        try {
            if(apiUrl){
                const resp = await fetch(apiUrl, {
                    method: 'POST',
                    body: data
                });
                const result = await resp.json();
    
                setJson(result);
            }          

        } catch (error) {
            console.error('Error extracting details:');

        }

    }

    const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setCaseLawId('');
        setJson(null);
        setIsError(false);
    };

    const handleDownload = (e: React.MouseEvent<HTMLButtonElement>) => {

        let blobName = "example.txt"; 
        let containerName = 'example';
        let sasToken = 'sasToken'; 

        if(e.currentTarget.id == "user-download"){
            blobName = String(json.user_upload_details.user_upload_filename); 
            containerName = String(json.user_upload_details.user_upload_folder);
            sasToken = String(json.user_upload_details.user_upload_sas_token);
        }

        if(e.currentTarget.id === "gen-ai-download"){
            blobName = String(json.genai_details.genai_filename); 
            containerName = String(json.genai_details.genai_folder);
            sasToken = String(json.genai_details.genai_sas_token);
        }
    
        const downloadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;
    
        window.open(downloadUrl, '_blank');

      };


    return (
        <div className="flex flex-col  bg-white w-[1206px] h-[480px] top-[129px] left-[80px] px-[44px] py-[15px] space-y-[24px] ">
            <div className=" relative flex w-[620px] h-[95px] items-center justify-between">
                <div className="w-[296px] h-[95px] flex-row space-y-[10px]">
                    <div className="justify-between">
                        <label className="font-sans font-semibold text-[16px] leading-[16px] tracking-[-0.02em]"> Request ID <span className="font-normal text-red-500"> * </span></label>
                    </div>
                    <input className={`w-full h-[43px] border-[1.5px] ${isError || (json && !json.caselaw_id) ? 'border-[#DA291C]' : 'border-[#DADADA]'} px-[16px] py-[12px] gap-[10px]`} value={caseLawId} onChange={e => setCaseLawId(e.target.value)} placeholder="Enter your Request ID" />
                    {isError && <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> This is a mandatory field </p>}
                    {json && !json.caselaw_id && <p className="font-sans font-normal text-[12px] leading-[12px] text-[#DA291C]"> Request ID entered is incorrect. No details found. </p>}

                </div>
                <div className="w-[300px] h-[44px] gap-[16px] flex justify-between">
                    <button className=" w-[142px] h-[44px] px-[24px] py-[10px] bg-[#26890D] gap-[8px] font-sans font-normal text-[14px] leading-[20px] text-white" onClick={e => handleExtractDetails(e)}> Extract Details </button>
                    <button className=" w-[142px] h-[44px] px-[24px] py-[10px] bg-black gap-[8px] font-sans font-normal text-[14px] leading-[20px] text-white" onClick={e => handleReset(e)}> Reset </button>
                </div>

            </div>
            { (json == null || isError || (json && !json.caselaw_id)) &&
                <div className="w-[1118px] h-[214px] border-[1.5px] border-[#DADADA] bg-[#F6F6F6] space-y-[10px] flex items-center justify-center">
                    <div className="w-[476px] h-[59px] flex-col flex items-center justify-center space-y-[10px]">
                        <img src="file_icon.svg" alt=""/>
                        <p className="font-sans font-normal text-[12px] tracking-[0.32px]"> Your Request ID details will be shown here. </p>
                    </div>
                </div>
            }

            {json && json.caselaw_id &&
            <div className="flex-col items-center justify-center space-y-6">
                <div className="w-[1118px] h-[278px] border-[1.5px] space-y-[24px] bg-[#F6F6F6] border-[#DADADA] px-[24px] py-[24px]">
                    <div className="flex gap-[12px] justify-center items-center w-[1070px] h-[40px]">
                        <img className="w-[26.63px] h-[26.63px] top-[2.69px] left-[2.69px]" src={json.user_upload_details.user_upload_filename === "This version is not available." ? 'Cancel.svg' : 'Step Symbol Green.svg'} alt="" />
                        <div className="w-[1026px] h-[40px]">
                            <p className="font-sans font-normal text-[12px] leading-[16.34px]"> Human Generated Version </p>
                            <p className="font-sans font-semibold text-[16px] leading-[24px]"> {String(json.user_upload_details.user_upload_filename).substring(0, 80)} </p>

                        </div>
                        <button id="user-download" className={`w-[101px] h-[40px] gap-[8px] text-white font-sans font-normal text-[14px]  leading-[20px] ${json.user_upload_details.user_upload_filename === "This version is not available." ? 'bg-[#A7A8AA]' : 'bg-black'}`} onClick={e => handleDownload(e)} disabled={json.user_upload_details.user_upload_filename === "This version is not available." ? true : false}> Download </button>
                    </div>
                    <div className="w-[1070px] border-[1px] border-[#D9D9D9]"></div>

                    <div className="flex gap-[12px] justify-center items-center w-[1070px] h-[40px]">
                        <img className="w-[26.63px] h-[26.63px] top-[2.69px] left-[2.69px]" src={json.genai_details.genai_filename === "This version is not available." ? 'Cancel.svg' : 'Step Symbol Green.svg'} alt=""/>
                        <div className="w-[1026px] h-[40px]">
                            <p className="font-sans font-normal text-[12px] leading-[16.34px]"> AI Generated Version </p>
                            <div className="flex gap-[12px]">
                                <p className="font-sans font-semibold text-[16px] leading-[24px]"> {(String(json.genai_details.genai_filename)).substring(0, 80)} </p>
                                <img src="Chip.svg" alt=""/>
                            </div>

                        </div>
                        <label className={`flex items-center w-[92px] h-[24px] text-center ${json.genai_details.completion_status === "Completed" ? 'bg-[#26890D]': 'bg-[#DF8600]'}  px-[8px] py-[4px]`}> <h1 className={`text-white font-sans font-normal text-[12px] leading-[16px] w-[76px] h-[16px]`}>{(json.genai_details.completion_status).toUpperCase()}</h1></label>
                        <button id="gen-ai-download" className={`w-[115px] h-[40px] gap-[8px] text-white font-sans font-normal text-[14px]  leading-[20px] ${json.genai_details.genai_filename === "This version is not available."  ? 'bg-[#A7A8AA]' : 'bg-black'}`} onClick={e => handleDownload(e)} disabled={json.genai_details.genai_filename === "This version is not available." ? true : false}> Download </button>
                    </div>
                    <div className="flex-col flex gap-[5px]">
                        <div className="flex items-center justify-center gap-[8px]">
                            <img src="Step Symbol Green.svg" alt=""/>
                            <div className="w-[174px] h-[2px] top-[15px] bg-[#26890D]"> </div>
                            <img src="Step Symbol Green.svg" alt=""/>
                            <div className="w-[174px] h-[2px] top-[15px] bg-[#26890D]"> </div>
                            {json.genai_details.completion_status === "Completed"
                                ? <img src="Step Symbol Green.svg" alt=""/>
                                : <img src="Step Symbol.svg" alt=""/>
                            }

                        </div>

                        <div className="flex items-center justify-center gap-[30px]">
                            <div className="flex-col flex items-center justify-center w-[190px] h-[38px]">
                                <h1 className="font-sans font-bold text-[14px] leading-[19.07px]">{json.genai_details.created_status} </h1>
                                <h2 className="font-sans font-normal text-[14px] leading-[19.07px]"> {json.genai_details.created_time}</h2>
                            </div>
                            <div className="flex-col flex items-center justify-center w-[190px] h-[38px]">
                                <h1 className="font-sans font-bold text-[14px] leading-[19.07px]"> {json.genai_details.upload_status} </h1>
                                <h2 className="font-sans font-normal text-[14px] leading-[19.07px]"> {json.genai_details.upload_time} </h2>
                            </div>
                            <div className="flex-col flex items-center justify-center w-[190px] h-[38px]">
                                <h1 className="font-sans font-bold text-[14px] leading-[19.07px]"> {json.genai_details.completion_status} </h1>
                                <h2 className="font-sans font-normal text-[14px] leading-[19.07px]"> {json.genai_details.completion_time} </h2>
                            </div>
                        </div>
                    </div>

                </div>
                <p className="text-xs text-center italic"> <span className="font-bold not-italic"> Disclaimer: </span> “The output generated (i.e. draft tax alert generated in this case) should not be considered as an opinion or final result, and is subject to review by a technical expert.” </p>
            </div>
                
            }



        </div>
    );
}
export default DownloadStatus;
