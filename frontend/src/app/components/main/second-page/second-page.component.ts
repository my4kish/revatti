import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-second-page',
  imports: [CommonModule, NgScrollbarModule],
  templateUrl: './second-page.component.html',
  styleUrl: './second-page.component.css',
})
export class SecondPageComponent {
  tabs = ['Дизайн', 'Разработка', 'SMM'];
  active = this.tabs[0];

  @ViewChildren('tabBtn') tabBtns!: QueryList<ElementRef<HTMLButtonElement>>;

  pillStyle = { left: '0px', width: '0px' };

  ngAfterViewInit() {
    this.updatePill();
    window.addEventListener('resize', () => this.updatePill());
  }

  select(tab: string) {
    this.active = tab;
    this.updatePill();
  }

  updatePill() {
    const idx = this.tabs.indexOf(this.active);
    const btn = this.tabBtns.toArray()[idx]?.nativeElement;
    if (btn) {
      this.pillStyle = {
        left: btn.offsetLeft + 'px',
        width: btn.offsetWidth + 'px',
      };
    }
  }
}
