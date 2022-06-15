import React, { useEffect, useState } from "react";
import useHttp from "../../Hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItems from "./MealItem/MealItems";

const AvailableMeals = () => {
  const [mealsData, setMealsData] = useState([]);

  const applyData = (data) => {
    let loadedMeals = [];
    for (const mealKey in data) {
      loadedMeals.push({
        id: mealKey,
        name: data[mealKey].name,
        description: data[mealKey].description,
        price: data[mealKey].price,
      });
    }
    return setMealsData(loadedMeals);
  };

  const {
    error,
    isLoading,
    sendRequest: fetchMeals,
  } = useHttp(
    {
      url: "https://food-order-app-982b9-default-rtdb.firebaseio.com/meals.json",
    },

    applyData
  );

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = mealsData.map((meal) => (
    <MealItems
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul className={classes.meals}>{mealsList}</ul>
        {isLoading && !error && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
