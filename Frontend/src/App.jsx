import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceEvent/PlaceEvent";
import Home from "./pages/Home/Home";
import ContactUs from "./Components/ContactUs";
import ItemMenu from "./Components/EventMenu";
import Verify from "./Components/Verify";
import MyOrder from "./Components/MyOrder";
import ItemOutlet from "./Components/EventOutlet";
import { useSelector } from "react-redux";

function App() {
  const eventsData = useSelector((store) => store.categorySlice.productAdded);
// console.log(eventsData);
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/placeOrder",
          element: <PlaceOrder />,
        },
        {
          path: "/contact-us",
          element: <ContactUs />,
        },
        {
          path: "/food-menu",
          element: <ItemOutlet />,
        },
        {
          path: "/payment",
          element: <PlaceOrder />,
        },
        {
          path: "/verify",
          element: <Verify eventsData={eventsData} />, // Pass as a prop here
        },
        {
          path: "/myorders",
          element: <MyOrder />,
        },
      ],
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
