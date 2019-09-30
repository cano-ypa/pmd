import BundleFactory from './bundleFactory';
import * as webpack from 'webpack';

class TsBundleFactory extends BundleFactory {
  private createTsCommonConfig({ output, chunks }: { output: string; chunks: string | { [s: string]: string } }): webpack.Configuration {}

  public createCombinedConfig(): webpack.Configuration {}

  public createALaCarteConfig(): webpack.Configuration {}
}

export default TsBundleFactory;
