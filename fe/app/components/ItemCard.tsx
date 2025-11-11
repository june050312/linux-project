import Link from "next/link";

export default function ItemCard({ item }: { item: number }) {
  return (
		<Link href={`/goods/${item}`}>
			<div
				key={item}
				className="flex flex-col items-center bg-gray-100 rounded-lg shadow p-4 transition-transform duration-200 hover:shadow-lg hover:-translate-y-2 hover:bg-gray-200 cursor-pointer"
			>
				<div className="w-full aspect-square bg-gray-300 rounded-md mb-4 flex items-center justify-center overflow-hidden">
					{/* 썸네일 이미지 예시 */}
					<img
						src={`https://via.placeholder.com/300?text=상품+${item}`}
						alt={`상품 ${item}`}
						className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-105"
					/>
				</div>
				<div className="w-full text-center">
					<div className="font-medium text-lg mb-1">상품 이름 {item}</div>
					<div className="text-blue-600 font-bold text-base">
						₩{(item * 10000).toLocaleString()}
					</div>
				</div>
			</div>
		</Link>
  );
}