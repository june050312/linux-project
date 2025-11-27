import ItemCard from "./ItemCard";

export default function Main() {
  return (
    <main className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-6 p-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
          <ItemCard key={item} item={item} />
        ))}
      </div>
    </main>
  );
}