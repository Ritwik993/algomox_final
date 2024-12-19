import React from "react";
import { menu_list } from "../Food Del Frontend Assets/assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/CategorySlice";

const ExploreMenu = () => {
  const category = useSelector((state) => state.categorySlice.category);
  const dispatch = useDispatch()
  
  console.log(category);
  return (
    <div></div>
  );
};

export default ExploreMenu;
