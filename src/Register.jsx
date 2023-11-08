import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import { InputForm } from "./components/InputForm";
import { Button } from "./components/Button";

const RegisterPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

const { base, headerText } = RegisterPage();

export default function Login() {
  return (
    <main className={base()}>
      <h1 className={headerText()}>ลงทะเบียน</h1>
      <section className="w-4/5">
        <form className="flex flex-col">
          <InputForm
            label="หมายเลขโทรศัพท์/อีเมล์"
            id="username"
            placeholder="name@email.com"
          />
          <InputForm label="รหัสผ่าน" type="password" id="password" hint="รหัสผ่านต้องมีความยาวอย่างน้อย 8 อักษร"/>
          <InputForm label="ยืนยันรหัสผ่าน" type="confirmpassword" id="confirmpassword" />
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
          <Link to="/">
            <span>กลับไปหน้าลงชื่อเข้าใช้</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
