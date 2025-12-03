import Link from "next/link";

type Goods = {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  created_at: string;
}

export default function ItemCard({ item }: { item: Goods }) {
  return (
		<div
			key={item.id}
			className="flex flex-col items-center bg-gray-100 rounded-lg shadow p-4 transition-transform duration-200 hover:shadow-lg hover:-translate-y-2 hover:bg-gray-200 cursor-pointer"
		>
			<div className="w-full aspect-square bg-gray-300 rounded-md mb-4 flex items-center justify-center overflow-hidden">
				<img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105" />
			</div>
			<div className="w-full text-center">
				<div className="font-medium text-lg mb-1">{item.title}</div>
				<div className="text-blue-600 font-bold text-base">
					₩{(item.price).toLocaleString()}
				</div>
			</div>
		</div>
  );
}