import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  _rating: number = 0;
  stars: number[] = [];
  
  @Input()
  set rating(rating: number) {
    this._rating = rating;
    this.stars = new Array<number>(rating);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
