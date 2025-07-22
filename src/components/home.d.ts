declare module "../components/home" {
  const initScene: (loadingCallback?: () => void) => () => void;
  function animateArm(targetName: string): void;
  export { initScene as default, animateArm };
}
