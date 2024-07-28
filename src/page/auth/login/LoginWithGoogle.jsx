import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function LoginWithGoogle({ onLoginSuccess, onLoginFailure }) {
  return (
    <div className="flex absolute bottom-0 items-center justify-center w-full px-5 py-2.5 rounded-lg ring-2 ring-[#222162] ring-inset text-gray-500 bg-white text-lg font-semibold hover:bg-[#222162] hover:text-white transition duration-300 ease-in-out">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse?.credential);
          onLoginSuccess(decoded);
        }}
        onError={() => {
          onLoginFailure();
        }}
      />
    </div>
  );
}

// LoginWithGoogle.jsx
// import React from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";

// export default function LoginWithGoogle({ onLoginSuccess, onLoginFailure }) {
//   const handleGoogleLogin = (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse?.credential);

//     // Send the decoded user information to your backend
//     fetch("http://136.228.158.126:50003/api/users/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: decoded.email,
//         name: decoded.name,
//         googleId: decoded.sub,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("User created/exists in backend:", data);
//         onLoginSuccess(data);
//       })
//       .catch((error) => {
//         console.error("Error creating user in backend:", error);
//         onLoginFailure();
//       });
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleGoogleLogin}
//       onError={() => {
//         onLoginFailure();
//       }}
//     />
//   );
// }
