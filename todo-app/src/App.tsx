import { useEffect, useReducer } from 'react';
import './App.css';

interface Job {
  text: string;
  isEditing: boolean;
}

interface State {
  jobs: Job[];
}

interface Action {
  type: string;
  payload?: any;
}

const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';
const START_EDIT = 'start_edit';
const SET_EDIT_TEXT = 'set_edit_text';
const APPLY_EDIT = 'apply_edit';

const reducer = (state: State, action: Action): State => {
  const jobsCopy = [...state.jobs];

  switch (action.type) {
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, { text: action.payload, isEditing: false }]
      };


    case DELETE_JOB:
      jobsCopy.splice(action.payload, 1);
      return {
        ...state,
        jobs: jobsCopy
      };

    case START_EDIT:
      return {
        ...state,
        jobs: state.jobs.map((job, i) =>
          i === action.payload
            ? { ...job, isEditing: true }
            : { ...job, isEditing: false }
        )
      };

    case SET_EDIT_TEXT:
      jobsCopy[action.payload.index].text = action.payload.text;
      return {
        ...state,
        jobs: jobsCopy
      };

    case APPLY_EDIT:
      jobsCopy[action.payload].isEditing = false;
      return {
        ...state,
        jobs: jobsCopy
      };

    default:
      return state;
  }
};

const initState: State = {
  jobs: []
};

function App() {
  useEffect(() => {
    console.log(...state.jobs)
  })
  const [state, dispatch] = useReducer(reducer, initState);
  const { jobs } = state;

  let inputText = '';

  const handleAdd = () => {
    if (inputText.trim()) {
      dispatch({ type: ADD_JOB, payload: inputText });
      inputText = '';
      (document.getElementById('main-input') as HTMLInputElement).value = '';
    }
  };

  return (
    <div className="todo-container">
      <h1 className="title">Todo App</h1>

      <div className="input-group">
        <input
          id="main-input"
          type="text"
          placeholder="Nhập việc cần làm..."
          className="task-input"
          onChange={(e) => (inputText = e.target.value)}
        />
        <button className="add-btn" onClick={handleAdd}>
          Thêm
        </button>
      </div>

      <ul className="task-list">
        {jobs.map((job, index) => (
          <li key={index} className="task-item">
            {job.isEditing ? (
              <>
                <input
                  className="task-input"
                  value={job.text}
                  onChange={(e) =>
                    dispatch({
                      type: SET_EDIT_TEXT,
                      payload: { index, text: e.target.value }
                    })
                  }
                />
                <button
                  className="add-btn"
                  onClick={() => dispatch({ type: APPLY_EDIT, payload: index })}
                >
                  Lưu
                </button>
              </>
            ) : (
              <>
                <span className="task-text">{job.text}</span>
                <div className="task-actions">
                  <button
                    className="edit-btn"
                    onClick={() => dispatch({ type: START_EDIT, payload: index })}
                  >
                    Sửa
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => dispatch({ type: DELETE_JOB, payload: index })}
                  >
                    Xoá
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
