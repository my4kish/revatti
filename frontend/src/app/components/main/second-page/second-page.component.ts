import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-second-page',
  imports: [CommonModule, NgScrollbarModule, FormsModule, CarouselModule],
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

  selected = '';
  selectedContactMethod = '';
  myNumber = '';

  getPhone(): string {
    return `${this.selected}${this.myNumber}`;
  }

  countries = [
    { name: 'Казахстан', dialCode: '+7', flag: '🇰🇿' },
    { name: 'Россия', dialCode: '+7', flag: '🇷🇺' },
    { name: 'США', dialCode: '+1', flag: '🇺🇸' },
    { name: 'Узбекистан', dialCode: '+998', flag: '🇺🇿' },
    { name: 'Киргизия', dialCode: '+996', flag: '🇰🇬' },
    { name: 'Турция', dialCode: '+90', flag: '🇹🇷' },
  ];

  contactMethods = [
    { name: 'Telegram', value: 'telegram' },
    { name: 'Whatsapp', value: 'whatsapp' },
    { name: 'Звонок', value: 'callI' },
  ];

  onSubmit() {}

    team = [
    {
      name: 'Руслан',
      img: '/images/Ruslan.png',
      position: 'SEO / Project Manager',
      skills: ['Yandex Business','Wordstat','Google Trends','My Business'],
      label: '4/5'
    },
    {
      name: 'Ольга',
      img: '/images/Olga.png',
      position: 'UX/UI - designer',
      skills: ['Figma','Landing Design','UX/UI Design','Web Design'],
      label: '4/5'
    },
    {
      name: 'Абылай',
      img: '/images/Abylai.png',
      position: 'Backend Developer',
      skills: ['Python','FastAPI','Docker','SQL','Dart'],
      label: '4/5'
    },
    {
      name: 'Абылай',
      img: '/images/Abylai.png',
      position: 'Backend Developer',
      skills: ['Python','FastAPI','Docker','SQL','Dart'],
      label: '4/5'
    },
    {
      name: 'Абылай',
      img: '/images/Abylai.png',
      position: 'Backend Developer',
      skills: ['Python','FastAPI','Docker','SQL','Dart'],
      label: '4/5'
    },
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    margin: 16,
    autoWidth: true,
    navSpeed: 700,
    navText: ['< Назад','Далее >'],
    nav: true,
    responsive: {
      0: { items: 1 },
      740: { items: 2 },
      1024: { items: 3 }
    }
  };
}
