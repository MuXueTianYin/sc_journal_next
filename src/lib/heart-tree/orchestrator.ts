import { Tree } from './engine';
import { sleep } from './sleep';

export type AnimationCallbacks = {
  onTextStart: () => void;
  onMoveFlash: (dataUrl: string) => void;
};

export async function runHeartTreeAnimation(
  tree: Tree,
  width: number,
  height: number,
  holdRef: { current: boolean },
  callbacks: AnimationCallbacks,
) {
  const seed = tree.seed;
  const foot = tree.footer;

  // seedAnimate
  seed.draw();
  while (holdRef.current) {
    await sleep(10);
  }
  while (seed.canScale()) {
    seed.scale(0.95);
    await sleep(10);
  }
  while (seed.canMove()) {
    seed.move(0, 2);
    foot.draw();
    await sleep(10);
  }

  // growAnimate
  do {
    tree.grow();
    await sleep(10);
  } while (tree.canGrow());

  // flowAnimate
  do {
    tree.flower(2);
    await sleep(10);
  } while (tree.canFlower());

  // moveAnimate
  tree.snapshot('p1', 240, 0, 610, 680);
  while (tree.move('p1', 500, 0)) {
    foot.draw();
    await sleep(10);
  }
  foot.draw();
  tree.snapshot('p2', 500, 0, 610, 680);
  callbacks.onMoveFlash(tree.toDataURL('image/png'));
  await sleep(300);

  // textAnimate (non-blocking)
  callbacks.onTextStart();

  // jumpAnimate (infinite)
  while (true) {
    tree.ctx.clearRect(0, 0, width, height);
    tree.jump();
    foot.draw();
    await sleep(25);
  }
}
