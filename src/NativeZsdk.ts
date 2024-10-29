import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// Tried defining types in separate file, but codegen is not able to transpile it.
// Hence, defining types here.
export enum LogLevel {
  LogLevelError = 0,
  LogLevelInfo = 1,
  LogLevelDebug = 2,
}

export interface ZscalerSDKConfiguration {
  useProxyAuthentication?: boolean
  failIfDeviceCompromised?: boolean
  blockZPAConnectionsOnTunnelFailure?: boolean
  enableDebugLogsInConsole?: boolean
  // This has to be number. Setting type to LogLevel is confusing the codegen and it is converting it to string on the native side.
  logLevel?: number
}

export interface Spec extends TurboModule {
  multiply(a: number, b: number): Promise<number>;
  startPreloginTunnel(appKey: string, udid: string): Promise<Error | void>;
  setConfiguration(ZscaleSDKConfiguration: ZscalerSDKConfiguration): void;
  status() : string;
  stopTunnel(): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('Zsdk');
