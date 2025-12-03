export default function SearchHistoryCard({
  item,
  setSearchValue,
  onDeleteHistory
}: {
  item: { id: number, keyword: string, created_at: string, user_id: number };
  setSearchValue: (keyword: string) => void;
  onDeleteHistory: (id: number) => void;
}) {
  return (
    <li
      key={item.id}
      className="px-4 py-2 hover:bg-blue-50 flex items-center justify-between cursor-pointer text-gray-700 group"
    >
      <span
        className="flex-1"
        onMouseDown={() => setSearchValue(item.keyword)}
      >
        {item.keyword}
      </span>
      <button
        type="button"
        className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-lg px-1"
        onMouseDown={e => {
          e.stopPropagation();
          onDeleteHistory(item.id);
        }}
        aria-label="검색기록 삭제"
      >
        ×
      </button>
    </li>
  )
}