import { useState } from 'react';

interface categoriesTypes{
  value: number
  onClick: Function;
}
export default function Categories({value, onClick}: categoriesTypes) {

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Новые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => onClick(index)}>
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}
