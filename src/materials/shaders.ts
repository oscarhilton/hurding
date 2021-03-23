export let VERTEX_SHADER: string | undefined, FRAGMENT_SHADER: string | undefined;

window.onload = () => {
  VERTEX_SHADER = document.getElementById('vertexShader')?.textContent || undefined;
  FRAGMENT_SHADER = document.getElementById('fragmentShader')?.textContent || undefined;

  console.log("LOAD!", VERTEX_SHADER, FRAGMENT_SHADER);
}