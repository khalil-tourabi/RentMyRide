import Card from "./Card";

const CardGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default CardGrid;
