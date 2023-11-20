import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";
import { Tablerow2 } from "./components/Table";

const FavouriteroutePage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
    button:
      "text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300",
    span: "text-lg font-semibold",
  },
});

const { base, headerText, button, span } = FavouriteroutePage();

export default function Favouriteroute() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  // const navigate = useNavigate();

  const fetchFavourites = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://se-term-project.onrender.com/api/favourite/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFavourites(response.data);
    } catch (error) {
      console.error("Error fetching favourites:", error);
      // Handle error appropriately
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const addToMap = async (searchFavouriteId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.post(
        "https://se-term-project.onrender.com/api/favourite/tomap",
        { searchFavouriteId: searchFavouriteId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/map", { state: { from: res.data.from, to: res.data.to }});
    } catch (error) {
      console.error("Error going to map:", error);
      alert("Failed to go to map.");
    }
  };

  const deleteFavorites = async (itemId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        "https://se-term-project.onrender.com/api/favourite/delete",
        { itemId: itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // alert("Deleted from favorites!");
      fetchFavourites(); // Refresh the data
    } catch (error) {
      console.error("Error deleting from favorites:", error);
      alert("Failed to delete from favorites.");
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      <table className="w-full">
        <tbody>
          {favourites.map((favourite) => (
            <Tablerow2
              key={favourite._id}
              from={favourite.from}
              to={favourite.to}
              func={() => addToMap(favourite._id)}
              func2={() => deleteFavorites(favourite._id)}
            />
          ))}
        </tbody>
      </table>
      <Link to={"/home"}>
        <Button label={"กลับไปหน้าหลัก"} />
      </Link>
    </main>
  );
}
