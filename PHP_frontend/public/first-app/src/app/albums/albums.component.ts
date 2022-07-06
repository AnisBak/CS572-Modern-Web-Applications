import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumsDataService } from '../albums-data.service';
import { AuthenticationService } from '../authentication.service';

export class Song {
  #title!: string;
  #length!: string;

  get title() { return this.#title; }
  get length() { return this.#length; }
}
export class Album {
  #_id!: string;
  #title!: string;
  #year!: number;
  #artist!: string;
  #songs!: Song[]

  get title() { return this.#title; }
  get _id() { return this.#_id; }
  get year() { return this.#year; }
  get artist() { return this.#artist; }
  get songs() { return this.#songs; }

  constructor(id: string, title: string, year: number, artist: string) {
    this.#_id = id;
    this.#title = title;
    this.#year = year;
    this.#artist = artist;
  }

}

// class UselessFact {
//   #_id!: string;
//   #text!: string;
//   #source!: string;
//   #sourceUrl!: string;
//   #language!: string;
//   #permalink!: string;

//   get _id() { return this.#_id; }
//   get text() { return this.#text; }
//   get source() { return this.#source; }
//   get sourceUrl() { return this.#sourceUrl; }
//   get language() { return this.#language; }
//   get permalink() { return this.#permalink; }

//   constructor(id: string, title: string, source: string, sourceUrl: string, language: string, permalink: string) {
//     this.#_id = id;
//     this.#text = title;
//     this.#source = source;
//     this.#language = language;
//     this.#sourceUrl = sourceUrl;
//     this.#permalink = permalink;
//   }
// }


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  // uselessFacts!: UselessFact;

  albums: Album[] = [];
  addForm!: FormGroup;
  formBuilder!: FormBuilder;
  
  get isLoggedIn() {
    return this.authenticationSerivce.isLoggedIn;
  }

  constructor(private albumService: AlbumsDataService, private _router: Router, private authenticationSerivce: AuthenticationService) {
    this.formBuilder = new FormBuilder();
    this.addForm = this.formBuilder.group({
      title: "", year: "", artist: ""
    });
  }

  ngOnInit(): void {
    // this.albumService.getAll().subscribe((albums: Album[]) => { this.albums = albums; },(error)=> console.log(error));
    this.albumService.getAll().subscribe({
      next: (albums) => {
        this.albums = albums
      },
      error: (error) => {
        console.log("GetAlbums Error", error);
        this.albums = [];
      }

    });

  }

  onAdd(): void {
    this._router.navigate(['add']);
  }

  onEditDelete() {
    this._router.navigate(['editDelete']);
  }

  onDelete()
  {
    this._router.navigate(['delete']);

  }
  
  add(form: FormGroup): void {
    console.log("In the add method");
    // this.userService.register({ name: this.registrationForm.value.name/*.....*/ }).subscribe();//or send the whole form
    this.albumService.AddOne(form).subscribe(
      {
        next: (response) => {
          alert("Album added: "+response.title);
        },
        error: (error) => {
          console.log("Add Album Error", error);

        },
        complete: () => {
          console.log("Done");
          this.ngOnInit();
          
        }

      });
    console.log("registrationForm",/*this.registrationForm.value*/form.value);

  }

}
