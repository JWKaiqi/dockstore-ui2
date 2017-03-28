import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs/Rx';

import { Doc } from '../doc.model';
import { DocsService } from '../docs.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, AfterViewInit {

  private subscription: Subscription;
  private slug: string;

  selectedDoc: Doc;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private docsService: DocsService) {
  }

  getDoc(slug: string): Doc {
      return this.docsService.getDoc(slug);
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (params: any) => {
        this.slug = params['slug'];
        this.selectedDoc = this.docsService.getDoc(this.slug);

        if (!this.selectedDoc) {
          this.router.navigate(['/docs']);
        }
      }
    );
  }

  ngAfterViewInit() {
    this.activatedRoute.fragment.subscribe(anchor => {
      setTimeout(() => {
      const element = document.querySelector("#" + anchor);
              if (element) {
                element.scrollIntoView();
              }

      }, 20);
    });
  }
}

