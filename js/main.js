(function() {
	todo.dom.newTodo.element.addEventListener('keydown',onNewTodoKeydown);

	function onNewTodoKeydown(event){
       if (event.keyCode !== 13) {
       	return; //イベントを何も処理せず抜ける
       }
		var creatingTodo = todo.dom.newTodo.getTodo();
		todo.dom.todos.add(creatingTodo);
		todo.dom.newTodo.clear();
	}
})();