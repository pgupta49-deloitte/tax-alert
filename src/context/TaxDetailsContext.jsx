"use client"
import { createContext, useState } from "react";

const TaxDetailsContext = createContext();

const TaxDetailsProvider = ({children}) => {
    const [poc, setPoc] = useState('');
    const [issue, setIssue] = useState('');
    const [id, setId] = useState('');
    const [updatedAlertResponse, setUpdatedAlertResponse] = useState('');
    const [caseLawIdAPIResponse, setCaseLawIdAPIResponse] = useState();
    const [pocPresent, setPocPresent] = useState(true);
    const [issuePresent, setIssuePresent] = useState(true);
    const [idPresent, setIdPresent] = useState(true);

    const[droppedFile, setDroppedFile] = useState();

    const handleId = (id) => {
        setId(id);
    }

    return(
        <TaxDetailsContext.Provider value={{idPresent, setIdPresent, issuePresent, setIssuePresent, pocPresent, setPocPresent, caseLawIdAPIResponse, setCaseLawIdAPIResponse, poc, setPoc, issue, setIssue, droppedFile, setDroppedFile, id, handleId, updatedAlertResponse, setUpdatedAlertResponse}}>
            {children}
        </TaxDetailsContext.Provider>
    )
}

export {TaxDetailsContext, TaxDetailsProvider};