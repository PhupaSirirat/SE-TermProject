import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tv } from "tailwind-variants";
import { Button } from "./components/Button";
import { InputForm } from "./components/InputForm";

const LoginPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-5",
    headerText: "text-4xl font-bold mb-5",
  },
});

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { base, headerText } = LoginPage();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}` + "/users/login",
        {
          identifier,
          password,
        },
      );

      const token = response.headers["x-auth-token"];

      if (token) {
        // Store the token in sessionStorage
        sessionStorage.setItem("token", token);
      }

      // alert("Login successful!");
      navigate("/home");
    } catch (error) {
      // console.log("identifier : "+identifier)
      // console.log("password : "+password)
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const errorMessage =
          error.response.data.message || "An unknown error occurred";
        alert(`Login failed: ${errorMessage}`);
      } else if (error.request) {
        // The request was made, but no response was received
        alert("Login failed: No response from server");
      } else {
        // An error occurred in setting up the request
        alert("Login failed: Error in sending request");
      }
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>ลงชื่อเข้าใช้</h1>
      <div className="w-full h-full flex justify-center bg-white rounded-tl-3xl rounded-tr-3xl">
        <section className="w-4/5 py-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputForm
              label="หมายเลขโทรศัพท์/อีเมล"
              id="username"
              placeholder="name@email.com"
              value={identifier}
              func={(e) => setIdentifier(e.target.value)}
            />
            <InputForm
              label="รหัสผ่าน"
              type="password"
              id="password"
              value={password}
              func={(e) => setPassword(e.target.value)}
            />
            <Button label="ลงชื่อเข้าใช้" type="submit" />
          </form>

          <div className="flex items-center py-4 mt-4">
            <div className="flex-grow h-px bg-primary"></div>
            <span className="flex-shrink text-sm text-primary px-4 italic font-light">
              หากไม่มีบัญชี
            </span>
            <div className="flex-grow h-px bg-primary"></div>
          </div>
          <div className="flex justify-center">
            <Link to="/register">
              <Button label="ลงทะเบียน" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
