import TsBundleFactory from './scripts/webpack/tsBundleFactory';
import ScssBundleFactory from './scripts/webpack/scssBundleFactory';

const tsBundleFactory = new TsBundleFactory();
const scssBundleFactory = new ScssBundleFactory();

module.exports = [
  tsBundleFactory.createCombined(),
  scssBundleFactory.createCombined(),
  tsBundleFactory.createALaCarte(),
  scssBundleFactory.createALaCarte()
];
