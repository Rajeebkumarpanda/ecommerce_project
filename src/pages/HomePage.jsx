import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  getAllProducts,
  removeFromCart,
} from "../redux/features/productSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { debounce } from "lodash";

const HomePage = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.product);
  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const handleAddToCart = (elem) => {
    dispatch(addToCart(elem));
    setAddedItems([...addedItems, elem.id]);
  };
  const handleRemoveFromCart = (elem) => {
    dispatch(removeFromCart(elem));
  };

  const handleSearchChangeDebounced = debounce((value) => {
    setDebouncedSearch(value);
  }, 300);

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
    handleSearchChangeDebounced(e.target.value);
  };
  return (
    <>
      <div className="w-full bg-gray-300">
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search by title"
            className="flex justify-end w-[500px] outline-none border-2 p-3 rounded-lg border-cyan-300 mx-3 my-5"
            value={searchItem}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full px-20 grid grid-cols-3 gap-2 pt-5">
          {result.data.products &&
            result.data.products
              .filter((elem) =>
                elem.title.toLowerCase().includes(debouncedSearch.toLowerCase())
              )

              .map((elem) => (
                <div
                  key={elem.id}
                  className="relative flex w-96 m-2 flex-col rounded-xl bg-white border-2 text-gray-700 shadow-lg"
                >
                  <div className="relative mx-4 mt-2 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
                    <img
                      src={elem.thumbnail}
                      alt="img-blur-shadow"
                      layout="fill"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                      {elem.title}
                    </h5>
                    <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                      $ {elem.price}
                    </p>
                  </div>
                  {result.cart.length > 0 &&
                  result.cart.find((ele) => ele.id === elem.id) ? (
                    <div className="p-6 pt-0 flex gap-4 items-center cursor-pointer">
                      <FaMinus onClick={() => handleRemoveFromCart(elem)} />
                      <p>
                        {result.cart.find((ele) => ele.id === elem.id)
                          ?.quantity || 0}
                      </p>
                      <FaPlus onClick={() => handleAddToCart(elem)} />
                    </div>
                  ) : (
                    <button
                      className="bg-lime-400 w-[200px] m-3 rounded-lg text-bold px-4 py-2"
                      onClick={() => handleAddToCart(elem)}
                      disabled={addedItems.includes(elem.id)}
                    >
                      {addedItems.includes(elem.id) ? "Added" : "Add To Cart"}
                    </button>
                  )}
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
