document.addEventListener('DOMContentLoaded', function () {
    const toggleThemeCheckbox = document.getElementById('toggle-theme');
    
    // Load theme state from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        toggleThemeCheckbox.checked = savedTheme === 'dark';
    } else {
        // Initial theme based on user's preference
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-mode', prefersDarkMode);
        toggleThemeCheckbox.checked = prefersDarkMode;
    }

    toggleThemeCheckbox.addEventListener('input', function () {
        document.body.classList.toggle('dark-mode', toggleThemeCheckbox.checked);
        updateThemeStyles();
        
        // Save theme state to localStorage
        const themeToSave = toggleThemeCheckbox.checked ? 'dark' : 'light';
        localStorage.setItem('theme', themeToSave);
    });

    function updateThemeStyles() {
        const isDarkMode = document.body.classList.contains('dark-mode');

        // Update individual elements' styles based on the current mode
        document.body.style.backgroundColor = isDarkMode ? '#121212' : '#f8f9fa';
        document.body.style.color = isDarkMode ? '#ffffff' : '#343a40';
        // Update other elements as needed
    }

    const form = document.querySelector('#todoForm');
    const input = document.querySelector("[name='todo']");
    const todoList = document.querySelector('#taskList');


    //side effect / life cycle
    
    const existingTodos = JSON.parse(localStorage.getItem('todos'));

    const todoData = existingTodos || [];

    todoData.forEach(todo => {
        addToDo(todo);
    });

    function addToDo(todoText) {
        todoData.push(todoText);
        const li = document.createElement('li');
        li.innerHTML = todoText;
        todoList.appendChild(li);
        localStorage.setItem('todos', JSON.stringify(todoData));
    }

    form.onsubmit = (event) => {
        event.preventDefault();
        addToDo(input.value);
        input.value = '';
    }

    // delete all 
    const clearTodosButton = document.getElementById('clear-todos');
    clearTodosButton.addEventListener('click', function () {
        // Clear the todo list
        todoList.innerHTML = '';
        
        // Clear from localStorage
        localStorage.removeItem('todos');
        
        // Update the theme styles
        updateThemeStyles();
    });



    

});
