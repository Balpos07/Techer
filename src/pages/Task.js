import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Calendar,
  List,
  Plus,
  Trash2,
  Mail,
  Video,
  Edit2,
  Check,
  X,
  Filter
} from 'lucide-react';
import '../styles/Task.css'; // Assuming you have a CSS file for styling

export default function Task({ isSidebarOpen, isDarkMode }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete project proposal",
      dueDate: "2025-06-05",
      priority: "High",
      completed: false,
      source: "email",
      originalSource: "Email from Sarah Johnson"
    },
    {
      id: 2,
      title: "Review team presentations",
      dueDate: "2025-06-03",
      priority: "Medium",
      completed: true,
      source: "meeting",
      originalSource: "Weekly Team Meeting"
    },
    {
      id: 3,
      title: "Update documentation",
      dueDate: "2025-06-07",
      priority: "Low",
      completed: false,
      source: "email",
      originalSource: "Email from Tech Lead"
    },
    {
      id: 4,
      title: "Prepare quarterly report",
      dueDate: "2025-06-01",
      priority: "High",
      completed: false,
      source: "meeting",
      originalSource: "Management Meeting"
    },
    {
      id: 5,
      title: "Follow up with client",
      dueDate: "2025-05-30",
      priority: "Medium",
      completed: false,
      source: "email",
      originalSource: "Client Email Thread"
    }
  ]);

  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDate, setEditDate] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask,
      dueDate: newTaskDate,
      priority: "Medium",
      completed: false,
      source: "manual",
      originalSource: "Added manually"
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setNewTaskDate(new Date().toISOString().split('T')[0]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDate(task.dueDate);
  };

  const saveEdit = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask 
        ? { ...task, title: editTitle, dueDate: editDate }
        : task
    ));
    setEditingTask(null);
    setEditTitle("");
    setEditDate("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDate("");
  };

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case "today":
        return tasks.filter(task => task.dueDate === today && !task.completed);
      case "overdue":
        return tasks.filter(task => task.dueDate < today && !task.completed);
      case "completed":
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const todayTasksCount = tasks.filter(task => task.dueDate === new Date().toISOString().split('T')[0] && !task.completed).length;
  const overdueTasksCount = tasks.filter(task => task.dueDate < new Date().toISOString().split('T')[0] && !task.completed).length;

  const getSourceIcon = (source) => {
    switch (source) {
      case "email":
        return <Mail size={14} />;
      case "meeting":
        return <Video size={14} />;
      default:
        return <Plus size={14} />;
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case "email":
        return "#3b82f6";
      case "meeting":
        return "#8b5cf6";
      default:
        return "#6b7280";
    }
  };

  return (
    <>
      <main className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Task Manager</h1>
            <p className="page-description">
              Tasks generated from emails and meetings, plus manual entries
            </p>
          </div>

          <div className="task-stats">
            <div className="stat-card">
              <List size={24} />
              <div className="stat-info">
                <span className="stat-number">{tasks.length}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
            </div>
            <div className="stat-card">
              <Clock size={24} />
              <div className="stat-info">
                <span className="stat-number">
                  {tasks.filter(task => !task.completed).length}
                </span>
                <span className="stat-label">Pending</span>
              </div>
            </div>
            <div className="stat-card">
              <Calendar size={24} />
              <div className="stat-info">
                <span className="stat-number">{todayTasksCount}</span>
                <span className="stat-label">Due Today</span>
              </div>
            </div>
            <div className="stat-card">
              <CheckSquare size={24} />
              <div className="stat-info">
                <span className="stat-number">
                  {tasks.filter(task => task.completed).length}
                </span>
                <span className="stat-label">Completed</span>
              </div>
            </div>
          </div>

          <div className="task-section">
            <div className="section-header">
              <div className="filter-tabs">
                <button 
                  className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({tasks.length})
                </button>
                <button 
                  className={`filter-tab ${filter === 'today' ? 'active' : ''}`}
                  onClick={() => setFilter('today')}
                >
                  Today ({todayTasksCount})
                </button>
                <button 
                  className={`filter-tab ${filter === 'overdue' ? 'active' : ''}`}
                  onClick={() => setFilter('overdue')}
                >
                  Overdue ({overdueTasksCount})
                </button>
                <button 
                  className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed ({tasks.filter(task => task.completed).length})
                </button>
              </div>
            </div>

            <div className="add-task-form">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="task-input"
              />
              <input
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                className="date-input"
              />
              <button type="button" onClick={addTask} className="add-task-btn">
                <Plus size={20} />
                Add Task
              </button>
            </div>

            <div className="task-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <Filter size={48} />
                  <p>No tasks found for the selected filter</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div className="task-content">
                      <label className="task-label">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                        />
                        {editingTask === task.id ? (
                          <div className="edit-form">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="edit-input"
                            />
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="edit-date-input"
                            />
                          </div>
                        ) : (
                          <span className={task.completed ? 'completed' : ''}>
                            {task.title}
                          </span>
                        )}
                      </label>
                      
                      {editingTask !== task.id && (
                        <div className="task-meta">
                          <span className="due-date">
                            <Calendar size={14} />
                            {task.dueDate}
                          </span>
                          <span className="source" style={{ color: getSourceColor(task.source) }}>
                            {getSourceIcon(task.source)}
                            {task.originalSource}
                          </span>
                          <span className={`priority ${task.priority.toLowerCase()}`}>
                            {task.priority}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="task-actions">
                      {editingTask === task.id ? (
                        <>
                          <button onClick={saveEdit} className="save-btn">
                            <Check size={16} />
                          </button>
                          <button onClick={cancelEdit} className="cancel-btn">
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(task)}
                            className="edit-task"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="delete-task"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      
    </>
  );
}