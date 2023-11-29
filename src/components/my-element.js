import { LitElement, html, css } from 'lit';


class MyElement extends LitElement {

  static styles = css`
  @font-face {
    font-family: 'Inter';
    src: url('~@/assets/fonts/Inter/Inter-VariableFont_slnt,wght.ttf') format('truetype');
  }
  .tasks-count>div>span {
    font-weight: bold;
  }
  .tasks-count {
    display: flex;
    margin: auto;
    width: 50vw;
    padding-top: 92px;
    line-height: 140%;
    margin-bottom: 24px;
  }
  .created-tasks {
    margin-right: auto;
  }
  .created-tasks-text {
    color: #4EA8DE;
    margin: 1px 8px 1px 0;
  }
  .completed-tasks {
    margin-left: auto;
  }
  .completed-tasks-text {
    color: #8284FA;
    margin: 1px 8px 1px 0;
  }
  .count-container {
    background-color: #333333;
    color: #D9D9D9;
    padding: 2px 8px;
    border-radius: 9px;
  }
  .font12 {
    font-size: 12px;
  }
  .font14 {
    font-size: 14px;
  }
  `;
  static properties = {
    todoList: []

  }

  constructor() {
    super();
    // this.todoList = todoList;
    this.todoList = this.getAttribute('todoList')
  }

  render() {
    return html` <div class="tasks-count">
    <div class="created-tasks">
      <span class="created-tasks-text font14">Tasks created</span>
      <span class="count-container font12">${this.todoList.length}</span>
    </div>
    <div class="completed-tasks">
      <span class="completed-tasks-text font14">Tasks completed</span>
      <span class="count-container font12">${this.todoList.filter((todoItem) => todoItem.checked).length ? `${this.todoList.filter((todoItem) => todoItem.checked).length} de ${this.todoList.length}` : 0}</span>
    </div>
     </div>`;
  }
}
customElements.define('my-element', MyElement);