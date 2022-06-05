import { createTodo, todos, updateTodo, deleteTodo } from "./Todo.js";
import { format } from "date-fns";
const addTodo = document.querySelector(".add-todo");

function updateMain(todoArray) {
    const todoView = document.querySelector(".main-content");
    const inboxView = document.querySelector(".inboxView");
    const todayView = document.querySelector(".todayView");
    const mainHeader = document.querySelector(".main-header");

    const formContainer = document.querySelector(".todoForm");
    mainHeader.classList.add("main-header");

    inboxView.addEventListener("click", () => {
        todoView.innerHTML = "";
        mainHeader.textContent = "Inbox";
        addTodoDom(todos);
    });

    todayView.addEventListener("click", () => {
        todoView.innerHTML = "";
        mainHeader.textContent = "Today";
    });

    addTodo.addEventListener("click", () => {
        const projectName = document.querySelector(".main-header").textContent;

        formContainer.innerHTML = addToDoForm();
        addTodo.style.display = "none";
        todoView.append(formContainer);

        const cancelForm = document.querySelector(".cancel");
        cancelForm.addEventListener("click", () => {
            formContainer.innerHTML = "";
            addTodo.style.display = "block";
        });

        const submitForm = document.querySelector(".submit");
        submitForm.addEventListener("click", () => {
            const toDoName = document.getElementById("todoName").value;
            let toDoDate = document.getElementById("dueDate").value;
            if (toDoDate) {
                toDoDate = document.getElementById("dueDate").value;
            } else {
                toDoDate = new Date();
            }
            const toDoPriority = document.getElementById("priority").value;
            const toDoDesc = document.getElementById("todoDesc").value;
            const toDoNotes = document.getElementById("todoNotes").value;

            createTodo(toDoName, toDoDate, toDoDesc, toDoNotes, toDoPriority);
            addTodoDom(todoArray);
            addTodo.style.display = "block";
        });
    });
    todoView.innerHTML = "";
    addTodoDom(todoArray);
}

function addTodoDom(todoArray) {
    const todoView = document.querySelector(".main-content");
    todoView.textContent = "";
    todoArray.forEach((element) => {
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todoItem");
        const todoCheckbox = document.createElement("input");
        todoCheckbox.setAttribute("type", "checkbox");
        const todoTitle = document.createElement("p");
        todoTitle.textContent = element.Name;
        const todoDueDate = document.createElement("p");
        todoDueDate.textContent = format(new Date(element.Due), "MM/dd/yyyy");
        const todoPriority = document.createElement("p");
        todoPriority.textContent = element.Priority;
        const todoRemove = document.createElement("p");
        todoRemove.textContent = "Remove";
        todoRemove.classList.add("removeTodo");

        todoContainer.setAttribute("data-index", element.id);

        todoContainer.append(todoCheckbox, todoTitle, todoDueDate, todoPriority, todoRemove);

        todoView.appendChild(todoContainer);
        todoContainer.after(displayTodoDetails(element));
    });

    todoView.appendChild(addTodo);

    document.querySelectorAll(".removeTodo").forEach((todo) => {
        todo.addEventListener("click", (e) => {
            const todoIndex = e.target.parentElement.getAttribute("data-index");
            console.log(todoIndex);
            removeToDoDOM(todoIndex);
        });
    });

    const todosItems = document.querySelectorAll(".todoItem");

    for (let i = 0; i < todosItems.length; i++) {
        todosItems[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "flex") {
                content.style.display = "none";
            } else {
                content.style.display = "flex";
            }
        });
    }
}

function removeToDoDOM(elementID) {
    deleteTodo(todos, parseInt(elementID));
    addTodoDom(todos);
    console.log(todos);
}

function addToDoForm() {
    const form = `
    <form action="" class="">
    <input type="text" name="todoName" id="todoName" placeholder="Title"/>
    <textarea name="todoDesc" id="todoDesc" cols="30" rows="4" placeholder="Description"></textarea>
    <textarea name="todoNotes" id="todoNotes" cols="30" rows="2" placeholder="Notes"></textarea>
    <input type="date" name="dueDate" id="dueDate" />
    <select name="priority" id="priority">
        <option value="Low">Low</option>
        <option value="Mid">Mid</option>
        <option value="High">High</option>
        <option value="&#128293;&#128293;&#128293;">&#128293;&#128293;&#128293;</option>
    </select>
    <div class="buttonContainer">
        <button class="submit" type="button">Submit</button>
        <button class="cancel" type="button">Cancel</button>
    </div>
    </form>
    `;

    return form;
}

function displayTodoDetails(todoArrayElement) {
    const selectOptions = ["Low", "Mid", "High", "🔥🔥🔥"];
    const detailContainer = document.createElement("div");
    detailContainer.innerHTML = "";
    const detailTitle = document.createElement("h3");
    const detailHeader = document.createElement("div");
    const detailEdit = document.createElement("p");
    detailEdit.textContent = "Edit";
    detailEdit.classList.add("edit");

    detailHeader.append(detailTitle, detailEdit);

    detailHeader.classList.add("details-title");

    detailContainer.append(detailHeader);

    detailTitle.textContent = "Details";
    detailContainer.classList.add("todo-details");
    for (const property in todoArrayElement) {
        let field;
        if (property == "id") {
            continue;
        } else if (property == "Desc") {
            field = document.createElement("textarea");
            field.value = todoArrayElement[property];
        } else if (property == "Due") {
            field = document.createElement("input");
            field.setAttribute("type", "date");
            let date = format(new Date(todoArrayElement[property]), "yyyy-MM-dd");
            field.value = date;
        } else if (property == "Priority") {
            field = document.createElement("select");
            for (let i = 0; i < selectOptions.length; i++) {
                let option = document.createElement("option");
                option.value = selectOptions[i];
                option.text = selectOptions[i];
                field.appendChild(option);
            }
            field.value = todoArrayElement[property];
        } else {
            field = document.createElement("input");
            field.value = todoArrayElement[property];
        }
        const label = document.createElement("label");
        label.textContent = `${property}:`;

        field.disabled = true;
        field.classList.add(property);
        detailContainer.append(label, field);
    }

    detailEdit.addEventListener("click", () => {
        editTodo(detailContainer, todoArrayElement);
    });

    return detailContainer;
}

function editTodo(detailContainer, element) {
    const detailEdit = document.querySelector(".edit");
    let list = detailContainer.children;
    let listArr = Array.from(list);

    if (detailEdit.textContent === "Save") {
        listArr.forEach((item) => (item.disabled = true));
        detailEdit.textContent = "Edit";

        const updateName = document.querySelector(".Name").value;
        const updateDue = document.querySelector(".Due").value;
        const updateDesc = document.querySelector(".Desc").value;
        const updateNotes = document.querySelector(".Notes").value;
        const updatePriority = document.querySelector(".Priority").value;

        updateTodo(element.id, todos, updateName, updateDue, updateDesc, updateNotes, updatePriority);

        console.log(todos);
        addTodoDom(todos);
    } else {
        listArr.forEach((item) => (item.disabled = false));

        detailEdit.textContent = "Save";
    }
}

export { updateMain, addTodoDom };
