

import AuthInput from "./AuthInput";
import { Link } from "react-router-dom";
import { useSignInForm } from "../hooks/useSignInForm";
import PasswordInput from "./PasswordInput";

export default function SignInForm() {
  const {  register, handleSubmit, errors, loading, watch  } = useSignInForm();


  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-9 py-15 justify-center items-center ">
     <div className="w-100 h-45">
        <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
      </div>
      

      <div className="text-white flex flex-col items-center gap-4 ">
        <p className="text-white text-4xl  font-bold ">Sign In Now!</p>
        <p className="text-white text-[18px]">
          Welcome back! Please enter your details
        </p>
      </div>

      <AuthInput
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
        placeholder="Enter your email"
        error={errors.email?.message}
      />
      <PasswordInput
        label="Password"
        {...register("password", {
          required: "Password is required",
        })}
        placeholder="Enter your password"
        error={errors.password?.message}
      />

      <div className=" w-[80%] ">
        <button
          type="submit"
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-800 text-white font-semibold rounded-2xl"
          
        >
            {loading ? "Loading..." : "Sign In"}
        </button>
      </div>

      <div className="text-white text-lg flex gap-2 ">
        Don't have an account?
        <Link to="/auth/sign-up" className="text-cyan-400 underline">
          Sign Up
        </Link>
      </div>
    </form>
  );
}



// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import ReactCountryFlag from "react-country-flag";

// import AuthInput from "./AuthInput";
// import { Link } from "react-router-dom";
// import { useSignInForm } from "../hooks/useSignInForm";
// import PasswordInput from "./PasswordInput";

// export default function SignInForm() {
//   const { register, handleSubmit, errors, loading } = useSignInForm();

//   const { i18n } = useTranslation();
//   const [open, setOpen] = useState(false);

//   const currentLang = i18n.language;

//   const changeLang = (lang: "az" | "en") => {
//     i18n.changeLanguage(lang);
//     localStorage.setItem("lang", lang);
//     setOpen(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-8 py-12 justify-center items-center">
      
//       {/* Logo */}
//       <div className="w-100 h-45">
//         <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
//       </div>

//       {/* 🌍 Language Picker */}
//       <div className="relative">
//         <button
//           type="button"
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/20 backdrop-blur-md hover:bg-white/30 transition text-white"
//         >
//           <ReactCountryFlag
//             countryCode={currentLang === "az" ? "AZ" : "GB"}
//             svg
//             style={{ width: "18px", height: "18px" }}
//           />
//           <span className="text-sm uppercase">{currentLang}</span>
//         </button>

//         {open && (
//           <div className="absolute mt-2 w-40 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
            
//             <button
//               type="button"
//               onClick={() => changeLang("az")}
//               className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
//             >
//               <ReactCountryFlag countryCode="AZ" svg style={{ width: "18px", height: "18px" }} />
//               Azerbaijani
//             </button>

//             <button
//               type="button"
//               onClick={() => changeLang("en")}
//               className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
//             >
//               <ReactCountryFlag countryCode="GB" svg style={{ width: "18px", height: "18px" }} />
//               English
//             </button>

//           </div>
//         )}
//       </div>

//       {/* Title */}
//       <div className="text-white flex flex-col items-center gap-3">
//         <p className="text-4xl font-bold">Sign In Now!</p>
//         <p className="text-[16px] opacity-90">
//           Welcome back! Please enter your details
//         </p>
//       </div>

//       {/* Inputs */}
//       <AuthInput
//         label="Email"
//         type="email"
//         {...register("email", {
//           required: "Email is required",
//           pattern: {
//             value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//             message: "Invalid email format",
//           },
//         })}
//         placeholder="Enter your email"
//         error={errors.email?.message}
//       />

//       <PasswordInput
//         label="Password"
//         {...register("password", {
//           required: "Password is required",
//         })}
//         placeholder="Enter your password"
//         error={errors.password?.message}
//       />

//       {/* Button */}
//       <div className="w-[80%]">
//         <button
//           type="submit"
//           className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold rounded-2xl"
//         >
//           {loading ? "Loading..." : "Sign In"}
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="text-white text-lg flex gap-2">
//         Don't have an account?
//         <Link to="/auth/sign-up" className="text-cyan-400 underline">
//           Sign Up
//         </Link>
//       </div>
//     </form>
//   );
// }


// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import ReactCountryFlag from "react-country-flag";

// import AuthInput from "./AuthInput";
// import { Link } from "react-router-dom";
// import { useSignInForm } from "../hooks/useSignInForm";
// import PasswordInput from "./PasswordInput";

// export default function SignInForm() {
//   const { register, handleSubmit, errors, loading } = useSignInForm();

//   const { i18n } = useTranslation();
//   const [open, setOpen] = useState(false);

//   const currentLang = i18n.language;

//   const changeLang = (lang: "az" | "en") => {
//     i18n.changeLanguage(lang);
//     localStorage.setItem("lang", lang);
//     setOpen(false);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="relative flex flex-col gap-8 py-12 justify-center items-center"
//     >
//       {/* 🌍 Language (TOP RIGHT) */}
//       <div className="absolute top-4 right-4">
//         <div className="relative">
//           <button
//             type="button"
//             onClick={() => setOpen(!open)}
//             className="flex items-center gap-2 px-2 py-1 rounded-lg text-white/80 hover:text-white transition text-sm"
//           >
//             <ReactCountryFlag
//               countryCode={currentLang === "az" ? "AZ" : "GB"}
//               svg
//               style={{ width: "16px", height: "16px" }}
//             />
//             {currentLang}
//           </button>

//           {open && (
//             <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
//               <button
//                 type="button"
//                 onClick={() => changeLang("az")}
//                 className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
//               >
//                 <ReactCountryFlag countryCode="AZ" svg style={{ width: "18px", height: "18px" }} />
//                 Azerbaijani
//               </button>

//               <button
//                 type="button"
//                 onClick={() => changeLang("en")}
//                 className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
//               >
//                 <ReactCountryFlag countryCode="GB" svg style={{ width: "18px", height: "18px" }} />
//                 English
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Logo */}
//       <div className="w-100 h-45">
//         <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
//       </div>

//       {/* Title */}
//       <div className="text-white flex flex-col items-center gap-3">
//         <p className="text-4xl font-bold">Sign In Now!</p>
//         <p className="text-[16px] opacity-90">
//           Welcome back! Please enter your details
//         </p>
//       </div>

//       {/* Inputs */}
//       <AuthInput
//         label="Email"
//         type="email"
//         {...register("email")}
//         placeholder="Enter your email"
//         error={errors.email?.message}
//       />

//       <PasswordInput
//         label="Password"
//         {...register("password")}
//         placeholder="Enter your password"
//         error={errors.password?.message}
//       />

//       {/* Button */}
//       <div className="w-[80%]">
//         <button
//           type="submit"
//           className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition text-white font-semibold rounded-2xl"
//         >
//           {loading ? "Loading..." : "Sign In"}
//         </button>
//       </div>

//       {/* Footer */}
//       <div className="text-white text-lg flex gap-2">
//         Don't have an account?
//         <Link to="/auth/sign-up" className="text-cyan-400 underline">
//           Sign Up
//         </Link>
//       </div>
//     </form>
//   );
// }


//authda dil ve theme-i necese elave et

//burda 3 dene var diger ikisnden dil yarimciq qosulub bax ona