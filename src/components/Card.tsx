//reusable component to show air conditions

const Card = ({title, icon, content}: any) => {
  return (
    <div className="rounded-lg shadow-md flex flex-col p-2 md:p-1 items-center">
      <h1>{title}</h1>
      <div className="flex gap-2 items-center">
        <img className="w-1/2 h-14" src={`/icons/${icon}`} alt={title} />
        <div className="w-1/2 text-xl flex justify-center items-center">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Card;
