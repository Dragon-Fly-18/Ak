document.getElementById('add-task-btn').addEventListener('click', function() {
    let taskInput = document.getElementById('task-input');
    let taskText = taskInput.value.trim();

    if (taskText !== "") {
        let taskList = document.getElementById('task-list');
        
        let listItem = document.createElement('li');
        
        
        let taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        
        let completeBtn = document.createElement('button');
        completeBtn.textContent = "Complete";
        completeBtn.addEventListener('click', function() {
            taskSpan.classList.toggle('completed');
        });

        
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        
        listItem.appendChild(taskSpan);
        listItem.appendChild(completeBtn);
        listItem.appendChild(deleteBtn);

        
        taskList.appendChild(listItem);

        
        taskInput.value = "";
    }
});
