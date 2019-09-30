import * as webpack from 'webpack';

abstract class BundleFactory {
  public createCombined(): webpack.Configuration {
    return this.createCombinedConfig();
  }

  public createALaCarte(): webpack.Configuration {
    return this.createALaCarteConfig();
  }

  abstract createCombinedConfig(): webpack.Configuration;

  abstract createALaCarteConfig(): webpack.Configuration;
}

export default BundleFactory;
