export const sortByToComparator = {
  title: (obj1: { title: string }, obj2: { title: string }) =>
    obj1.title.localeCompare(obj2.title),
  price: (obj1: { price: number }, obj2: { price: number }) =>
    obj1.price - obj2.price,
};
