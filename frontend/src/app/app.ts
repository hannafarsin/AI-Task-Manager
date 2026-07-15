import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  title = "AI Task Manager";
  message = "Welcome to my Angular application.";
  taskTitle = "";

  tasks: any[] = [];

  constructor(private taskService: TaskService,private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
  console.log("Loading tasks...");

  this.taskService.getTasks().subscribe((data: any) => {

    console.log("Received:", data);

    this.tasks = data;

    console.log("Tasks array:", this.tasks);

    this.tasks = data;
    this.cdr.detectChanges();

  });
}

  // CREATE: Add new task
  addTask() {

    const task = {
      title: this.taskTitle,
      status: "Pending"
    };

    this.taskService.addTask(task).subscribe(() => {

      // Reload tasks after adding
      this.loadTasks();

      // Clear input field
      this.taskTitle = "";

    });

  }
  editTaskId = "";
  updateTask(task: any) {

  const updatedTask = {
    title: task.title,
    status: "Completed"
  };

  this.taskService
    .updateTask(task._id, updatedTask)
    .subscribe(() => {

      this.loadTasks();

    });

}

deleteTask(id: string) {

  this.taskService.deleteTask(id)
    .subscribe(() => {

      this.loadTasks();

    });

}
  
}