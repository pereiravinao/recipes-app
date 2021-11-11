export function storageCocktails(pathname, ingredient, id) {
  if (pathname.includes('bebidas')) {
    let newLocalStorageDrinks;
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saveLocalStorage.cocktails[id]) {
      if (saveLocalStorage.cocktails[id].includes(ingredient)) {
        newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
          [id]: [...saveLocalStorage.cocktails[id]
            .filter((removeItem) => removeItem !== ingredient)],
        },
        meals: { ...saveLocalStorage.meals },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageDrinks));
        return ([...saveLocalStorage.cocktails[id]
          .filter((removeItem) => removeItem !== ingredient)]);
      }
      newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
        [id]: [...saveLocalStorage.cocktails[id], ingredient],
      },
      meals: { ...saveLocalStorage.meals },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageDrinks));
      return ([...saveLocalStorage.cocktails[id], ingredient]);
    }
    newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
      [id]: [ingredient],
    },
    meals: { ...saveLocalStorage.meals },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageDrinks));
    return ([ingredient]);
  }
}

export function storageMeals(pathname, ingredient, id) {
  if (pathname.includes('comidas')) {
    let newLocalStorageMeals;
    const saveLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saveLocalStorage.meals[id]) {
      if (saveLocalStorage.meals[id].includes(ingredient)) {
        newLocalStorageMeals = { meals: { ...saveLocalStorage.meals,
          [id]: [...saveLocalStorage.meals[id]
            .filter((removeItem) => removeItem !== ingredient)],
        },
        cocktails: { ...saveLocalStorage.cocktails },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageMeals));
        return ([...saveLocalStorage.meals[id]
          .filter((removeItem) => removeItem !== ingredient)]);
      }
      newLocalStorageMeals = {
        cocktails: {
          ...saveLocalStorage.cocktails,
        },
        meals: { ...saveLocalStorage.meals,
          [id]: [...saveLocalStorage.meals[id], ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageMeals));
      return ([...saveLocalStorage.meals[id], ingredient]);
    }
    newLocalStorageMeals = { cocktails: {
      ...saveLocalStorage.cocktails },
    meals: { ...saveLocalStorage.meals,
      [id]: [ingredient] } };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newLocalStorageMeals));
    return ([ingredient]);
  }
}
