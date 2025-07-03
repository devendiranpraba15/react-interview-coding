interface TodoTaskProps {
  task: {
    id: string;
    content: string;
  };
  columnId: string;
  onDragStart: (event: React.DragEvent, id: string) => void;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
}

export default function TodoTask({
  task,
  columnId,
  onDragStart,
  onDrop,
  onDragOver,
}: TodoTaskProps) {
  return (
    <div
      key={task.id}
      draggable
      data-column-id={columnId}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragStart={(e) => onDragStart(e, task.id)}
      className="bg-white rounded shadow-sm min-h-[100px] p-4"
    >
      <p className="text-sm text-gray-700 break-words">{task.content}</p>
    </div>
  );
}
