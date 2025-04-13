import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { ModalComponent } from './modal/modal.component';

// declares ngModule components
const declarations = [
       AppComponent,
    HeaderComponent,
     UsersComponent,
     TasksComponent,
  TaskFormComponent,
     ModalComponent,
];
// declares standalone components
const imports = [
  BrowserModule, // required for all Angular apps that use NgModules
    FormsModule, // modules are now imported here instead of in the component
];

@NgModule({
     bootstrap: [AppComponent], // tells Angular which is the root component. [Typically 1]
  declarations, // register all components that work together. [Many]
       imports,
})

export class AppModule {}
