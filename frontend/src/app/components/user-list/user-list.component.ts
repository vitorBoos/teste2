import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  userForm: FormGroup;
  displayModal = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  showCreateModal() {
    this.userForm.reset();
    this.displayModal = true;
  }

  save() {
    if (this.userForm.invalid) return;

    this.userService.create(this.userForm.value).subscribe(() => {
      this.loadUsers();
      this.displayModal = false;
    });
  }
}
