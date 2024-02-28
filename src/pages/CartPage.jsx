import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/features/productSlice";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const CartPage = () => {
  const [cartRes, setCartRes] = useState(0);
  const [cartOriginalValue, setCartOriginalValue] = useState(0);
  const [cartGST, setCartGST] = useState(0);
  const dispatch = useDispatch();
  const result = useSelector((state) => state.product);
  const handleAddToCart = (elem) => {
    dispatch(addToCart(elem));
  };
  const handleRemoveFromCart = (elem) => {
    dispatch(removeFromCart(elem));
  };

  const multiply = useMemo(() => {
    const cartValue = result.cart.reduce((acc, curr) => {
      return (acc = acc + curr.quantity * curr.price);
    }, 0);
    setCartOriginalValue(cartValue);
    const gstValue = cartValue * 0.28;
    setCartGST(gstValue);
    const shippingCharge = 10;
    if (cartValue) {
      const totalValue = cartValue + gstValue + shippingCharge;
      setCartRes(totalValue);
    }
  }, [result.cart]);
  return (
    <>
      <section
        className="h-screen bg-gray-100 px-4 text-gray-600 antialiased mt-3"
        x-data="app"
      >
        <div className="flex flex-col justify-center">
          <div className="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white shadow-lg">
            <header className="border-b border-gray-100 px-5 py-4">
              <div className="font-semibold text-gray-800">Manage Carts</div>
            </header>
            <div className="overflow-x-auto p-3">
              <table className="w-full table-auto">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400">
                  <tr>
                    <th className="p-2">
                      <div className="text-left font-semibold">
                        Product Name
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Quantity</div>
                    </th>
                    <th className="p-2">
                      <div className="text-left font-semibold">Price</div>
                    </th>
                    <th className="p-2">
                      <div className="text-center font-semibold">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {/* <tr> */}
                  {result.cart.length > 0 &&
                    result.cart.map((elem) => (
                      <tr key={elem.id}>
                        <td className="p-2">
                          <div className="font-medium text-gray-800">
                            {elem.title}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-left">
                            {elem.quantity ? elem.quantity : 0}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-left font-medium text-green-500">
                            $ {elem.price}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex justify-center gap-4 items-center cursor-pointer">
                            <FaMinus
                              onClick={() => handleRemoveFromCart(elem)}
                            />
                            <p>
                              {result.cart
                                ? result.cart.map(
                                    (elm) => elm.id === elem.id && elm.quantity
                                  )
                                : 0}
                            </p>
                            <FaPlus onClick={() => handleAddToCart(elem)} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  {/* </tr> */}
                </tbody>
              </table>
            </div>
            {/* total amount */}
            {result.cart.length > 0 && (
              <>
                <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 font-bold">
                  <div>Total</div>
                  <div className="text-blue-600">
                    $ {cartOriginalValue.toFixed(2)}
                    {multiply}
                    <span x-text="total.toFixed(2)" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4  font-bold">
                  <div>GST</div>
                  <div className="text-blue-600">
                    $ {cartGST.toFixed(2)}
                    {multiply}
                    <span x-text="total.toFixed(2)" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4  font-bold">
                  <div>Shipping Charge</div>
                  <div className="text-blue-600">
                    $ {10}
                    <span x-text="total.toFixed(2)" />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 border-t border-gray-100 px-5 py-4 text-xl font-bold">
                  <div>Total Amount</div>
                  <div className="text-blue-600">
                    $ {cartRes.toFixed(2)}
                    {multiply}
                    <span x-text="total.toFixed(2)" />
                  </div>
                </div>
              </>
            )}
            <div className="flex justify-end">
              <input
                type="hidden"
                className="border border-black bg-gray-50"
                x-model="selected"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartPage;
