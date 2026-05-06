import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Plus, Trash2, CheckCircle, Circle, Loader2 } from 'lucide-react';
import api from '../api/client';
import type { Todo } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import Layout from '../components/Layout';

const Dashboard = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [userRes, todosRes] = await Promise.all([
        api.get('/protected'),
        api.get('/todos')
      ]);
      setUsername(userRes.data.username);
      setTodos(todosRes.data);
    } catch (err: any) {
      console.error('Failed to fetch dashboard data', err);
      setError('Failed to load tasks. Please refresh.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e: FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setAdding(true);
    try {
      const response = await api.post('/todos', { title: newTodo });
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add task.');
    } finally {
      setAdding(false);
    }
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await api.patch(`/todos/${id}?completed=${!completed}`);
      setTodos(todos.map(t => t.id === id ? response.data : t));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  if (loading) return <Layout><LoadingSpinner /></Layout>;

  return (
    <Layout username={username}>
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">My Tasks</h1>
          <p className="text-slate-500 mt-2">Manage your daily goals and stay productive</p>
        </header>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleAddTodo} className="flex gap-2 mb-8">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
            placeholder="Add a new task..."
            disabled={adding}
          />
          <button
            type="submit"
            disabled={adding || !newTodo.trim()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-200 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {adding ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            <span>Add</span>
          </button>
        </form>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400">No tasks yet. Start by adding one above!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div 
                key={todo.id}
                className={`group flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all ${
                  todo.completed ? 'border-slate-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => toggleTodo(todo.id, todo.completed)}>
                  <button className={`${todo.completed ? 'text-primary-500' : 'text-slate-300'} transition-colors`}>
                    {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </button>
                  <span className={`text-lg transition-all ${todo.completed ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                    {todo.title}
                  </span>
                </div>
                
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>

        {todos.length > 0 && (
          <div className="mt-8 text-center text-sm text-slate-400">
            {todos.filter(t => t.completed).length} of {todos.length} tasks completed
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
