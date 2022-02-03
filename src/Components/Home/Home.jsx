import { useRef, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Orders from "../positions/Orders";
import Farstfood from "../positions/Fastfood";
import Addmeal from "../positions/Addmeal";
import Restaurant from "../positions/Restaurant";

function Home() {
  let token = window.localStorage.getItem("token");

  const ordersHover = useRef(null);
  const fastHover = useRef(null);
  const restHover = useRef(null);
  const addHover = useRef(null);

  const [positions, setPositions] = useState("orders");
  const [adminChecker, setAdminChecker] = useState();
  useEffect(() => {
    let obj = {
      token: token,
    };
    fetch("https://resback.herokuapp.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        if (m === "true") {
          setAdminChecker("true");
        } else {
          setAdminChecker("false");
        }
      });
  }, [token]);

  function orderActive(evt) {
    setPositions("orders");
    evt.currentTarget.classList.add("hoverbcg");
    fastHover.current.classList.remove("hoverbcg");
    restHover.current.classList.remove("hoverbcg");
    addHover.current.classList.remove("hoverbcg");
  }
  function fastActive(evt) {
    setPositions("fastfood");
    evt.currentTarget.classList.add("hoverbcg");
    ordersHover.current.classList.remove("hoverbcg");
    restHover.current.classList.remove("hoverbcg");
    addHover.current.classList.remove("hoverbcg");
  }
  function resActive(evt) {
    setPositions("restaurant");
    evt.currentTarget.classList.add("hoverbcg");
    fastHover.current.classList.remove("hoverbcg");
    ordersHover.current.classList.remove("hoverbcg");
    addHover.current.classList.remove("hoverbcg");
  }

  function addMactive(evt) {
    setPositions("addmeal");
    evt.currentTarget.classList.add("hoverbcg");
    fastHover.current.classList.remove("hoverbcg");
    restHover.current.classList.remove("hoverbcg");
    ordersHover.current.classList.remove("hoverbcg");
  }
  if (adminChecker === "false") {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <section className="home">
        <div className="containerr">
          <div className="top"></div>
          <div className="main">
            <div className="navbar">
              <ul>
                <li onClick={orderActive} ref={ordersHover}>
                  <i className="fab fa-first-order"></i>Orders
                </li>
                <li onClick={fastActive} ref={fastHover}>
                  <i className="fas fa-hamburger"></i>Fast Food
                </li>
                <li onClick={resActive} ref={restHover}>
                  <i className="fas fa-utensils"></i>National restaurants
                </li>
                <li onClick={addMactive} ref={addHover}>
                  <i className="fas fa-plus"></i>Add Meal
                </li>
              </ul>
            </div>
            <div className="mainPage">
              {positions === "orders" && <Orders />}
              {positions === "fastfood" && <Farstfood />}
              {positions === "restaurant" && <Restaurant />}
              {positions === "addmeal" && <Addmeal />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
