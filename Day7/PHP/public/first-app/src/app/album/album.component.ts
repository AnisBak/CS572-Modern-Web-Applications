import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { AlbumsDataService } from '../albums-data.service';
import { Album } from '../albums/albums.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album!: Album;
  constructor(private route: ActivatedRoute, private albumService: AlbumsDataService) {
    this.album = new Album("", "", 0, "");


  }

  ngOnInit(): void {
    const albumId = this.route.snapshot.params["albumId"];    
    this.albumService.getOne(albumId).subscribe(album => {this.album = album;});
  }

}
