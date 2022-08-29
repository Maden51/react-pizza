import ContentLoader from 'react-content-loader';

const PizzaSkeleton = (props: any) => {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}>
      <circle cx="131" cy="133" r="130" />
      <rect x="3" y="320" rx="0" ry="0" width="280" height="80" />
      <rect x="3" y="414" rx="0" ry="0" width="103" height="45" />
      <rect x="113" y="414" rx="30" ry="30" width="167" height="45" />
      <rect x="177" y="165" rx="0" ry="0" width="1" height="16" />
      <rect x="145" y="146" rx="0" ry="0" width="1" height="29" />
      <rect x="3" y="273" rx="0" ry="0" width="280" height="34" />
      <rect x="205" y="288" rx="0" ry="0" width="0" height="1" />
    </ContentLoader>
  );
};

export default PizzaSkeleton;
