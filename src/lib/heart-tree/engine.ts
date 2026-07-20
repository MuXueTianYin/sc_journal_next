/* eslint-disable @typescript-eslint/no-explicit-any */

export function random(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function bezier(cp: Point[], t: number) {
  const p1 = cp[0].mul((1 - t) * (1 - t));
  const p2 = cp[1].mul(2 * t * (1 - t));
  const p3 = cp[2].mul(t * t);
  return p1.add(p2).add(p3);
}

export function inheart(x: number, y: number, r: number) {
  const z =
    ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) *
      ((x / r) * (x / r) + (y / r) * (y / r) - 1) -
    (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
  return z < 0;
}

export class Point {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  clone() {
    return new Point(this.x, this.y);
  }

  add(o: Point) {
    const p = this.clone();
    p.x += o.x;
    p.y += o.y;
    return p;
  }

  sub(o: Point) {
    const p = this.clone();
    p.x -= o.x;
    p.y -= o.y;
    return p;
  }

  div(n: number) {
    const p = this.clone();
    p.x /= n;
    p.y /= n;
    return p;
  }

  mul(n: number) {
    const p = this.clone();
    p.x *= n;
    p.y *= n;
    return p;
  }
}

export class Heart {
  points: Point[];
  length: number;

  constructor() {
    const points: Point[] = [];
    for (let i = 10; i < 30; i += 0.2) {
      const t = i / Math.PI;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);
      points.push(new Point(x, y));
    }
    this.points = points;
    this.length = points.length;
  }

  get(i: number, scale?: number) {
    return this.points[i].mul(scale || 1);
  }
}

type BranchData = number[];

export class Seed {
  tree: Tree;
  heart: {
    point: Point;
    scale: number;
    color: string;
    figure: Heart;
  };
  cirle: {
    point: Point;
    scale: number;
    color: string;
    radius: number;
  };

  constructor(tree: Tree, point: Point, scale?: number, color?: string) {
    this.tree = tree;
    const s = scale || 1;
    const c = color || '#FF0000';
    this.heart = {
      point,
      scale: s,
      color: c,
      figure: new Heart(),
    };
    this.cirle = {
      point,
      scale: s,
      color: c,
      radius: 5,
    };
  }

  draw() {
    this.drawHeart();
    this.drawText();
  }

  addPosition(x: number, y: number) {
    this.cirle.point = this.cirle.point.add(new Point(x, y));
  }

  canMove() {
    return this.cirle.point.y < this.tree.height + 20;
  }

  move(x: number, y: number) {
    this.clear();
    this.drawCirle();
    this.addPosition(x, y);
  }

  canScale() {
    return this.heart.scale > 0.2;
  }

  setHeartScale(scale: number) {
    this.heart.scale *= scale;
  }

  scale(scale: number) {
    this.clear();
    this.drawCirle();
    this.drawHeart();
    this.setHeartScale(scale);
  }

  drawHeart() {
    const ctx = this.tree.ctx;
    const heart = this.heart;
    const point = heart.point;
    const color = heart.color;
    const scale = heart.scale;
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < heart.figure.length; i++) {
      const p = heart.figure.get(i, scale);
      ctx.lineTo(p.x, -p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawCirle() {
    const ctx = this.tree.ctx;
    const cirle = this.cirle;
    const point = cirle.point;
    const color = cirle.color;
    const scale = cirle.scale;
    const radius = cirle.radius;
    ctx.save();
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawText() {
    const ctx = this.tree.ctx;
    const heart = this.heart;
    const point = heart.point;
    const color = heart.color;
    const scale = heart.scale;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(point.x, point.y);
    ctx.scale(scale, scale);
    ctx.moveTo(0, 0);
    ctx.lineTo(15, 15);
    ctx.lineTo(60, 15);
    ctx.stroke();
    ctx.moveTo(0, 0);
    ctx.scale(0.75, 0.75);
    ctx.font = '12px 微软雅黑,Verdana';
    ctx.fillText('Come Baby', 23, 10);
    ctx.restore();
  }

  clear() {
    const ctx = this.tree.ctx;
    const cirle = this.cirle;
    const point = cirle.point;
    const scale = cirle.scale;
    const radius = 26;
    const w = radius * scale;
    const h = radius * scale;
    ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
  }

  hover(x: number, y: number) {
    const ctx = this.tree.ctx;
    const pixel = ctx.getImageData(x, y, 1, 1);
    return pixel.data[3] === 255;
  }
}

export class Footer {
  tree: Tree;
  point: Point;
  width: number;
  height: number;
  speed: number;
  length: number;

  constructor(tree: Tree, width: number, height: number, speed?: number) {
    this.tree = tree;
    this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
    this.width = width;
    this.height = height;
    this.speed = speed || 2;
    this.length = 0;
  }

  draw() {
    const ctx = this.tree.ctx;
    const point = this.point;
    const len = this.length / 2;
    ctx.save();
    ctx.strokeStyle = 'rgb(35, 31, 32)';
    ctx.lineWidth = this.height;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.translate(point.x, point.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len, 0);
    ctx.lineTo(-len, 0);
    ctx.stroke();
    ctx.restore();
    if (this.length < this.width) {
      this.length += this.speed;
    }
  }
}

type TreeRecord = {
  image: ImageData;
  point: Point;
  width: number;
  height: number;
  speed?: number;
};

export type TreeOptions = {
  seed?: { x?: number; y?: number; color?: string; scale?: number };
  branch?: BranchData[];
  bloom?: { num?: number; width?: number; height?: number };
  footer?: { width?: number; height?: number; speed?: number };
};

export class Tree {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  opt: TreeOptions;
  record: Record<string, TreeRecord>;
  seed!: Seed;
  footer!: Footer;
  branchs: Branch[];
  blooms: Bloom[];
  bloomsCache: Bloom[];

  constructor(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    opt?: TreeOptions,
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true })!;
    this.width = width;
    this.height = height;
    this.opt = opt || {};
    this.record = {};
    this.branchs = [];
    this.blooms = [];
    this.bloomsCache = [];
    this.initSeed();
    this.initFooter();
    this.initBranch();
    this.initBloom();
  }

  initSeed() {
    const seed = this.opt.seed || {};
    const x = seed.x ?? this.width / 2;
    const y = seed.y ?? this.height / 2;
    const point = new Point(x, y);
    const color = seed.color || '#FF0000';
    const scale = seed.scale || 1;
    this.seed = new Seed(this, point, scale, color);
  }

  initFooter() {
    const footer = this.opt.footer || {};
    const width = footer.width || this.width;
    const height = footer.height || 5;
    const speed = footer.speed || 2;
    this.footer = new Footer(this, width, height, speed);
  }

  initBranch() {
    const branchs = this.opt.branch || [];
    this.branchs = [];
    this.addBranchs(branchs);
  }

  initBloom() {
    const bloom = this.opt.bloom || {};
    const cache: Bloom[] = [];
    const num = bloom.num || 500;
    const width = bloom.width || this.width;
    const height = bloom.height || this.height;
    const figure = this.seed.heart.figure;
    const r = 240;
    for (let i = 0; i < num; i++) {
      cache.push(this.createBloom(width, height, r, figure));
    }
    this.blooms = [];
    this.bloomsCache = cache;
  }

  toDataURL(type?: string) {
    return this.canvas.toDataURL(type);
  }

  draw(k: string) {
    const rec = this.record[k];
    if (!rec) return;
    const point = rec.point;
    const image = rec.image;
    this.ctx.save();
    this.ctx.putImageData(image, point.x, point.y);
    this.ctx.restore();
  }

  addBranch(branch: Branch) {
    this.branchs.push(branch);
  }

  addBranchs(branchs: BranchData[]) {
    for (let i = 0; i < branchs.length; i++) {
      const b = branchs[i];
      const p1 = new Point(b[0], b[1]);
      const p2 = new Point(b[2], b[3]);
      const p3 = new Point(b[4], b[5]);
      const r = b[6];
      const l = b[7];
      const c = b[8] as BranchData[];
      this.addBranch(new Branch(this, p1, p2, p3, r, l, c));
    }
  }

  removeBranch(branch: Branch) {
    const branchs = this.branchs;
    for (let i = 0; i < branchs.length; i++) {
      if (branchs[i] === branch) {
        branchs.splice(i, 1);
      }
    }
  }

  canGrow() {
    return !!this.branchs.length;
  }

  grow() {
    const branchs = this.branchs;
    for (let i = 0; i < branchs.length; i++) {
      const branch = branchs[i];
      if (branch) {
        branch.grow();
      }
    }
  }

  addBloom(bloom: Bloom) {
    this.blooms.push(bloom);
  }

  removeBloom(bloom: Bloom) {
    const blooms = this.blooms;
    for (let i = 0; i < blooms.length; i++) {
      if (blooms[i] === bloom) {
        blooms.splice(i, 1);
      }
    }
  }

  createBloom(
    width: number,
    height: number,
    radius: number,
    figure: Heart,
    color?: string,
    alpha?: number,
    angle?: number,
    scale?: number,
    place?: Point,
    speed?: number,
  ) {
    while (true) {
      const x = random(20, width - 20);
      const y = random(20, height - 20);
      if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {
        return new Bloom(
          this,
          new Point(x, y),
          figure,
          color,
          alpha,
          angle,
          scale,
          place,
          speed,
        );
      }
    }
  }

  canFlower() {
    return !!this.blooms.length;
  }

  flower(num: number) {
    const blooms = this.bloomsCache.splice(0, num);
    for (let i = 0; i < blooms.length; i++) {
      this.addBloom(blooms[i]);
    }
    const active = this.blooms;
    for (let j = 0; j < active.length; j++) {
      active[j].flower();
    }
  }

  snapshot(k: string, x: number, y: number, width: number, height: number) {
    const image = this.ctx.getImageData(x, y, width, height);
    this.record[k] = {
      image,
      point: new Point(x, y),
      width,
      height,
    };
  }

  setSpeed(k: string, speed: number) {
    const key = k || 'move';
    if (this.record[key]) {
      this.record[key].speed = speed;
    }
  }

  move(k: string, x: number, y: number) {
    const rec = this.record[k || 'move'];
    if (!rec) return false;
    const point = rec.point;
    const image = rec.image;
    let speed = rec.speed || 10;
    const width = rec.width;
    const height = rec.height;
    const i = point.x + speed < x ? point.x + speed : x;
    const j = point.y + speed < y ? point.y + speed : y;
    this.ctx.save();
    this.ctx.clearRect(point.x, point.y, width, height);
    this.ctx.putImageData(image, i, j);
    this.ctx.restore();
    rec.point = new Point(i, j);
    speed *= 0.95;
    if (speed < 2) speed = 2;
    rec.speed = speed;
    return i < x || j < y;
  }

  jump() {
    const blooms = this.blooms;
    if (blooms.length) {
      for (let i = 0; i < blooms.length; i++) {
        blooms[i].jump();
      }
    }
    if ((blooms.length && blooms.length < 3) || !blooms.length) {
      const bloom = this.opt.bloom || {};
      const width = bloom.width || this.width;
      const height = bloom.height || this.height;
      const figure = this.seed.heart.figure;
      const r = 240;
      for (let i = 0; i < random(1, 2); i++) {
        blooms.push(
          this.createBloom(
            width / 2 + width,
            height,
            r,
            figure,
            undefined,
            1,
            undefined,
            1,
            new Point(random(-100, 600), 720),
            random(200, 300),
          ),
        );
      }
    }
  }
}

export class Branch {
  tree: Tree;
  point1: Point;
  point2: Point;
  point3: Point;
  radius: number;
  length: number;
  len: number;
  t: number;
  branchs: BranchData[];

  constructor(
    tree: Tree,
    point1: Point,
    point2: Point,
    point3: Point,
    radius: number,
    length: number,
    branchs?: BranchData[],
  ) {
    this.tree = tree;
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;
    this.radius = radius;
    this.length = length || 100;
    this.len = 0;
    this.t = 1 / (this.length - 1);
    this.branchs = branchs || [];
  }

  grow() {
    if (this.len <= this.length) {
      const p = bezier([this.point1, this.point2, this.point3], this.len * this.t);
      this.draw(p);
      this.len += 1;
      this.radius *= 0.97;
    } else {
      this.tree.removeBranch(this);
      this.tree.addBranchs(this.branchs);
    }
  }

  draw(p: Point) {
    const ctx = this.tree.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgb(35, 31, 32)';
    ctx.shadowColor = 'rgb(35, 31, 32)';
    ctx.shadowBlur = 2;
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export class Bloom {
  tree: Tree;
  point: Point;
  color: string;
  alpha: number;
  angle: number;
  scale: number;
  place?: Point;
  speed?: number;
  figure: Heart;

  constructor(
    tree: Tree,
    point: Point,
    figure: Heart,
    color?: string,
    alpha?: number,
    angle?: number,
    scale?: number,
    place?: Point,
    speed?: number,
  ) {
    this.tree = tree;
    this.point = point;
    this.color =
      color || `rgb(255,${random(0, 255)},${random(0, 255)})`;
    this.alpha = alpha ?? random(0.3, 1);
    this.angle = angle ?? random(0, 360);
    this.scale = scale ?? 0.1;
    this.place = place;
    this.speed = speed;
    this.figure = figure;
  }

  flower() {
    this.draw();
    this.scale += 0.1;
    if (this.scale > 1) {
      this.tree.removeBloom(this);
    }
  }

  draw() {
    const ctx = this.tree.ctx;
    const figure = this.figure;
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.point.x, this.point.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 0; i < figure.length; i++) {
      const p = figure.get(i);
      ctx.lineTo(p.x, -p.y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  jump() {
    const height = this.tree.height;
    if (this.point.x < -20 || this.point.y > height + 20) {
      this.tree.removeBloom(this);
    } else if (this.place && this.speed) {
      this.draw();
      this.point = this.place.sub(this.point).div(this.speed).add(this.point);
      this.angle += 0.05;
      this.speed -= 1;
    }
  }
}
