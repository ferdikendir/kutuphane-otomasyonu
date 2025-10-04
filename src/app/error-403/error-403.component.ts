import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "library-error-403",
  template: `
    <div class="error-container">
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <a routerLink="/dashboard">Go to Dashboard</a>
    </div>
  `,
  styles: `
    .error-container {
      text-align: center;
      margin-top: 50px;
    }
    h1 {
      font-size: 48px;
      color: #ff4c4c;
    }
    p {
      font-size: 24px;
      margin: 20px 0;
    }
    a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    a:hover {
      background-color: #0056b3;
    }
  `,
  standalone: true,
  imports: [
    RouterLink
  ]
})
export class Error403Component { }
