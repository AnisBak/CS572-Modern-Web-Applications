import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsDataService } from '../albums-data.service';


export class Album {
  #_id!: string;
  #title!: string;
  #year!: number;
  #artist!: string;

  get title() { return this.#title; }
  get _id() { return this.#_id; }
  get year() { return this.#year; }
  get artist() { return this.#artist; }
  
  constructor(id: string, title: string, year: number, artist : string) {
    this.#_id = id;
    this.#title = title;
    this.#year= year;
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
  constructor( private albumService: AlbumsDataService) {
   
   }

  ngOnInit(): void {
    this.albumService.getAll().subscribe(albums => { this.albums = albums; });
    
  }

}
