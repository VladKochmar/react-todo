import { useState, type FC, type RefObject } from 'react';
import Button from './Button';

interface AddEditorProps {
  onAdd: (text: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

const AddEditor: FC<AddEditorProps> = ({ onAdd, inputRef }) => {
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (!text.trim()) {
      setIsError(true);
      return;
    }
    onAdd(text);
    setText('');
    setIsError(false);
  };

  return (
    <div className="flex flex-col gap-1 not-last:mb-3">
      <div
        className={`flex rounded-[8px] border border-gray-200 dark:border-gray-700 transition-colors duration-300 ${
          isError && 'border-red-500 dark:border-red-500'
        }`}>
        <input
          ref={inputRef}
          type="text"
          value={text}
          data-testid="task-title-input"
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task..."
          className="w-full outline-0 placeholder:text-muted dark:placeholder:text-gray-400 px-3"
        />
        <Button onClick={handleClick}>Add</Button>
      </div>
      {isError && <span className="text-red-500 text-sm">Please enter a task title</span>}
    </div>
  );
};

export default AddEditor;
