import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface Column<T> {
  key: string;
  title: string | ReactNode;
  render?: (value: any, record: T) => ReactNode;
  width?: string;
  fixed?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: string;
  onRowClick?: (record: T) => void;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  rowKey,
  onRowClick,
  className
}: TableProps<T>) {
  return (
    <div className={clsx('overflow-x-auto rounded-xl', className)}>
      <table className="w-full min-w-full">
        <thead className="bg-[#424769] sticky top-0 z-10">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  'px-4 py-3 text-left text-sm font-semibold text-[#e1e7f5]',
                  col.fixed && 'sticky left-0 bg-[#424769] z-20',
                  col.width
                )}
                style={{ width: col.width }}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={record[rowKey]}
              onClick={() => onRowClick?.(record)}
              className={clsx(
                'border-b border-[#1a1d2e] transition-colors',
                index % 2 === 0 ? 'bg-[#2d3250]' : 'bg-[#424769]',
                onRowClick && 'cursor-pointer hover:bg-[#4f7cff] hover:bg-opacity-10'
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={clsx(
                    'px-4 py-3 text-sm text-[#c4d0ed]',
                    col.fixed && 'sticky left-0 z-10',
                    col.fixed && (index % 2 === 0 ? 'bg-[#2d3250]' : 'bg-[#424769]')
                  )}
                  style={{ width: col.width }}
                >
                  {col.render ? col.render(record[col.key], record) : record[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-[#c4d0ed]">
          暂无数据
        </div>
      )}
    </div>
  );
}
