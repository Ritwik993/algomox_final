import React, { useEffect } from "react";
// import ExploreMenu from "./ExploreMenu";
import ItemMenu from "./EventMenu";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/CategorySlice";

const ItemOutlet = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategory("hackathon"));
  }, [dispatch]);

  return (
    <div>
      {/* <ExploreMenu /> */}
      <ItemMenu />
    </div>
  );
};

export default ItemOutlet;
