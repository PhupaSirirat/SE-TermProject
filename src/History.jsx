import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const HistoryPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-5",
    headerText: "text-4xl font-bold mb-5",
  },
});

const { base, headerText } = HistoryPage();

export default function History() {
  const [history, setHistory] = useState([]);
  // const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await axios.get(
        "https://se-term-project.onrender.com/api/history/list",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setHistory(response.data); // Assuming the response contains the history data
    } catch (error) {
      console.error("Error fetching history:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const addToFavorites = async (searchHistoryId) => {
    try {
      const token = sessionStorage.getItem('token');
      await axios.post(
        "https://se-term-project.onrender.com/api/history/addtofav",
        { searchHistoryId: searchHistoryId },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert('Added to favorites!');
      // Optionally, refresh the data or update the UI to reflect the change
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert('Failed to add to favorites.');
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>ประวัติเดินทาง</h1>
      <div className="w-full h-full flex justify-center">
        <section className="flex flex-col justify-between items-center w-100% space-x-4">
          <table className="w-full">
            <tbody>

              {history.map((hist, index) => (
                <tr key={index} className="flex items-center bg-white rounded-3xl shadow-lg p-2 my-2">
                  <td className="flex flex-grow justify-center items-center border-r-2 border-gray-200 font-semibold text-sm px-1 py-1">
                    <div>
                      <div className="text-left py-0.5">
                        {"จาก : "}{hist.from}
                      </div>
                      <div className="text-left py-0.5">
                        {"ถึง : "}{hist.to}
                      </div>
                    </div>
                  </td>
                  <td className="flex-grow align-middle font-semibold text-sm text-center px-2">{"-"}{"100฿"}</td>
                  <td className="align-middle font-semibold text-sm text-center px-2">
                    <Button
                      label={"บันทึก"}
                      className={"min-h-[3rem] text-sm rounded-full p-1"}
                      func={() => addToFavorites(hist._id)}
                    />
                  </td>
                </tr>
              ))}

              {/*
              <tr className="flex items-center bg-white rounded-3xl shadow-lg px-0.5 py-0.5 my-2">
                <td className="flex flex-grow justify-center items-center border-r-2 border-gray-200 font-semibold text-sm pl-1 pr-2 py-1">
                  <div>
                    <div className="text-left border-b py-0.5">
                      {"จาก : "}{"จุฬาลงกรมหาวิทยาลัย"}
                    </div>
                    <div className="text-left border-t py-0.5">
                      {"ถึง : "}{"เตรียมอุดมศึกษา"}
                    </div>
                  </div>
                </td>
                <td className="flex-grow align-middle font-bold text-green-600 text-md text-center px-2">{"-"}{"100฿"}</td>
                <td className="align-middle font-semibold text-sm text-center px-2">
                  <Button
                    label={"บันทึก"}
                    className={"min-h-[3rem] text-sm rounded-full p-1"}
                    func={() => addToFavorites(hist._id)}
                  />
                </td>
              </tr>
              */}

            </tbody>
          </table>
          <Link to={"/home"} className="my-5">
            <Button label={"กลับไปหน้าหลัก"} />
          </Link>
        </section>
      </div>
    </main >
  );
}
