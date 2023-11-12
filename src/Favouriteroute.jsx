import React, { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const FavouriteroutePage = tv({
    slots: {
      base: "flex flex-col h-screen items-center pt-20",
      headerText: "text-3xl font-bold mb-10",
      button: "text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300",
      span: "text-lg font-semibold",
    },
  });

const { base, headerText,button,span } = FavouriteroutePage();



export default function Favouriteroute() {
  const [favourites, setFavourites] = useState([]);
  // const navigate = useNavigate();

  const fetchFavourites = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/favourite/list",
        { withCredentials: true }
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

  const deleteFavorites = async (itemId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/favourite/delete",
        { itemId: itemId },
        { withCredentials: true },
        
      );
      alert('Deleted from favorites!');
      fetchFavourites()
      // Optionally, refresh the data or update the UI to reflect the change
    } catch (error) {
      console.error("Error deleting from favorites:", error);
      alert('Failed to delete from favorites.');
    }
  };

  // const mockData = [
  //   { id: 1, route: 'เส้นทาง A' },
  //   { id: 2, route: 'เส้นทาง B' },
  //   // more date.....
  // ];
  // const [data, setData] = useState(mockData); // ใช้ข้อมูลจำลองเป็นตัวอย่าง

  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      {favourites.map((favourite) => (
        <section className="flex justify-center items-center w-4/5 space-x-4">
        <span className="text-lg font-semibold">{favourite.from}</span>
        <span className="text-lg font-semibold">{favourite.to}</span>          <button className={button()}>
            ใช้
          </button>
          <button 
            className={button()} 
            onClick={() => deleteFavorites(favourite._id)}>
            ลบ
          </button>
        </section>
      ))}

      <Link to={"/home"}>
        <Button label={"กลับไปหน้าหลัก"} />
      </Link>

    </main>
  );
}

  