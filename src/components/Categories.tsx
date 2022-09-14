type CategoriesProps = {
  value: number;
  onClick: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, onClick }) => {
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
};

export default Categories;
