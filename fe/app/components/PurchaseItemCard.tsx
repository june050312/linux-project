import Link from "next/link";

export default function PurchaseItemCard({ order }: { order: any }) {
  return (
    <Link href={`/goods/${order.id}`}>
      <li
        key={order.id}
        className="p-3 flex justify-between items-center bg-white rounded-lg mb-3 shadow-sm"
      >
        <div>
          <span className="font-medium">{order.product}</span>
          <div className="text-sm text-gray-500">{order.date}</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{order.price}</span>
          <button
            className="px-3 py-1 bg-white text-gray-700 rounded shadow-md hover:shadow-lg hover:bg-red-100 hover:text-red-600 transition"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              alert(`구매취소: ${order.product}`);
            }}
          >
            구매취소
          </button>
        </div>
      </li>
    </Link>
  );
}