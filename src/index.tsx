import { NativeModules, Platform } from 'react-native';
import type { ZscalerSDKConfiguration } from './NativeZsdk';

const LINKING_ERROR =
  `The package 'zsdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

// @ts-expect-error
const isTurboModuleEnabled = global.__turboModuleProxy != null;

const ZsdkModule = isTurboModuleEnabled
  ? require('./NativeZsdk').default
  : NativeModules.Zsdk;

const Zsdk = ZsdkModule
  ? ZsdkModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return Zsdk.multiply(a, b);
}

export function startPreloginTunnel(
  appKey: string,
  udid: string
): Promise<Error | void> {
  return Zsdk.startPreloginTunnel(appKey, udid);
}

export function setConfiguration(
  ZscaleSDKConfiguration: ZscalerSDKConfiguration
): void {
  return Zsdk.setConfiguration(ZscaleSDKConfiguration);
}

export function status(): string {
  return Zsdk.status();
}

export function stopTunnel(): Promise<void> {
  return Zsdk.stopTunnel();
}
