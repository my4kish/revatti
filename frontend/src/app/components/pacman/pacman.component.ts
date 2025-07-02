import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pacman',
  imports: [CommonModule],
  templateUrl: './pacman.component.html',
  styleUrl: './pacman.component.css',
})
export class PacmanComponent implements OnInit {
  map: string[][] = [
    [
      'UL',
      'H',
      'H',
      'H',
      'H',
      'HB',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'HB',
      'H',
      'H',
      'H',
      'H',
      'UR',
    ],
    [
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      'VT',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'VT',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'UL',
      'HER',
      ' ',
      'VEB',
      ' ',
      'HEL',
      'H',
      'H',
      'H',
      'H',
      'HER',
      ' ',
      'VEB',
      ' ',
      'HEL',
      'UR',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'VEB',
      ' ',
      'HEL',
      'HER',
      ' ',
      'UL',
      'HER',
      ' ',
      ' ',
      'HEL',
      'UR',
      ' ',
      'HEL',
      'HER',
      ' ',
      'VEB',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'VET',
      ' ',
      'HEL',
      'HER',
      ' ',
      'DL',
      'H',
      'H',
      'H',
      'H',
      'DR',
      ' ',
      'HEL',
      'HER',
      ' ',
      'VET',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      'DL',
      'HER',
      ' ',
      'VET',
      ' ',
      'HEL',
      'H',
      'H',
      'H',
      'H',
      'HER',
      ' ',
      'VET',
      ' ',
      'HEL',
      'DR',
      ' ',
      'V',
    ],
    [
      'V',
      ' ',
      ' ',
      ' ',
      ' ',
      'VB',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      'VB',
      ' ',
      ' ',
      ' ',
      ' ',
      'V',
    ],
    [
      'DL',
      'H',
      'H',
      'H',
      'H',
      'HT',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'H',
      'HT',
      'H',
      'H',
      'H',
      'H',
      'DR',
    ],
  ];

  pacmanX = 1;
  pacmanY = 1;
  direction: 'left' | 'right' | 'up' | 'down' = 'right';
  food: { x: number; y: number }[] = [];
  gameWon = false;
  score = 0;

  ghosts: {
    x: number;
    y: number;
    direction: 'left' | 'right' | 'up' | 'down';
    color: string;
  }[] = [
    { x: 9, y: 3, direction: 'left', color: 'blue' },
    { x: 10, y: 3, direction: 'right', color: 'orange' },
  ];

  ngOnInit(): void {
    this.generateFood();
    setInterval(() => this.movePacman(), 300);
    setInterval(() => this.moveGhosts(), 400); // отдельный интервал для призраков
  }

  generateFood() {
    this.food = [];
    const emptySpaces: { x: number; y: number }[] = [];
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[0].length; x++) {
        if (
          this.map[y][x] === ' ' &&
          !(x === this.pacmanX && y === this.pacmanY)
        ) {
          emptySpaces.push({ x, y });
        }
      }
    }
    // Shuffle emptySpaces and pick first 4
    for (let i = emptySpaces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emptySpaces[i], emptySpaces[j]] = [emptySpaces[j], emptySpaces[i]];
    }
    this.food = emptySpaces.slice(0, 4);
  }

  getGhostColor(x: number, y: number): string {
    const ghost = this.ghosts.find((g) => g.x === x && g.y === y);
    return ghost ? ghost.color : '';
  }

  checkForGhostCollision() {
    if (this.isGhost(this.pacmanX, this.pacmanY)) {
      this.handleGhostCollision();
      this.restart();
    }
  }

  movePacman() {
    let newX = this.pacmanX;
    let newY = this.pacmanY;

    switch (this.direction) {
      case 'left':
        newX--;
        break;
      case 'right':
        newX++;
        break;
      case 'up':
        newY--;
        break;
      case 'down':
        newY++;
        break;
    }

    if (this.canMoveTo(newX, newY)) {
      this.pacmanX = newX;
      this.pacmanY = newY;
      this.checkForFood();
      this.checkForGhostCollision(); // <-- новая проверка после хода Пакмана
    }
  }

  getPacmanTransform(): string {
    const base = 'translate(-50%, -50%)';
    switch (this.direction) {
      case 'right':
        return `${base} rotate(0deg)`;
      case 'down':
        return `${base} rotate(90deg)`;
      case 'left':
        return `${base} rotate(180deg)`;
      case 'up':
        return `${base} rotate(270deg)`;
      default:
        return base;
    }
  }

  canMoveTo(x: number, y: number): boolean {
    return this.map[y] && this.map[y][x] === ' ';
  }

  checkForFood() {
    const index = this.food.findIndex(
      (f) => f.x === this.pacmanX && f.y === this.pacmanY
    );
    if (index > -1) {
      this.food.splice(index, 1);
      this.score++;
    }

    if (this.food.length === 0) {
      this.gameWon = true;
    }
  }

  restart() {
    this.pacmanX = 1;
    this.pacmanY = 1;
    this.direction = 'right';
    this.generateFood();
    this.gameWon = false;
    this.score = 0;
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        this.direction = 'left';
        break;
      case 'ArrowRight':
        this.direction = 'right';
        break;
      case 'ArrowUp':
        this.direction = 'up';
        break;
      case 'ArrowDown':
        this.direction = 'down';
        break;
    }
  }

  isPacman(x: number, y: number): boolean {
    return this.pacmanX === x && this.pacmanY === y;
  }

  isFood(x: number, y: number): boolean {
    return this.food.some((f) => f.x === x && f.y === y);
  }

  moveGhosts() {
    for (let ghost of this.ghosts) {
      const randomTurn = Math.random() < 0.3; // 30% шанс изменить направление

      if (randomTurn) {
        ghost.direction = this.getRandomDirection(ghost);
      }

      const dx =
        ghost.direction === 'left' ? -1 : ghost.direction === 'right' ? 1 : 0;
      const dy =
        ghost.direction === 'up' ? -1 : ghost.direction === 'down' ? 1 : 0;

      const newX = ghost.x + dx;
      const newY = ghost.y + dy;

      if (this.canMoveTo(newX, newY)) {
        ghost.x = newX;
        ghost.y = newY;
      } else {
        ghost.direction = this.getRandomDirection(ghost); // тупик — поворачиваем
      }

      // столкновение
      if (ghost.x === this.pacmanX && ghost.y === this.pacmanY) {
        this.handleGhostCollision();
      }
    }
  }

  getRandomDirection(ghost: {
    x: number;
    y: number;
    direction: 'left' | 'right' | 'up' | 'down';
  }): 'left' | 'right' | 'up' | 'down' {
    const directions: ('left' | 'right' | 'up' | 'down')[] = [
      'left',
      'right',
      'up',
      'down',
    ];
    const possible = directions.filter((dir) => {
      const dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
      const dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
      return this.canMoveTo(ghost.x + dx, ghost.y + dy);
    });

    if (possible.length === 0) return ghost.direction; // если застрял, пусть стоит

    return possible[Math.floor(Math.random() * possible.length)];
  }

  handleGhostCollision() {
    this.pacmanX = 1;
    this.pacmanY = 1;
  }

  isGhost(x: number, y: number): boolean {
    return this.ghosts.some((g) => g.x === x && g.y === y);
  }
}
