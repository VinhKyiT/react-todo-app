import TodoList from './components/TodoList';
import Button from '@atlaskit/button'
import Textfield from '@atlaskit/textfield'
import { useCallback, useState, useEffect } from 'react'
import { v4 } from 'uuid'
const TODO_APP_STORAGE_KEY = 'TODO_APP'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [textInput, setTextInput] = useState('');

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY)
    if (storageTodoList) {
      setTodoList(JSON.parse(storageTodoList))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList])

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, [])

  const onAddBtnClick = useCallback((e) => {
    if (textInput !== ''){
      setTodoList([{id: v4(), name: textInput, isCompleted: false}, ...todoList]);
    setTextInput('');
    }
  }, [textInput, todoList]);

  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) =>
      prevState.map(todo =>
        todo.id === id ? {...todo, isCompleted: true} : {...todo}
        )
      );
  }, [])

  const keyPress = (e) => {
    if(e.keyCode === 13){
       onAddBtnClick();
    }
  }

  return (
    <>
      <h3>Đây là danh sách cần làm</h3>
      <Textfield name='add-todo' placeholder='Thêm việc cần làm...' elemAfterInput={
        <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>Thêm</Button>
      }
      css={{padding: '2px 4px 2px'}}
      value={textInput}
      onChange={onTextInputChange}
      onKeyDown={keyPress}
      ></Textfield>
      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;
