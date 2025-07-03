import { type FC } from 'react';

interface TodoFilterProps {
  filter: string;
  onFilter: (filter: string) => void;
}

const filters = ['All', 'Active', 'Completed'];

const TodoFilter: FC<TodoFilterProps> = ({ filter, onFilter }) => {
  return (
    <ul className="flex gap-x-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {filters.map(item => {
        let itemClasses =
          'cursor-pointer text-muted dark:text-gray-400 font-medium transition-colors duration-300 hover:text-primary outline-0 relative px-2 pb-2 before:absolute before:bottom-0 before:left-0 before:w-full before:h-1 before:rounded before:bg-primary before:transition-transform before:origin-top-left before:duration-300 before:scale-x-0';

        if (filter === item) {
          itemClasses += ' active-filter-item';
        }

        return (
          <li key={item} className="first:flex-auto">
            <button onClick={() => onFilter(item)} className={itemClasses}>
              {item}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoFilter;
