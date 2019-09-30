import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';

class ScssBundleFactory extends BundleFactory {
  private createScssCommonConfig({ output, chunks }: { output: string; chunks: string | string[] }): webpack.Configuration {}

  public createCombinedConfig(): webpack.Configuration {}

  public createALaCarteConfig(): webpack.Configuration {}
}

export default ScssBundleFactory;
