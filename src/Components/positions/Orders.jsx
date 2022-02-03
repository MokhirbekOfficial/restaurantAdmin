import { useRef, useState, useEffect } from "react";

function Orders() {
  const modalActive = useRef(null);
  const [orderData, setOrderData] = useState();
  const [orderData2, setOrderData2] = useState({});
  useEffect(() => {
    fetch("https://resback.herokuapp.com/orders")
      .then((data) => data.json())
      .then((m) => setOrderData(m));
  }, []);
  let thisOrder = {};
  function actModal(evt) {
    modalActive.current.classList.add("modal_active");
    let orderId = evt.currentTarget.getAttribute("data");
    orderData.forEach((item) => {
      if (item.order_id === orderId) {
        thisOrder = item;
      }
    });
    setOrderData2(thisOrder);
  }

  function remModal(evt) {
    modalActive.current.classList.remove("modal_active");
  }
  function delOrder(evt) {
    let orderId = evt.currentTarget.getAttribute("data");
    let obj = {
      order_id: orderId,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("https://resback.herokuapp.com/orders", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m === "ok") {
          alert("Order successfully DELETED");
        } else {
          alert("Something went wrong!");
        }
      });
  }
  return (
    <>
      <div className="order_list">
        <ul className="navigation">
          <li>Name</li>
          <li>Time</li>
          <li>Service</li>
          <li>Read more</li>
        </ul>
        <ul className="list">
          {orderData &&
            orderData.map((item) => (
              <li key={item.order_id}>
                <ul>
                  <li>{item.owner_name}</li>
                  <li>{item.order_time}</li>
                  <li>{item.res_name}</li>
                  <li>
                    <button onClick={actModal} data={item.order_id}>
                      more
                    </button>
                  </li>
                </ul>
              </li>
            ))}
          <li></li>
        </ul>
      </div>
      <div className="modal " ref={modalActive}>
        <div className="center">
          <i className="fas fa-times" onClick={remModal}></i>
          <h2>{orderData2.res_name}</h2>
          <h1>{orderData2.owner_name}</h1>
          <span>{orderData2.owner_location}</span>
          <span>{orderData2.order_time}</span>
          <p>{orderData2.owner_tel}</p>
          <p>{orderData2.order_discription}</p>
          <h3>total: {orderData2.order_cost}</h3>
          <button onClick={delOrder} data={orderData2.order_id}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default Orders;
