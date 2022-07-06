import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.css']
})

export class StarsRatingComponent implements OnInit {
  #_rating: number = 0;
  stars = [1, 1, 1]
  @Input()
  set ratubg(rating: number) {
    this.#_rating = rating;
    this.stars = new Array<number>(rating);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
