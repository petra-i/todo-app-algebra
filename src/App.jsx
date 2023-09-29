import React, { useState, useMemo, useCallback } from "react";
import {
	ListGroup,
	ListGroupItem,
	FormCheck,
	CloseButton,
	ToggleButton,
	ToggleButtonGroup,
} from "react-bootstrap";

import "./App.css";
import { VISIBILITY_TYPE } from "./constants";
import { getButtonVariant } from "./utils";

const { ALL, ACTIVE, COMPLETED } = VISIBILITY_TYPE;

function App() {
	const [todoList, setTodoList] = useState([]);
	const [visibilityType, setVisibilityType] = useState(ALL);

	const handleAddTodo = useCallback(
		event => {
			event.preventDefault();
			const inputValue = event.target.todo.value;
			if (!inputValue || inputValue.trim() === "") {
				alert("Molimo unesite todo");
				event.target.todo.value = "";
				return;
			}

			const newTodo = {
				id: Math.random(),
				completed: false,
				text: event.target.todo.value,
			};

			setTodoList([...todoList, newTodo]);
			event.target.todo.value = "";
		},
		[todoList]
	);

	const handleToggleTodo = useCallback(
		id => {
			const todoListCopy = [...todoList];
			const todo = todoListCopy.find(todoItem => todoItem.id === id);
			todo.completed = !todo.completed;
			setTodoList(todoListCopy);
		},
		[todoList]
	);

	const handleRemoveTodo = useCallback(
		id => {
			const newTodos = todoList.filter(todo => todo.id !== id);
			setTodoList(newTodos);
		},
		[todoList]
	);

	const getVisibleTodos = useMemo(() => {
		if (visibilityType === ACTIVE) {
			return todoList.filter(todo => !todo.completed);
		}

		if (visibilityType === COMPLETED) {
			return todoList.filter(todo => todo.completed);
		}

		return todoList;
	}, [visibilityType, todoList]);

	return (
		<div className="app">
			<h1 className="mb">My Tasks</h1>

			<ToggleButtonGroup
				type="radio"
				name="visibility"
				className="mb"
				defaultValue={ALL}
				onChange={visibility => setVisibilityType(visibility)}>
				<ToggleButton
					id={ALL}
					value={ALL}
					variant={getButtonVariant(visibilityType, ALL)}>
					{ALL}
				</ToggleButton>
				<ToggleButton
					id={ACTIVE}
					value={ACTIVE}
					variant={getButtonVariant(visibilityType, ACTIVE)}>
					{ACTIVE}
				</ToggleButton>
				<ToggleButton
					id={COMPLETED}
					value={COMPLETED}
					variant={getButtonVariant(visibilityType, COMPLETED)}>
					{COMPLETED}
				</ToggleButton>
			</ToggleButtonGroup>

			<div className="container">
				<form onSubmit={handleAddTodo}>
					<input name="todo" type="text" />
					<button type="submit">Add Todo</button>
				</form>
				{todoList.length > 0 ? (
					<div>
						<ListGroup>
							{getVisibleTodos.map(todo => (
								<ListGroupItem key={todo.id} className="todoItem-container">
									<div
										onClick={() => handleToggleTodo(todo.id)}
										className="todoItem-checkbox">
										<FormCheck
											id={todo.id}
											type="checkbox"
											checked={todo.completed}
											readOnly
										/>
										<span className="ml">{todo.text}</span>
									</div>
									<CloseButton
										className="ml"
										onClick={() => handleRemoveTodo(todo.id)}
									/>
								</ListGroupItem>
							))}
						</ListGroup>
						{todoList.some(todo => todo.completed) && (
							<div className="clear-button-container">
								<span
									onClick={() =>
										setTodoList(todoList.filter(todo => !todo.completed))
									}>
									Clear completed
								</span>
							</div>
						)}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default App;
