import { useRef, useState, useEffect } from "react";

function Addmeal() {
  const [resData, setResData] = useState();
  const foodName = useRef(null);
  const foodImg = useRef(null);
  const foodCost = useRef(null);
  const resId = useRef(null);
  useEffect(() => {
    fetch("https://resback.herokuapp.com/allres")
      .then((data) => data.json())
      .then((m) => {
        setResData(m);
      });
  }, []);
  function sendData(evt) {
    evt.preventDefault();
    let obj = {
      food_name: foodName.current.value,
      food_cost: foodCost.current.value,
      food_img: foodImg.current.value,
      food_res: resId.current.value,
    };
    fetch("https://resback.herokuapp.com/addfood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    })
      .then((data) => data.json())
      .then((m) => {
        if (m === "ok") {
          alert("Food is successfully ADDED");
        } else {
          alert("Something went wrong!");
        }
      });
    foodName.current.value = null;
    foodCost.current.value = null;
    foodImg.current.value = null;
  }
  return (
    <>
      <div className="add_foods">
        <form onSubmit={sendData}>
          <input type="text" placeholder="Meal name" required ref={foodName} />
          <input type="text" placeholder="Img URL" required ref={foodImg} />
          <input type="number" placeholder="Cost" required ref={foodCost} />
          <select ref={resId}>
            {resData &&
              resData.map((row) => (
                <option value={row.res_id} key={row.res_id}>
                  {row.res_name}
                </option>
              ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

export default Addmeal;
