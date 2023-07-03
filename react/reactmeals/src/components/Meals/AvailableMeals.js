import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    async function loadMeals() {
      setHttpError(false);

      const mealsResponse = await fetch(
        'https://food-order-a04c2-default-rtdb.firebaseio.com/meals.json'
      );
      console.log(mealsResponse);
      if (!mealsResponse.ok) {
        throw new Error(
          `Error ${mealsResponse.status} ${mealsResponse.statusText}`
        );
      }

      // converting an object of objects to an array of objects
      const mealsObj = await mealsResponse.json();
      const mealsArr = [];
      for (const key in mealsObj) {
        mealsArr.push({
          id: key,
          name: mealsObj[key].name,
          description: mealsObj[key].description,
          price: mealsObj[key].price,
        });
      }

      setMeals(mealsArr);

      setIsLoading(false);
    }

    loadMeals()
      .then()
      .catch(error => {
        setHttpError(error.message);
        setIsLoading(false);
        alert(error.message);
      });
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <h2>Loading...</h2>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <h2>Something went wrong...</h2>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
