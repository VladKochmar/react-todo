import { useRef, useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { filterTasks } from './utils/filterTasks';

import AddEditor from './components/AddEditor';
import EmptyState from './components/EmptyState';
import TodoFilter from './components/TodoFilter';
import TodoList from './components/TodoList';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';
import TaskEditForm from './components/TaskEditForm';
import type Task from './types/Task';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { tasks, add, edit, toggleDone, remove } = useTodos();
  const [filter, setFilter] = useState('All');
  const filteredList = filterTasks(tasks, filter);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTaskId, setModalTaskId] = useState<number | null>(null);
  const modalTask = filteredList.find(task => task.id === modalTaskId) ?? null;

  const handleEditClick = (id: number) => {
    setModalTaskId(id);
    setModalOpen(true);
  };

  const handleTaskEdit = (task: Task) => {
    edit(task);
    setModalOpen(false);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="wrapper">
      <main>
        <div className="max-w-2xl mx-auto py-12 px-4">
          <div className="shadow-card rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-colors duration-300 px-4 pt-5 pb-8">
            <div className="flex items-center justify-between not-last:mb-3">
              <div className="w-9 h-9"></div>
              <h1 className="text-2xl/loose font-bold text-center flex-1">Todo App</h1>
              <ThemeSwitcher />
            </div>
            <AddEditor onAdd={add} inputRef={inputRef} />
            <ProgressBar total={tasks.length} completed={tasks.filter(t => t.done).length} />
            {filteredList.length > 0 ? (
              <TodoList tasks={filteredList} onEdit={handleEditClick} onToggleDone={toggleDone} onRemove={remove} />
            ) : (
              <EmptyState onFocusInput={focusInput} />
            )}
            <TodoFilter filter={filter} onFilter={(filter: string) => setFilter(filter)} />
          </div>
        </div>
      </main>
      <Modal
        open={modalOpen}
        title={modalTask?.title}
        onClose={() => setModalOpen(false)}
        onTransitionEnd={() => {
          if (!modalOpen) setModalTaskId(null);
        }}>
        {modalTask && <TaskEditForm task={modalTask as Task} onEdit={handleTaskEdit} />}
      </Modal>
    </div>
  );
}

export default App;
