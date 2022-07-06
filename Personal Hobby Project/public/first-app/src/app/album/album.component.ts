import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AlbumsDataService } from '../albums-data.service';
import { Album } from '../albums/albums.component';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album!: Album;
  addSongForm!: FormGroup;
  editSongForm!: FormGroup;
  deleteSongForm!: FormGroup;
  formBuilder!: FormBuilder;
  get isLoggedIn() {
    return this.authenticationSerivce.isLoggedIn;
  }

  constructor(private route: ActivatedRoute, private albumService: AlbumsDataService, private authenticationSerivce: AuthenticationService) {

    this.album = new Album("", "", 0, "");
    this.formBuilder = new FormBuilder();
    this.addSongForm = this.formBuilder.group({
      title: "", length: ""
    });
    this.editSongForm = this.formBuilder.group({
      id: "", title: "", length: ""
    });
    this.deleteSongForm = this.formBuilder.group({
      id: ""
    });

  }

  ngOnInit(): void {
    const albumId = this.route.snapshot.params["albumId"];
    this.albumService.getOne(albumId).subscribe(album => { this.album = album; }, (error) => console.log(error));
  }



  add(form: FormGroup): void {
    console.log("In the add method");
    this.albumService.AddOneSong(this.album._id, form).subscribe(
      {
        next: (response) => {
          alert("Song added to: " + response.title);
        },
        error: (error) => {
          console.log("Add Album Error", error);

        },
        complete: () => {
          console.log("Done");
          this.ngOnInit();

        }

      });
    console.log("registrationForm", form.value);

  }
  edit(form: FormGroup): void {
    console.log("In the edit method");
    this.albumService.updateSong(this.album._id, form).subscribe(
      {
        next: (response) => {
          alert("Song edited to: " + response.title);
        },
        error: (error) => {
          alert("Song edit Error" + error);

        },
        complete: () => {
          console.log("Done");
          this.ngOnInit();

        }

      });
    console.log("registrationForm", form.value);

  }

  delete(form: FormGroup): void {
    console.log("In the Delete method");
    this.albumService.deleteSong(this.album._id, form).subscribe(
      {
        next: (response) => {
          alert("Song Deleted to: " + response.title);
        },
        error: (error) => {
          alert("Delete Album Error" + error);

        },
        complete: () => {
          console.log("Done");
          this.ngOnInit();

        }

      });
    // console.log("registrationForm",form.value);

  }

}
