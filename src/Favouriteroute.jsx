import { useState, useEffect } from "react";
import { tv } from "tailwind-variants";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/Button";

const FavouriteroutePage = tv({
  slots: {
    base: "flex flex-col h-screen items-center pt-20",
    headerText: "text-3xl font-bold mb-10",
    button:
      "text-[#780000] font-bold px-6 py-2 rounded-md border border-solid border-orange-500 bg-white shadow-md hover:bg-gray-100 transition ease-in-out duration-300",
    span: "text-lg font-semibold",
  },
});

const { base, headerText, button, } = FavouriteroutePage();

export default function Favouriteroute() {
  const [favourites, setFavourites] = useState([]);
  // const navigate = useNavigate();

  const fetchFavourites = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API}` + "/favourite/list",
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

  const deleteFavorites = async (itemId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_APP_API}` + "/favourite/delete",
        { itemId: itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Deleted from favorites!");
      fetchFavourites(); // Refresh the data
    } catch (error) {
      console.error("Error deleting from favorites:", error);
      alert("Failed to delete from favorites.");
    }
  };

  return (
    <main className={base()}>
      <h1 className={headerText()}>เส้นทางที่บันทึก</h1>
      {favourites.map((favourite) => (
        <section
          key={favourite._id}
          className="flex justify-center items-center w-4/5 space-x-4"
        >
          <span className="text-lg font-semibold">{favourite.from}</span>
          <span className="text-lg font-semibold">{favourite.to}</span>{" "}
          <button className={button()}>ใช้</button>
          <button
            className={button()}
            onClick={() => deleteFavorites(favourite._id)}
          >
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
