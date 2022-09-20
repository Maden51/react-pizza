import style from './error.module.scss';

export const Error: React.FC = () => {
  return (
    <div className={style.root}>
      <h2>Произошла непредвиденная ошибка 😕</h2>
      <p>
        Пожалуйста обновите страницу <br /> или напишите в поддержку если проблема не решится.
      </p>
    </div>
  );
};
