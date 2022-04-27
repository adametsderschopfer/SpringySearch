import SpringySearch from "./SpringySearch";

const list = [
  {
    title: 'Abramovich',
  },
  {
    title: 'Документ',
  },
  {
    title: 'Абрамович',
  },
];

const s1 = new SpringySearch(list, ['title']);
console.log('query ->', s1.query('Дакумент').list);
