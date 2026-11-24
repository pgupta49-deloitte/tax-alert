"use client"
// import Passcode from "../passcode/Passcode";
import { PasscodeContext } from "@/context/PasscodeContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../utils/authConfig";

const Login = () => {
  const { instance } = useMsal();
  const context = useContext(PasscodeContext);
  const {passcode, setPasscode, authenticated, setAuthenticated} = context;
  const router = useRouter();
  
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>,loginType:string) => {
    const response = '12345678';
    e.preventDefault();

    if (loginType === "popup") {
        instance.loginPopup(loginRequest).catch((e) =>{ console.error(`loginPopup failed: ${e}`) });
    } else if (loginType === "redirect") {
        instance.loginRedirect(loginRequest).catch((e) => { console.error(`loginRedirect failed: ${e}`) })
    };

    // if(passcode.join('') == response){
    //   setAuthenticated(true);
    //   setTimeout(() => {
    //     router.push('/upload');
    //   }, 1000);
    // }
    // else{
    //   setAuthenticated(false);
    // }
  };

  return (
  
    (<>
      <div className="flex h-screen justify-center">
        <div className="flex justify-center items-center bg-black w-[683px] h-[781px] " >
          <img className="absolute flex mx-auto w-36 h-18 left-8 top-5" src={"logo.svg"} alt="My Image" />
          <img className="absolute flex mx-auto w-[484px] h-[484px] top-[92px] " src={"bell.png"} alt=""/>
          <div className="absolute mx-auto text-white w-[422px] h-[48px] top-[590px] flex justify-center items-center">
            <p className="font-inter font-semibold text-[40px] leading-[48.41px] tracking-[-4px] text-center">Tax Alerts Wizard
              {/* <span className="px-1 font-inter font-extralight italic text-[40px] leading-[48.41px] tracking-[-4px] text-center">   </span>  */}
            </p>
          </div >
          <p className="absolute top-[730px]  text-white font-sans font-bold size text-xs"> © 2024 Deloitte Touche Tohmatsu India LLP. </p>
        </div>
        <div className="flex-auto w-1/2 " >
          <h1 className="absolute w-[156px] h-[49px] top-[245px] left-[785px] font-sans font-normal text-4xl"> Welcome </h1>
          <p className="absolute w-[300.54px] h-[25px] top-[296px] left-[785.1px] text-tertiary-grey text-lg font-normal leading-6"> Login Single Sign-On (SSO) </p>
          {/* <div className="absolute w-[496px] h-[48px] top-[353px] left-[769px] px-4 gap-4">
            <Passcode />
            { authenticated !== null && <>
            {authenticated 
            ? <p className="font-[Open-Sans] font-normal text-[#26890D] text-sm leading-[19.07px]">Successfully Authenticated</p> 
            : <p className="font-[Open-Sans] font-normal text-[#DA291C] text-sm leading-[19.07px]">Incorrect Passcode. Please try agin.</p> }
          </>}
          </div> */}
          <button className="absolute w-[226px] h-[48px] top-[350px] left-[785px] bg-black text-white font-sans" onClick={(event)=> handleLogin(event,'redirect')}>Login</button>
          {/* <button className="absolute w-[226px] h-[48px] top-[452px] left-[785px] bg-black text-white font-sans" onClick={(event)=> handleLogin(event,'popup')}>  Login with redirect </button> */}
        </div>
      </div>
      </>
    )
  );
}
export default Login;
