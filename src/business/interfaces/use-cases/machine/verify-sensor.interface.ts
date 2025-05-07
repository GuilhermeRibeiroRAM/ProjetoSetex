export interface IVerifySensor {
  execute(sensorIdentifier: string): Promise<string | null>;
}
