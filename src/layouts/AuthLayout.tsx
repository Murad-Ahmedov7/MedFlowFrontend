import { Outlet } from "react-router-dom";


export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-white  ">
      
      <div className="fixed inset-0 bg-black/30"></div> 


      <div className="w-[90%] max-w-4xl   bg-white/20 backdrop-blur-xl  border border-white/30 rounded-3xl shadow-2xl">
        <Outlet />
      </div>


 {/* bg-white/20 backdrop-blur-xl */}

 {/* glass effekt ucun esas bu ikisi olmalidir  */}
     
   </div>
  );
}
