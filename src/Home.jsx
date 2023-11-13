import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const HomePage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

const { base, headerText } = HomePage();

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('https://se-term-project.onrender.com/api/users/logout', 
      {},
      { withCredentials: true });
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
      // Handle error appropriately
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>หน้าหลัก</h1>
      <section className="w-4/5 flex flex-col gap-10 items-center">
        <Link to="/map" className="w-full">
          <Button label="กำหนดเส้นทาง" />
        </Link>
        <Link to="/favouriteroute" className="w-full">
          <Button label="เส้นทางที่บันทึก" />
        </Link>
        <Link to="/history" className="w-full">
          <Button label="ประวัติการเดินทาง" />
        </Link>
      </section>

      <Link to="/">
        <div className="mt-44">
          <Button 
            label="ออกจากระบบ" 
            func = {handleLogout}/>
            
        </div>
      </Link>
    </main>
  );
}
