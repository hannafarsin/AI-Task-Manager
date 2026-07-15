import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.apiUrl);
  }

  addTask(task: any) {
  return this.http.post(this.apiUrl, task);
}
updateTask(id: string, task: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      task
    );
  }
 // Delete
  deleteTask(id: string) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

}


