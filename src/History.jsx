import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";
import { Tablerow } from "./components/Table";

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
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://se-term-project.onrender.com/api/history/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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
      const token = sessionStorage.getItem("token");
      await axios.post(
        "https://se-term-project.onrender.com/api/history/addtofav",
        { searchHistoryId: searchHistoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      alert("Added to favorites!");
      // Optionally, refresh the data or update the UI to reflect the change
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>ประวัติเดินทาง</h1>
      <div className="w-full h-full flex justify-center">
        <section className="w-full flex flex-col justify-between items-center ">
          <table className="w-full">
            <tbody>
              {history.map((hist, index) => (
                <Tablerow
                  key={index}
                  from={hist.from}
                  to={hist.to}
                  cost="5"
                  func={() => addToFavorites(hist._id)}
                />
              ))}
                <Tablerow
                keyindex={100}
                from={"Chulalongkorn"}
                to={"Phayathai"}
                cost="5"
                func={() => addToFavorites(hist._id)}
              />
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
