"use client"
import { TaxDetailsContext } from "@/context/TaxDetailsContext";
import { usePathname } from "next/navigation";
import React, { useContext, useState } from "react"
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

const DragAndDrop = () => {
    const context = useContext(TaxDetailsContext);
    const { setIdPresent, setIssuePresent, setPocPresent, caseLawIdAPIResponse, setCaseLawIdAPIResponse, id, handleId, poc, issue, droppedFile, setDroppedFile, updatedAlertResponse, setUpdatedAlertResponse } = context;

    const [progress, setProgress] = useState(0);

    const [unsupportedFile, setUnsupportedFile] = useState(false);
    const [fileTooLarge, setFileTooLarge] = useState(false);

    const [caseLawId, setCaseLawId] = useState();

    const supportedFileTypes = [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/rtf', // RTF
    ];

    const pathname = usePathname();

    // Simulated upload progress
    const simulateUpload = () => {
        let interval = setInterval(() => {
            setProgress(prevProgress => {
                if (prevProgress === 100) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + 50; // Increase progress by 10% each interval
            });
        }, 1000);
    };

    const handleUpdatedAlert = (result: any) => {
        setUpdatedAlertResponse(String(result.message));
        setDroppedFile(undefined);
    }

    const uploadTaxAlert = async (file: File) => {

        if (!poc) {
            return setPocPresent(false);
        }

        if (!issue) {
            return setIssuePresent(false);
        }

        simulateUpload();

        if (!supportedFileTypes.includes(file.type)) {
            return setUnsupportedFile(true);
        }

        if ((file.size / 1000000) > 100) {
            return setFileTooLarge(true)
        }


        const data = new FormData();
        data.append('poc', poc);
        data.append('issue', issue);
        data.append('file', file);


        // const apiUrl: string | undefined = process.env.NEXT_PUBLIC_TAX_ALERT_API;
        const apiUrl = "https://taxalertswizarddevbe.azurewebsites.net/TaxAlert";

        try {
            if (apiUrl) {
                const resp = await fetch(apiUrl, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                });
                const result = await resp.json();
                setCaseLawIdAPIResponse(result.caselawid);
                setCaseLawId(result.caselawid);
                console.log(result);
            }

        } catch (error) {
            console.error('Error extracting details:');

        }
    }

    const uploadUpdatedAlert = async (file: File) => {
        const data = new FormData();
        data.append('caselawid', id);
        data.append('file', file);

        console.log('id', id, file);

        if (!id) {
            return setIdPresent(false);
        }
        simulateUpload();

        if (!supportedFileTypes.includes(file.type)) {
            return setUnsupportedFile(true);
        }

        if ((file.size / 1000000) > 100) {
            return setFileTooLarge(true)
        }

        //const apiUrl: string | undefined = process.env.NEXT_PUBLIC_UPLOAD_ALERT_API;
        const apiUrl = "https://taxalertswizarddevbe.azurewebsites.net/UploadAlert";
        try {
            if (apiUrl) {
                const resp = await fetch(apiUrl, {
                    method: 'POST',
                    body: data,
                });
                const result = await resp.json();
                handleUpdatedAlert(result);
            }

        } catch (error) {
            console.error('Error extracting details:');

        }
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [NativeTypes.FILE],
        drop: (item: { files: File[] }) => {

            setDroppedFile(item.files[0]);

            if (pathname === '/upload') {
                uploadTaxAlert(item.files[0]);
            }

            if (pathname === '/feedback') {
                uploadUpdatedAlert(item.files[0]);
            }


        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }), [id, poc, issue]);

    const handleBrowserFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.click();
        }

    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files: FileList | null = e.target.files;

        if (files) {
            setDroppedFile(files[0]);

            if (pathname === '/upload') {
                uploadTaxAlert(files[0]);
            }

            if (pathname === '/feedback') {
                uploadUpdatedAlert(files[0]);
            }
        }
    }

    const removeFile = () => {
        setDroppedFile(undefined);
    }

    return (
        <div className="relative bg-black flex-2 items-center justify-center w-[118px] h-[140px] space-y-[20px]">


            <div className="gap-[8px]">
                <div
                    ref={(node) => {
                        if (node) {
                            drop(node);
                        }
                    }}
                    className={`w-[1118px] h-[140px] flex justify-center items-center bg-[#F6F6F6] border-dashed border-2 border-gray-300 px-[96px] py-[69px] mb-4 ${isOver && canDrop ? 'bg-gray-200' : ''}`}
                >

                    <div className=" text-black w-[164px] h-[48px]">
                        <div>
                            <img src="upload.svg" alt="" /> </div>
                    </div>

                </div>
            </div>

            <input
                id="fileInput"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={e => { handleFileInputChange(e) }} />
            <button
                className="flex justify-center items-center  w-[130px] h-[40px] bg-[#26890D] text-white font-bold py-[10px] px-[24px]"
                onClick={handleBrowserFiles}
            >
                <label className="font-sans font-normal text-[14px] leading-[20px] ">Browse Files</label>
            </button>

            {progress > 0 && droppedFile &&
                <div className="w-[1118px] h-[63px] items-center justify-center flex flex-col">
                    <div className="flex">
                        <img className="w-[24px] h-[24px] top-[4px] left-[6px]" src="document.svg" alt="" />
                        <p className="w-[1070px] h-[22px] font-normal font-sans text-[14px] leading-[20px] text-[##53565A]">{droppedFile.name}</p>
                        <button className="w-[16px] h-[20px]" >
                            <img src="remove.svg" alt="" onClick={removeFile} />
                        </button>
                    </div>


                    <div className="w-full bg-gray-200 rounded-lg">
                        <div
                            className={`h-2 ${unsupportedFile ? 'bg-red-500' : 'bg-green-500 rounded-lg'} `}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    {(unsupportedFile || fileTooLarge) ?
                        <p className="w-[1118px] h-[23px] font-sans font-normal text-[12px] leading-[16px] text-[#DA291C]"> {unsupportedFile ? 'Unsupported file format selected.' : 'File size is too large.'} </p>
                        : (progress === 100 && caseLawId)
                            ?
                            <p className="w-[1118px] h-[23px] font-sans text-[#26890D] font-normal text-[12px] leading-[16px]"> File succesfully uploaded, Your Request No. is {caseLawId} </p>

                            : <div className="w-[1118px] h-[23px] font-sans font-normal text-[12px] leading-[16px] text-[#63666A]">
                                <label> {(droppedFile.size / 1000000).toFixed(2)} MB </label>
                            </div>
                    }



                </div>}
        </div>

    )

};

export default DragAndDrop;