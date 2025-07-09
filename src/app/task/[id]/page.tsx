import TaskDetailsClient from './TaskPage';

export default function TaskPage({ params }: { params: { id: string } }) {
  return <TaskDetailsClient id={params.id} />;
}
