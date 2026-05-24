// Select item
const input = document.getElementById('todo-input');
const addbtn = document.getElementById('todo-btn');
const list = document.getElementById('todo-list');

// Get elements from local storage(if any)
const saved  = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved): [];

// saving current items
function saveTodo(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

// creating new node for new items
function createTodoNode(todo,index){
    const li = document.createElement('li');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener('change', ()=>{
        todo.completed = checkbox.checked;
         
        // visual feedback : strick- through when completed 
        textSpan.style.textDecoration = todo.completed?'line-through':"";
        saveTodo();
    })
    
    const textSpan  = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }

    // Add double-click event
    textSpan.addEventListener('dblclick', ()=>{
        const newText  = prompt("Edit Todo",todo.text);
        if(newText!== null){
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodo();
        }
    })

    // Delete button
    const delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.addEventListener('click', ()=>{
        todos.splice(index,1);
        render();
        saveTodo();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
  
    return li;
}


// render the items
function render(){
    list.innerHTML = "";

    todos.forEach((todo,index)=>{
        const node = createTodoNode(todo,index);
        list.appendChild(node);
    });
}


function addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }

    //Push a new Todo Object
    todos.push({text,completed: false});
    input.value = '';
    render();
    saveTodo();
}

addbtn.addEventListener('click',addTodo);
input.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        addTodo();
    }
})
render();
