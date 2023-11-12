import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const HistoryPage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-10 bg-[#fee4c8]",
    headerText: "text-4xl font-bold mb-10",
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
      await axios.post(
        "http://localhost:3000/api/history/addtofav",
        { searchHistoryId: searchHistoryId },
        { withCredentials: true },

      );
      alert('Added to favorites!');
      // Optionally, refresh the data or update the UI to reflect the change
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert('Failed to add to favorites.');
    }
  };

  // second <tr> is placeholder used for layout development

  return (
    <main className={base()}>
      <h1 className={headerText()}>ประวัติเดินทาง</h1>
      <div className="w-full h-full flex justify-center bg-white rounded-tl-2xl rounded-tr-2xl py-5">
        <section className="flex flex-col justify-between items-center w-100% space-x-4">
          <table className="border border-collapse w-full">
            <tbody>
              {history.map((hist, index) => (
                <tr key={index}>
                  <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{hist.from}</td>
                  <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{'>'}</td>
                  <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{hist.to}</td>
                  <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{"100฿"}</td>
                  <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">
                    <Button
                      label={"เก็บ"}
                      className={"px-2 py-2"}
                      func={() => addToFavorites(hist._id)}
                    />
                  </td>
                </tr>
              ))}


              <tr>
                <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{"จุฬาลงกรมหาวิทยาลัย"}</td>
                <td className="border border-gray-500 p-2 font-normal text-sm text-center px-1 py-1">{'>'}</td>
                <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{"เตรียมอุดมศึกษา"}</td>
                <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">{"100฿"}</td>
                <td className="border border-gray-500 p-2 font-semibold text-sm text-center px-1 py-1">
                  <Button
                    label={"เก็บ"}
                    className={"px-1 py-1"}
                    func={() => addToFavorites(hist._id)}
                  />
                </td>
              </tr>

            </tbody>
          </table>
          <Link to={"/home"} className="my-5">
            <Button label={"กลับไปหน้าหลัก"} />
          </Link>
        </section>
      </div>
    </main>
  );
}
