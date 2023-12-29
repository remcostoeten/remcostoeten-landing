export function clsx(...inputs: (string | number | boolean | null | undefined | Record<string, any> | any[])[]): string {
  let classes = [];
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(input);
    } else if (Array.isArray(input)) {
      if (input.length) {
        let inner = clsx(...input);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (typeof input === 'object') {
      for (let key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }
  return classes.join(' ');
}

