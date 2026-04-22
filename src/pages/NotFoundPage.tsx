import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { tokenService } from "@/services/tokenService";

export default function NotFoundPage() {
  const token = tokenService.getToken();
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-330 via-gray-50 to-gray-200">
      <div className="relative bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        {/* Glow effect */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaExclamationTriangle className="text-yellow-500 text-5xl" />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-gray-800 mb-2">404</h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          The page you are looking for does not exist
        </p>

        {/* Button */}
        <Link
          to={token ? "/departments" : "/auth/sign-in"}
          className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <FaArrowLeft />
          Go Back
        </Link>
      </div>
    </div>
  );
}

//duzelt burada  to hissesini

//token ucun useState isledim?