import React, { useState } from 'react';
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from "axios";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";

const LoginPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, setCookies] = useCookies(['token']);
  const { base, headerText } = LoginPage();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        identifier,
        password,
      }, {
        headers: {
          "Content-Type": 'application/json'
        }
      });

      // setCookies('token', response.data.token, { path: '/' });

      alert('Login successful!');
      navigate('/home');
    } catch (error) {
      console.log("identifier : "+identifier)
      console.log("password : "+password)
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const errorMessage = error.response.data.message || 'An unknown error occurred';
        alert(`Login failed: ${errorMessage}`);
      } else if (error.request) {
        // The request was made, but no response was received
        alert('Login failed: No response from server');
      } else {
        // An error occurred in setting up the request
        alert('Login failed: Error in sending request');
      }
    }
  };
  return (
    <main className={base()}>
      <h1 className={headerText()}>ลงชื่อเข้าใช้</h1>
      <section className="w-4/5">
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
          <div className="flex-grow h-px bg-[#FF4E00]"></div>
          <span className="flex-shrink text-sm text-[#FF4E00] px-4 italic font-light">
            หากไม่มีบัญชี
          </span>
          <div className="flex-grow h-px bg-[#FF4E00]"></div>
        </div>
        <div className="flex justify-center">
          <Link to="/register">
            <span>ลงทะเบียน</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
