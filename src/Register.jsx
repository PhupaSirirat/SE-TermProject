import { useState } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";

const RegisterPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-10 bg-[#fee4c8]",
    headerText: "text-4xl font-bold mb-10",
  },
});

const { base, headerText } = RegisterPage();

export default function Register() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (password === confirmPassword) {
        const response = await axios.post(
          "https://se-term-project.onrender.com/api/users/register",
          {
            identifier,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        alert("Register successful!");
        navigate("/");
      }
      else {
        alert("Password and Confirm Password is mismatch")
      }
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const errorMessage = error.response.data.message || "Wrong phone number/email";

        alert(`Register failed: ${errorMessage}`);
      } else if (error.request) {
        // The request was made, but no response was received
        alert("Register failed: No response from server");
      } else {
        // An error occurred in setting up the request
        alert("Register failed: Error in sending request");
      }
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>ลงทะเบียน</h1>
      <div className="w-full h-full flex justify-center bg-white rounded-tl-2xl rounded-tr-2xl">
        <section className="w-4/5 py-6">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <InputForm
              label="หมายเลขโทรศัพท์/อีเมล์"
              id="username"
              placeholder="name@email.com"
              value={identifier}
              func={(e) => setIdentifier(e.target.value)}
            />
            <InputForm
              label="รหัสผ่าน"
              type="password"
              id="password"
              hint="รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักษร"
              value={password}
              func={(e) => setPassword(e.target.value)}
            />
            <InputForm
              label="ยืนยันรหัสผ่าน"
              type="password"
              id="confirmpassword"
              value={confirmPassword}
              func={(e) => setConfirmPassword(e.target.value)}
            />
            <Button label="ลงทะเบียน" type="submit" />
          </form>

          <div className="flex items-center py-4 mt-4">
            <div className="flex-grow h-px bg-primary"></div>
            <span className="flex-shrink text-sm text-primary px-4 italic font-light">
              หากมีบัญชีแล้ว
            </span>
            <div className="flex-grow h-px bg-primary"></div>
          </div>
          <div className="flex justify-center">
            <Link to="/">
              <span>กลับไปหน้าลงชื่อเข้าใช้</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
