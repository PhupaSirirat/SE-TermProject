import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const HistoryPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
  },
});

const { base, headerText } = HistoryPage();

export default function History() {
  const [history, setHistory] = useState([]);
  // const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/history/list",
        { withCredentials: true }
      );
      setHistory(response.data); // Assuming the response contains the history data
      console.log(response.data);
      console.log("history : "+history);
    } catch (error) {
      console.error("Error fetching history:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      <section className="flex justify-between items-center w-4/5 space-x-4">
        <span className="text-lg font-semibold">นี่คือเส้นทาง</span>
        <div className="flex items-center gap-3">
          <p>5บาท</p>
          <Button label={"บันทึก"} className={"px-2 py-1"} />
        </div>
      </section>
      {history.map((hist) => {
        <section className="flex justify-between items-center w-4/5 space-x-4">
          <span className="text-lg font-semibold">{hist.from}</span>
          <span className="text-lg font-semibold">{hist.to}</span>
          <div className="flex items-center gap-3">
            <p>5บาท</p>
            <Button label={"บันทึก"} className={"px-2 py-1"} />
          </div>
        </section>;
      })}
      <Link to={"/home"}>
        <Button label={"กลับไปหน้าหลัก"} />
      </Link>
    </main>
  );
}
