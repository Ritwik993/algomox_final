import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Verify = ({ eventsData }) => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const token = useSelector((store) => store.categorySlice.token);
  const navigate = useNavigate();
  const url = useSelector((store) => store.categorySlice.url);
  const [loading, setLoading] = useState(true); // State to track loading

  const verifyOrder = async () => {
    try {
      const response = await axios.post(
        `${url}/order/verify`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        // If the order is verified, navigate to my orders
        navigate("/myorders");

        // Update the events data asynchronously
        await Promise.all(
          eventsData.map(async (event) => {
            await axios.put(
              `${url}/admin/delete/${event.id}`,
              { quantity: event.quantity },
              { headers: { token } }
            );
          })
        );
      } else {
        // If verification failed, navigate to home
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying order:", error);
      navigate("/"); // Navigate to home on error
    } finally {
      setLoading(false); // Set loading to false after process
    }
  };

  useEffect(() => {
    verifyOrder();
  }, [eventsData]); // Add eventsData to dependency array

  return (
    <div className="pt-32 px-4 md:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center gap-8">
        {loading ? (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        ) : (
          <div className="text-center">Verification complete</div>
        )}
      </div>
    </div>
  );
};

export default Verify;
