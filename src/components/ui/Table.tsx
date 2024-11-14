import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  cell?: (value: any) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
}

const Table = <T extends Record<string, any>>({ 
  data, 
  columns, 
  className 
}: TableProps<T>) => {
  return (
    <div className={cn('overflow-x-auto rounded-lg border border-neon-primary/20', className)}>
      <table className="min-w-full divide-y divide-neon-primary/10">
        <thead className="bg-cyber-dark-700">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.accessor)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-cyber-dark-800/50 divide-y divide-neon-primary/10">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              className="hover:bg-cyber-dark-700/50 transition-colors duration-150"
            >
              {columns.map((column) => (
                <td
                  key={String(column.accessor)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-100"
                >
                  {column.cell
                    ? column.cell(row[column.accessor])
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;