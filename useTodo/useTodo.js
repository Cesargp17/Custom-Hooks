import { useEffect, useReducer, useState } from "react";
import { todoReducer } from "./todoReducer";

const initial = () => {
    return JSON.parse( localStorage.getItem( 'todos') || [] )
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer( todoReducer, [], initial );

    const [allTodos, setAllTodos] = useState(0);

    const [pendingTodos, setPendingTodos] = useState(0);

    useEffect(() => {
       localStorage.setItem('todos', JSON.stringify( todos ));
     }, [todos])
    

    const handleNewTodo = (todos) => {
        dispatch({
            type: 'Add Todo',
            payload: todos,
        })
    }

    const handleDeleteTodo = (id) => {
        dispatch({
            type: 'Remove Todo',
            payload: id,
        })
    }

    const handleToggleTodo = (id) => {

         dispatch({
             type: 'Edit Todo',
             payload: id,
         })
    }

    const getAllTodos = () => {
        setAllTodos(todos.length)
    }

    const getPendingTodos = () => {
        setPendingTodos(todos.filter(todos=>!todos.done).length)
    }

    useEffect(() => {
      getAllTodos();
      getPendingTodos();
    }, [todos])
    

  return {
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todos,
    allTodos,
    pendingTodos,
  }
}
