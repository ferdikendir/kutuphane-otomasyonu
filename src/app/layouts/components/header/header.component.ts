import { Component, computed } from "@angular/core";
import { user } from "@modules/core/store/user.store";

@Component({
  selector: "library-header",
  template: `
    <p>
      Welcome to the Dashboard! {{ userStore().name }}
    </p>
  `,
  styles: `
  :host {
    display: block;
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #ddd;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
  }
  `,
  standalone: true
})
export class HeaderComponent {

  userStore = computed(() => user());

}
