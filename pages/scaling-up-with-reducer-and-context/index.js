import { useReducer, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

export default function ScalingUpWithReducerAndContext() {

    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        });
    }

    function handleChangeTask(task) {
        dispatch({
            type: 'changed',
            task: task
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId
        });
    }

    return (

        <>
            <h1>Scaling Up with Reducer and Context</h1>

            <hr />
            <h4>Combining a reducer with context </h4>

            <CopyBlock
                theme={atomOneDark}
                text={`             return (
                    <>
                      <h1>Day off in Kyoto</h1>
                      <AddTask
                        onAddTask={handleAddTask}
                      />
                      <TaskList
                        tasks={tasks}
                        onChangeTask={handleChangeTask}
                        onDeleteTask={handleDeleteTask}
                      />
                    </>
                  );
                }
`}
                language='jsx'
            />

            <br />

            TaskList.js

            <CopyBlock
                theme={atomOneDark}
                text={`             export default function TaskList({
                    tasks,
                    onChangeTask,
                    onDeleteTask
                  }) {
                    return (
                      <ul>
                        {tasks.map(task => (
                          <li key={task.id}>
                            <Task
                              task={task}
                              onChange={onChangeTask}
                              onDelete={onDeleteTask}
                            />
                          </li>
                        ))}
                      </ul>
                    );
                  }
`}
                language='jsx'
            />

            <h1>Day off in Kyoto</h1>
            <AddTask
                onAddTask={handleAddTask}
            />
            <TaskList
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />

            <h5>Step 1: Create the context</h5>

            <CopyBlock
                theme={atomOneDark}
                text={`// TaskContext.js
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);`}
                language='jsx'
            />

            <ul class="ms-6 my-3 list-disc">
                <li class="leading-relaxed mb-1"><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">TasksContext</code> provides the current list of tasks.</li>
                <li class="leading-relaxed mb-1"><code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">TasksDispatchContext</code> provides the function that lets components dispatch actions.</li>
            </ul>

            <CopyBlock
                theme={atomOneDark}
                text={`import { createContext } from 'react';

export const TasksContext = createContext(null);
export const TasksDispatchContext = createContext(null);`}
                language='jsx'
            />

            <h5>Step 2: Put state and dispatch into context </h5>

            <CopyBlock
                theme={atomOneDark}
                text={`import { TasksContext, TasksDispatchContext } from './TasksContext.js';

export default function TaskApp() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
    // ...
    return (
    <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
        ...
        </TasksDispatchContext.Provider>
    </TasksContext.Provider>
    );
}
`}
                language='jsx'
            />

            <h5>Step 3: Use context anywhere in the tree </h5>

            <CopyBlock
                theme={atomOneDark}
                text={`const tasks = useContext(TasksContext);
                
const dispatch = useContext(TasksDispatchContext);`}
                language='jsx'
            />

            <hr />
            <h4>Moving all wiring into a single file </h4>

            Declare a new TasksProvider component in the same file. This component will tie all the pieces together:

            <CopyBlock
                theme={atomOneDark}
                text={`                   // TaskContext.js
                    export function TasksProvider({ children }) {
                    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
                  
                    return (
                      <TasksContext.Provider value={tasks}>
                        <TasksDispatchContext.Provider value={dispatch}>
                          {children}
                        </TasksDispatchContext.Provider>
                      </TasksContext.Provider>
                    );}`}
                language='jsx'
            />

            <br />
            <CopyBlock
                theme={atomOneDark}
                text={`               import { TasksProvider } from './TasksContext.js';

                export default function TaskApp() {
                    return (
                      <TasksProvider>
                        <h1>Day off in Kyoto</h1>
                        <AddTask />
                        <TaskList />
                      </TasksProvider>
                    );
                  }`}
                language='jsx'
            />

            <br />
            You can also export functions that use the context from TasksContext.js:

            <CopyBlock
                theme={atomOneDark}
                text={`               export function useTasks() {
                    return useContext(TasksContext);
                }
                  
                export function useTasksDispatch() {
                    return useContext(TasksDispatchContext);
                }`}
                language='jsx'
            />
            <br />
            When a component needs to read context, it can do it through these functions:

            <CopyBlock
                theme={atomOneDark}
                text={`const tasks = useTasks();
const dispatch = useTasksDispatch();`}
                language='jsx'
            />

            <hr />
            <h4>Recap</h4>

            <ul class="ms-6 my-3 list-disc">
                <li class="leading-relaxed mb-1">You can combine reducer with context to let any component read and update state above it.</li>
                <li class="leading-relaxed mb-1">To provide state and the dispatch function to components below:
                    <ol class="ms-6 my-3 list-decimal">
                        <li class="leading-relaxed mb-1">Create two contexts (for state and for dispatch functions).</li>
                        <li class="leading-relaxed mb-1">Provide both contexts from the component that uses the reducer.</li>
                        <li class="leading-relaxed mb-1">Use either context from components that need to read them.</li>
                    </ol>
                </li>
                <li class="leading-relaxed mb-1">You can further declutter the components by moving all wiring into one file.
                    <ul class="ms-6 my-3 list-disc">
                        <li class="leading-relaxed mb-1">You can export a component like <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">TasksProvider</code> that provides context.</li>
                        <li class="leading-relaxed mb-1">You can also export custom Hooks like <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useTasks</code> and <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useTasksDispatch</code> to read it.</li>
                    </ul>
                </li>
                <li class="leading-relaxed mb-1">You can have many context-reducer pairs like this in your app.</li>
            </ul>
        </>
    )
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

let nextId = 3;
const initialTasks = [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
];

export function AddTask({ onAddTask }) {
    const [text, setText] = useState('');
    return (
        <>
            <input
                placeholder="Add task"
                value={text}
                onChange={e => setText(e.target.value)}
            />
            <button onClick={() => {
                setText('');
                onAddTask(text);
            }}>Add</button>
        </>
    )
}

export function TaskList({
    tasks,
    onChangeTask,
    onDeleteTask
}) {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    <Task
                        task={task}
                        onChange={onChangeTask}
                        onDelete={onDeleteTask}
                    />
                </li>
            ))}
        </ul>
    );
}

function Task({ task, onChange, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    let taskContent;
    if (isEditing) {
        taskContent = (
            <>
                <input
                    value={task.text}
                    onChange={e => {
                        onChange({
                            ...task,
                            text: e.target.value
                        });
                    }} />
                <button onClick={() => setIsEditing(false)}>
                    Save
                </button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>
                    Edit
                </button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={e => {
                    onChange({
                        ...task,
                        done: e.target.checked
                    });
                }}
            />
            {taskContent}
            <button onClick={() => onDelete(task.id)}>
                Delete
            </button>
        </label>
    );
}
