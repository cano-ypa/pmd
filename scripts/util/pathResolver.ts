import path from 'path';

class pathResolver {
  static get(p: string): string {
    return path.resolve(p);
  }

  static getFromSrc(p: string): string {
    return path.resolve('./src', p);
  }
}

export default pathResolver;
