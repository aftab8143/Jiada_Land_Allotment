const Table = ({ columns, data, emptyText = 'No records found.' }) => (
  <div className="w-full overflow-x-auto border border-gray-200 rounded-lg">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="bg-gray-50 text-gray-700 font-bold px-4 py-3 text-left border-b border-gray-200 whitespace-nowrap"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-8 text-gray-400"
            >
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="px-4 py-3 text-gray-700 border-b border-gray-50"
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Table;
