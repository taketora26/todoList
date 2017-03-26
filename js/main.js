(function () {
    todo.dom.newTodo.element.addEventListener('keydown', onNewTodoKeydown);
    todo.dom.todos.element.addEventListener('click', onTodosClick);
    todo.dom.todos.element.addEventListener('keydown', onTodosKeydown);
    todo.dom.todos.element.addEventListener('change', onTodosChange);

    function onNewTodoKeydown(event) {
        if (event.keyCode !== 13) {
            return; //イベントを何も処理せず抜ける
        }
        var creatingTodo = todo.dom.newTodo.getTodo();
        todo.dom.todos.add(creatingTodo);
        todo.dom.newTodo.clear();
    }

    function onTodosClick(event) {
        if (todo.dom.todos.isEditing(event.target)) {
            event.preventDefault();
            return;
        }
        //onTodosClick()は<ul>要素やその子(孫)の要素であればどの要素がクリックされた場合にも呼び出される。実際に「×」がクリックされると、クリックされた「×」ボタンの要素はevent.targetに格納される
        if (todo.dom.todos.isDeleteButton(event.target)) {
            onDeleteButtonClick(event);
        } else if (todo.dom.todos.isEditButton(event.target)) {
            onEditButtonClick(event);
        }
    }

    function onDeleteButtonClick(event) {
        if (!confirm('Do you really want to remove the todo?')) {
            return; //キャンセルを押しても何もしない
        }
        todo.dom.todos.remove(event.target);
    }

    function onEditButtonClick(event) {
        todo.dom.todos.setEditing(event.target, true); //編集可能モードにする
        todo.dom.todos.focusToEditor(event.target);   //エディタ部にカーソルを移動する
    }

    function onTodosChange(event) {
        var updatingTodo = todo.dom.todos.getTodo(event.target);
        todo.dom.todos.refresh(event.target, updatingTodo);
    }

    function onTodosKeydown(event) {
        if (!todo.dom.todos.isEditing(event.target)) {
            return;
        }
        switch (event.keyCode) {
            case 13:
                var updatingTodo = todo.dom.todos.getTodo(event.target);
                todo.dom.todos.refresh(event.target, updatingTodo);
                todo.dom.todos.setEditing(event.target, false);
                break;
            case 27:
                var backupTodo = todo.dom.todos.getBackup(event.target);
                todo.dom.todos.refresh(event.target, backupTodo);
                todo.dom.todos.setEditing(event.target, false);
                break;
        }
    }
})();