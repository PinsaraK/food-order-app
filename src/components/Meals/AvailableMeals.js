import React, { useEffect, useState } from "react";
import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState();

  const fetchMealData = async () => {
    const result = await fetch(
      "https://react-movie-http-26180-default-rtdb.firebaseio.com/meals.json"
    );

    if (!result.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await result.json();

    const loadedMeals = [];
    for (let meal in data) {
      loadedMeals.push({ id: meal, ...data[meal] });
    }

    setMeals(loadedMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealData().catch((error) => {
      setIsLoading(false);
      setErrorState(error.message);
    });
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      >
        {meal.name}
      </MealItem>
    );
  });

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorState) {
    return (
      <section className={classes.MealsError}>
        <p>{errorState}</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
