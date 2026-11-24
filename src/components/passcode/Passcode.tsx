"use client"
import { useContext } from "react";
import {PasscodeContext} from "@/context/PasscodeContext";
import { useRouter } from "next/navigation";



const Passcode = () => {
    const router = useRouter();

    const context = useContext(PasscodeContext);

    const {passcode, setPasscode, authenticated, setAuthenticated} = context;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;

        const newPasscode = passcode.map((data:String, i:number) => (i === index ? newValue : data));
        setPasscode(newPasscode);

        if (e.target.value && e.target.nextSibling) {
            const nextSibling = e.target.nextSibling as HTMLInputElement;
            if (nextSibling && nextSibling.focus) {
                nextSibling.focus();
            }

        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === "Backspace"){
            e.preventDefault();
            
                const newPasscode = [...passcode];
                newPasscode[index] = '';
                setPasscode(newPasscode);
                const prevInput = (e.target as HTMLInputElement).previousSibling as HTMLInputElement;
                if(prevInput){
                    prevInput.focus();
                }
            
        }
    }
    const handleLogin = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const response = '12345678';
        e.preventDefault();
    
        if(passcode.join('') == response){
          setAuthenticated(true);
    
          // localStorage.setItem('authenticated', true);
          setTimeout(() => {
            // Redirect to authenticated route
            router.push('/upload');
            
          }, 1000);

          
    
        }
        else{
          setAuthenticated(false);
          // localStorage.setItem('authenticated', false);
        }
    
    
      }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if(e.key === "Enter" && index === passcode.length - 1){
            handleLogin(e);
        }
    }

        return (
            <div className="w-[464px] h-[48px] justify-between space-x-2.5">
                {passcode.map((data:string, i:number) =>
                    <input
                    key={i}
                        className={
                            `w-[48px] h-[48px] rounded border-2 px-2.5 py-4 text-center border-[#D2D2D2] 
                                ${authenticated !== null ? authenticated ? 'border-[#26890D]' : 'border-[#DA291C]' : 'border-[#D2D2D2]'}`
                        }
                        type={"password"}
                        maxLength={1}
                        onChange={(e) => handleChange(e, i)}
                        value={data}
                        onKeyDown={(e) => handleKeyDown(e, i)} 
                        onKeyPress={(e) => handleKeyPress(e, i)}/>)
                }
            </div>

        )

    
}

export default Passcode;
