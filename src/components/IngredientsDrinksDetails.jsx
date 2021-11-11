function ingredientsMealDetails(details) {
  const four = 4;
  const seventeen = 17;
  const fourtySix = 46;
  const fifteen = 15;
  // ajustar posteriormente para funcao generica

  const ingredientsList = (Object.entries(details).filter((entrie, index) => {
    if (index >= seventeen && index <= fourtySix) {
      return entrie;
    }
    return null;
  }).map((ingredient, index, array) => {
    if (index < fifteen) {
      return `${ingredient[1]} - ${array[index + fifteen][1]}`;
    }
    return null;
  })
    .filter((ingredient) => (
      ingredient && ingredient.length > four && !ingredient.includes('null')
    )));
  return ingredientsList;
}

export default ingredientsMealDetails;
