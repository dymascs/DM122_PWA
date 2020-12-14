const doneCssClass = 'done';
export default class HtmlService {
  constructor(carService) {
    this.carService = carService;
    this.bindFormEvent();
    this.listTasks();
  }

  bindFormEvent() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("submitted! [" + form.car.value + "] [" + form.price.value + "]");
      console.log("submitted!!");
      this.addTask(form.car.value,form.price.value,form.year.value);
      form.reset();
      form.car.focus();
    });
  }

  async addTask(car,price,year) {
    const task = {car,price,year,done: false };
    const taskId = await this.carService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
  }

  async listTasks() {
    const tasks = await this.carService.getAll();
    tasks.forEach((task) => this.addToHtmlList(task));
  }

  async deleteTask(taskId, li) {
    await this.carService.delete(taskId);
    li.remove();
  }

  async saveTask(taskId, isDone) {
    const task = await this.carService.get(taskId);
    task.done = isDone;
    await this.carService.save(task);
  }

  toggleTask(li, taskId) {
    li.classList.toggle(doneCssClass);
    const isDone = li.classList.contains(doneCssClass);
    this.saveTask(taskId, isDone);
  }

  addToHtmlList(task) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.addEventListener("click", () => this.toggleTask(li, task.id));

    if (task.done) {
      li.classList.add(doneCssClass);
    }

    span.textContent = task.car +"-> R$ "+ task.price +"-> Ano "+ task.year;
    

    button.textContent = "x";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.deleteTask(task.id, li);
    });

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
