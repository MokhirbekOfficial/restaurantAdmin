import { useRef, useState, useEffect } from "react";

function Restaurant() {
  const [resData, setResData] = useState();
  const [foodData, setFoodData] = useState();
  const foodsAct = useRef(null);
  const addRest = useRef(null);
  const resName = useRef(null);
  const resImg = useRef(null);
  useEffect(() => {
    fetch("https://resback.herokuapp.com/milliy")
      .then((data) => data.json())
      .then((m) => setResData(m));
  }, []);

  function foodsActive(evt) {
    let resId = evt.currentTarget.getAttribute("data");
    let obj = {
      res_id: resId,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("https://resback.herokuapp.com/foods", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        setFoodData(m);
      });
    foodsAct.current.classList.add("modal_foods_active");
  }
  function remFoods(evt) {
    foodsAct.current.classList.remove("modal_foods_active");
  }
  function delFood(evt) {
    let foodId = evt.currentTarget.getAttribute("data");
    let obj = {
      food_id: foodId,
    };
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    };
    fetch("https://resback.herokuapp.com/foods", requestOptions)
      .then((data) => data.json())
      .then((m) => {
        if (m === "ok") {
          alert("Food is successfully DELETED");
        } else {
          alert("Something went wrong!");
        }
      });
  }
  function actM(evt) {
    addRest.current.classList.add("add_resta");
  }
  function remM(evt) {
    addRest.current.classList.remove("add_resta");
  }
  function addRes(evt) {
    evt.preventDefault();
    let obj = {
      res_name: resName.current.value,
      res_img: resImg.current.value,
      res_category: "6c4fc00f-4b41-451b-a96e-2cbb66bf5088",
    };
    fetch("https://resback.herokuapp.com/addres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        if (m === "ok") {
          alert("Restaurant is successfully added");
        } else {
          alert("Something went wrong");
        }
      });
  }
  function delRes(evt) {
    let resId = evt.currentTarget.getAttribute("data");
    let obj = {
      res_id: resId,
    };
    fetch("https://resback.herokuapp.com/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        if (m === "ok") {
          alert("Restaurant is successfully DELETED");
        } else {
          alert("Something went wrong");
        }
      });
  }
  return (
    <>
      <div className="order_list">
        <ul className="navigation fast_food_list">
          <li>Name</li>
          <li>Delete</li>
          <li>Foods</li>
        </ul>
        <ul className="list ">
          {resData &&
            resData.map((row) => (
              <li key={row.res_id}>
                <ul className="fast_food_list">
                  <li>{row.res_name}</li>
                  <li>
                    <button
                      className="delete"
                      onClick={delRes}
                      data={row.res_id}
                    >
                      Delete
                    </button>
                  </li>
                  <li>
                    <button onClick={foodsActive} data={row.res_id}>
                      Foods
                    </button>
                  </li>
                </ul>
              </li>
            ))}
        </ul>
      </div>
      <div className="foods_modal " ref={foodsAct}>
        <button onClick={remFoods} className="backBtn">
          BACK
        </button>
        <ul>
          {foodData &&
            foodData.map((row) => (
              <li className="items" key={row.food_id}>
                <img className="foodImg" src={row.food_img} alt="foto" />
                <div className="prices">
                  <h2>{row.food_name}</h2>
                  <span>
                    {row.food_cost} so'm
                    <button
                      className="delete"
                      onClick={delFood}
                      data={row.food_id}
                    >
                      Delete
                    </button>
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="adding">
        <i className="fas fa-plus" onClick={actM}></i>
      </div>
      <div className="add_restaurant" ref={addRest}>
        <div className="center">
          <form onSubmit={addRes}>
            <i className="fas fa-times" onClick={remM}></i>
            <h1>Enter informations</h1>
            <input
              type="text"
              placeholder="Restaurant name"
              ref={resName}
              required
            />
            <input type="text" placeholder="Img URL" ref={resImg} required />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Restaurant;
