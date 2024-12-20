import React, { useEffect, useState } from "react";
import { assets } from "../Food Del Frontend Assets/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  decreaseProduct,
  setEventlist,
  setProductAdded,
} from "../utils/CategorySlice";
import axios from "axios";

const ItemMenu = () => {
  const category = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.categorySlice.url);
  const token = useSelector((state) => state.categorySlice.token);
  const eventlist = useSelector((state) => state.categorySlice.eventlist);
  const productAdded = useSelector((state) => state.categorySlice.productAdded);

  // State for search criteria
  const [searchDate, setSearchDate] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.post(
          `${url}/get`,
          {},
          { headers: { token } }
        );
        dispatch(setProductAdded(response.data.cartData));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    if (token) {
      fetchCartData();
    }
  }, [token, url, dispatch]);

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await axios.get(`${url}/admin/getAllProduct`);
        dispatch(setEventlist(response.data.data));
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };

    fetchEventList();
  }, [dispatch, url]);

  const getQuantity = (id) => {
    const product = productAdded.find((product) => product.id === id);
    return product ? product.quantity : 0;
  };

  // Filtered event list based on search criteria
  const filteredEvents = eventlist
    ?.filter((item) => {
      // Filter by category
      const categoryMatch =
        searchCategory === "" || item.category === searchCategory;

      // Filter by date
      const dateMatch =
        searchDate === "" || item.date === searchDate;

      // Filter by location
      const locationMatch =
        searchLocation === "" || item.location.toLowerCase().includes(searchLocation.toLowerCase());

      return categoryMatch && dateMatch && locationMatch;
    });

  return (
    <div className="p-4 sm:p-8 md:p-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Events near you</h1>

      {/* Search Box */}
      <div className="mb-4 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by category"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {filteredEvents
          ?.filter((item) => category === "all" || item.category === category)
          ?.map((item, index) =>
            item.ticket ? (
              <div
                key={index}
                className="w-full sm:w-[300px] p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <div>
                  <img
                    className="rounded-lg w-full h-48 object-cover mb-4 relative"
                    src={item.image.secure_url}
                    alt={item.name}
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 rounded-xl text-[25px]">
                      <img
                        onClick={() =>
                          dispatch(
                            addProduct({
                              id: item._id,
                              name: item.name,
                              price: item.price,
                              quantity: getQuantity(item._id),
                            })
                          )
                        }
                        src={assets.add_icon_green}
                        alt="Add"
                      />
                      {getQuantity(item._id)}
                      <img
                        onClick={() =>
                          dispatch(
                            decreaseProduct({
                              id: item._id,
                              name: item.name,
                              price: item.price,
                              quantity: getQuantity(item._id),
                            })
                          )
                        }
                        src={assets.remove_icon_red}
                        alt="Remove"
                      />
                    </div>
                    <p className="text-xl text-blue-500">{item.ticket} tickets</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-xl text-black-500">{item.date}</p>
                </div>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-green-500">${item.price}</div>
                  <p className="text-xl text-blue-500">{item.location}</p>
                </div>
              </div>
            ) : null
          )}
      </div>
    </div>
  );
};

export default ItemMenu;
