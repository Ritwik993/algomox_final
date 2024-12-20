import React, { useEffect, useState } from "react";
import axios from "axios";
 import { toast } from "react-toastify";
const AddItem = ({url}) => {
  //const url = "http://localhost:4000";
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Hackathon",
    price: "",
    ticket:"",
    location:"",
    date:"",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price",Number( data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    formData.append("date",data.date);
    formData.append("location",data.location);
    formData.append("ticket",Number(data.ticket));

    const response = await axios.post(
      `${url}/admin/addProduct`,
      formData
      );
      console.log(response)
    if(response.data.sucess) {
      setData({ name: "", description: "", category: "Hackathon", price: "" ,ticket:"",location:"",date:""});
      setImage(null);
      toast.success("Event Added");
    } else {
      toast.error("Error");
    }
  };
  return (
    <div className="p-4 w-1/2">
      <form
        onSubmit={onSubmitHandler}
        className="border-2 border-slate-500 p-4 rounded-lg flex flex-col gap-6"
      >
        <div className="flex flex-col">
          <label htmlFor="image" className="mb-2 font-medium">
            Upload your image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={onChangeHandler}
            value={data.name}
          />

<label htmlFor="date" className="mb-2 font-medium">
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            placeholder="dd-mm-yyyy"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={onChangeHandler}
            value={data.date}
          />
          <label htmlFor="location" className="mb-2 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="border-2 border-slate-500 p-2 rounded-md"
            onChange={onChangeHandler}
            value={data.location}
          />

<label htmlFor="ticket" className="mb-2 font-medium">
              Available Tickets
            </label>
            <input
              type="number"
              name="ticket"
              id="ticket"
              className="border-2 border-slate-500 p-2 rounded-md"
              onChange={onChangeHandler}
              value={data.ticket}
              placeholder="0"
            />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="border-2 border-slate-500 p-2 rounded-md resize-none"
            onChange={onChangeHandler}
            value={data.description}
          />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex flex-col mb-4 md:mb-0">
            <label htmlFor="category" className="mb-2 font-medium">
              Events Category
            </label>
            <select
              name="category"
              id="category"
              className="border-2 border-slate-500 p-2 rounded-md "
              onChange={onChangeHandler}
            >
              <option value="Hackathon">Hackathon</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-2 font-medium">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="border-2 border-slate-500 p-2 rounded-md"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="0"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddItem;
