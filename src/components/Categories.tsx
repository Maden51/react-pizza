import React from 'react';

type CategoriesProps = {
  value: number;
  onClick: (index: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые', 'Новые'];

export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onClick }) => {
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
});
