import { useReducer, useState } from "react";
import { CopyBlock, atomOneDark } from "react-code-blocks";

export default function ExtractingStateLogicIntoAReducer() {

    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

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
            task: task,
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId,
        });
    }

    return (

        <>
            <h1>
                Extracting State Logic into a Reducer
            </h1>

            <hr />

            <h4>Consolidate state logic with a reducer</h4>

            Reducers are a different way to handle state. You can migrate from useState to useReducer in three steps:
            <h5>Step 1: Move from setting state to dispatching actions</h5>

            <CopyBlock
                theme={atomOneDark}
                text={`function handleAddTask(text) {
    setTasks([
            ...tasks,
            {
                id: nextId++,
                text: text,
                done: false,
            },
        ]);
    }
    
    function handleChangeTask(task) {
        setTasks(
                tasks.map((t) => {
                if (t.id === task.id) {
                    return task;
                } else {
                    return t;
                }
            })
        );
    }
    
    function handleDeleteTask(taskId) {
        setTasks(tasks.filter((t) => t.id !== taskId));
    }
`}


                language='jsx'
            />

            <br />

            The object you pass to dispatch is called an “action”:

            <CopyBlock
                theme={atomOneDark}
                text={`                 function handleAddTask(text) {
                    // 'action' object
                    dispatch({
                      type: 'added',
                      id: nextId++,
                      text: text,
                    });
                  }
                  
                  function handleChangeTask(task) {
                    dispatch({
                      type: 'changed',
                      task: task,
                    });
                  }
                  
                  function handleDeleteTask(taskId) {
                    dispatch({
                      type: 'deleted',
                      id: taskId,
                    });
                  }
                `}
                language='jsx'
            />

            <h5>Step 2: Write a reducer function</h5>

            <CopyBlock
                theme={atomOneDark}
                text={`                 function tasksReducer(tasks, action) {
                    switch (action.type) {
                      case 'added': {
                        return [
                          ...tasks,
                          {
                            id: action.id,
                            text: action.text,
                            done: false,
                          },
                        ];
                      }
                      case 'changed': {
                        return tasks.map((t) => {
                          if (t.id === action.task.id) {
                            return action.task;
                          } else {
                            return t;
                          }
                        });
                      }
                      case 'deleted': {
                        return tasks.filter((t) => t.id !== action.id);
                      }
                      default: {
                        throw Error('Unknown action: ' + action.type);
                      }
                    }
                  }
`}
                language='jsx'
            />

            <h5>Step 3: Use the reducer from your component </h5>

            <CopyBlock
                theme={atomOneDark}
                text={`import { useReducer } from 'react';

const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
`}
                language='jsx'
            />

            <h1>Prague itinerary</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />

            <hr />
            <h4>Comparing useState and useReducer</h4>
            <ul>
                <li><b>Code size</b></li>
                <li>
                    <b>
                        Readability
                    </b>
                </li>
                <li>
                    <b>
                        Debugging
                    </b>
                </li>
                <li>
                    <b>
                        Testing
                    </b>
                </li>
                <li>
                    <b>
                        Personal preference
                    </b>
                </li>
            </ul >

            <hr />
            <h4>Writing reducers well </h4>
            Keep these two tips in mind when writing reducers:
            <ul>
                <li>
                    Reducers must be pure
                </li>
                <li>
                    Each action describes a single user interaction, even if that leads to multiple changes in the data
                </li>
            </ul>

            <hr />
            <h4>
                Writing concise reducers with Immer
            </h4>

            <CopyBlock
                theme={atomOneDark}
                text={`               import { useImmerReducer } from 'use-immer';
                const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

                
                function tasksReducer(draft, action) {
                  switch (action.type) {
                    case 'added': {
                      draft.push({
                        id: action.id,
                        text: action.text,
                        done: false,
                      });
                      break;
                    }
                    case 'changed': {
                      const index = draft.findIndex((t) => t.id === action.task.id);
                      draft[index] = action.task;
                      break;
                    }
                    case 'deleted': {
                      return draft.filter((t) => t.id !== action.id);
                    }
                    default: {
                      throw Error('Unknown action: ' + action.type);
                    }
                  }
                }
`}
                language='jsx'
            />

            <hr />
            <h4>
                Recap
            </h4>

            <ul class="ms-6 my-3 list-disc">
                <li class="leading-relaxed mb-1">To convert from <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useState</code> to <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useReducer</code>:
                    <ol class="ms-6 my-3 list-decimal">
                        <li class="leading-relaxed mb-1">Dispatch actions from event handlers.</li>
                        <li class="leading-relaxed mb-1">Write a reducer function that returns the next state for a given state and action.</li>
                        <li class="leading-relaxed mb-1">Replace <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useState</code> with <code dir="ltr" class="inline text-code text-secondary dark:text-secondary-dark px-1 rounded-md no-underline bg-gray-30 bg-opacity-10 py-px">useReducer</code>.</li>
                    </ol>
                </li>
                <li class="leading-relaxed mb-1">Reducers require you to write a bit more code, but they help with debugging and testing.</li>
                <li class="leading-relaxed mb-1">Reducers must be pure.</li>
                <li class="leading-relaxed mb-1">Each action describes a single user interaction.</li>
                <li class="leading-relaxed mb-1">Use Immer if you want to write reducers in a mutating style.</li>
            </ul>
        </>
    )
}


function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'changed': {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
let nextId = 3;

const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
];

export function AddTask({ onAddTask }) {
    const [text, setText] = useState('');
    return (
        <>
            <input
                placeholder="Add task"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={() => {
                    setText('');
                    onAddTask(text);
                }}>
                Add
            </button>
        </>
    );
}

export function TaskList({ tasks, onChangeTask, onDeleteTask }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
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
                    onChange={(e) => {
                        onChange({
                            ...task,
                            text: e.target.value,
                        });
                    }}
                />
                <button onClick={() => setIsEditing(false)}>Save</button>
            </>
        );
    } else {
        taskContent = (
            <>
                {task.text}
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </>
        );
    }
    return (
        <label>
            <input
                type="checkbox"
                checked={task.done}
                onChange={(e) => {
                    onChange({
                        ...task,
                        done: e.target.checked,
                    });
                }}
            />
            {taskContent}
            <button onClick={() => onDelete(task.id)}>Delete</button>
        </label>
    );
}
