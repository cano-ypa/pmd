import TsBundleFactory from './scripts/webpack/tsBundleFactory';

const tsBundleFactory = new TsBundleFactory();

module.exports = [tsBundleFactory.createCombined(), tsBundleFactory.createALaCarte()];
