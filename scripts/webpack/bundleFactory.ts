import * as webpack from 'webpack';

interface BundleFactory {
  createCombined(): webpack.Configuration;

  createALaCarte(): webpack.Configuration;
}

export default BundleFactory;
