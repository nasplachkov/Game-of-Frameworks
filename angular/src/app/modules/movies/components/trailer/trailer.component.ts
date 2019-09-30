import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html'
})
export class TrailerComponent implements OnInit {

  private YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/';

  public safeUrl: SafeResourceUrl;
  public innerWidth: number;
  public innerHeight: number;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.YOUTUBE_EMBED_URL}${this.data.youtubeId}`);
  }
}
