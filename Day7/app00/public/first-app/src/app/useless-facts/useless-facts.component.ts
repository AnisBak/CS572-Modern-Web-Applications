import { Component, OnInit } from '@angular/core';
import { FactsDataService } from '../facts-data.service';


class UselessFact {
  #_id!: string;
  #text!: string;
  #source!: string;
  #sourceUrl!: string;
  #language!: string;
  #permalink!: string;

  get _id() { return this.#_id; }
  get text() { return this.#text; }
  get source() { return this.#source; }
  get sourceUrl() { return this.#sourceUrl; }
  get language() { return this.#language; }
  get permalink() { return this.#permalink; }
  
  constructor(id: string, title: string, source : string, sourceUrl:string, language:string, permalink :string) {
    this.#_id = id;
    this.#text = title;
    this.#source = source;
    this.#language = language;
    this.#sourceUrl = sourceUrl;
    this.#permalink = permalink;
  }
}


@Component({
  selector: 'app-useless-facts',
  templateUrl: './useless-facts.component.html',
  styleUrls: ['./useless-facts.component.css']
})
export class UselessFactsComponent implements OnInit {
  uselessFacts!: UselessFact;

  constructor(private factService:FactsDataService) { }

  ngOnInit(): void {
    this.factService.getFacts().subscribe(facts => { 
      this.uselessFacts = facts;
    })
  }

}
