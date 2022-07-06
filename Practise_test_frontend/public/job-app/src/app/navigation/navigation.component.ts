import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  onHome(): void {
    this._router.navigate([""]);
  }
  onJobs(): void {
    this._router.navigate(["jobs"]);
  }
  onAdd(): void {
    this._router.navigate(['create']);
  }
  onEdit() {
    this._router.navigate(['edit']);
  }
  onDelete() {
    this._router.navigate(['delete']);
  }
  onSearch() {
    this._router.navigate(['search'])
  }

}
