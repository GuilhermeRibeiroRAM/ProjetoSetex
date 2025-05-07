export const TOKENS = {
  // REPOSITORIES
  // Base
  CreateRepository: Symbol.for('CreateRepository'),
  UpdateRepository: Symbol.for('UpdateRepository'),
  DeleteRepository: Symbol.for('DeleteRepository'),
  GetByIdRepository: Symbol.for('GetByIdRepository'),
  GetPagedRepository: Symbol.for('GetPagedRepository'),

  // Users
  CreateUserRepository: Symbol.for('CreateUserRepository'),
  UpdateUserRepository: Symbol.for('UpdateUserRepository'),
  GetUserByEmailRepository: Symbol.for('GetUserByEmailRepository'),
  GetUserByIdRepository: Symbol.for('GetUserByIdRepository'),
  GetUserInfoByIdRepository: Symbol.for('GetUserInfoByIdRepository'),

  GetUserPagedRepository: Symbol.for('GetUserPagedRepository'),
  DeleteUserRepository: Symbol.for('DeleteUserRepository'),
  ResetPasswordRepository: Symbol.for('ResetPasswordRepository'),
  UpdatePasswordRepository: Symbol.for('UpdatePasswordRepository'),
  GetShouldUpdatePasswordRepository: Symbol.for(
    'ShouldUpdatePasswordRepository',
  ),
  // Machine
  CreateMachineRepository: Symbol.for('CreateMachineRepository'),
  UpdateMachineRepository: Symbol.for('UpdateMachineRepository'),
  GetMachineByIdRepository: Symbol.for('GetMachineByIdRepository'),
  GetMachineBySensorIdentifierRepository: Symbol.for(
    'GetMachineBySensorIdentifierRepository',
  ),
  GetMachinePagedRepository: Symbol.for('GetMachinePagedRepository'),
  GetAllMachineRepository: Symbol.for('GetAllMachineRepository'),
  DeleteMachineRepository: Symbol.for('DeleteMachineRepository'),
  GetMachineByNameRepository: Symbol.for('GetMachineByNameRepository'),
  // Sensor-Status
  CreateSensorStatusRepository: Symbol.for('CreateSensorStatusRepository'),
  UpdateSensorStatusRepository: Symbol.for('UpdateSensorStatusRepository'),
  GetSensorStatusByIdRepository: Symbol.for('GetSensorStatusByIdRepository'),
  GetLastSensorStatusByMachineIdRepository: Symbol.for(
    'GetLastSensorStatusByMachineIdRepository',
  ),
  GetSensorStatusByMachineIdRepository: Symbol.for(
    'GetSensorStatusByMachineIdRepository',
  ),
  GetSensorStatusPagedRepository: Symbol.for('GetSensorStatusPagedRepository'),
  DeleteSensorStatusRepository: Symbol.for('DeleteSensorStatusRepository'),

  // Machine-Velocity
  CreateMachineVelocityRepository: Symbol.for(
    'CreateMachineVelocityRepository',
  ),
  GetLastMachineVelocityByMachineIdRepository: Symbol.for(
    'GetLastMachineVelocityByMachineIdRepository',
  ),
  GetMachineVelocityByMachineIdRepository: Symbol.for(
    'GetMachineVelocityByMachineIdRepository',
  ),
  GetMachineVelocityPagedRepository: Symbol.for(
    'GetMachineVelocityPagedRepository',
  ),

  // Production-Order
  UpdateProductionOrderRepository: Symbol.for(
    'UpdateProductionOrderRepository',
  ),

  // SERVICES
  // Users
  CreateUserService: Symbol.for('CreateUserService'),
  UpdateUserService: Symbol.for('UpdateUserService'),
  GetUserByEmailService: Symbol.for('GetUserByEmailService'),
  GetUserByIdService: Symbol.for('GetUserByIdService'),
  GetUserInfoByIdService: Symbol.for('GetUserInfoByIdService'),

  GetUserPagedService: Symbol.for('GetUserPagedService'),
  DeleteUserService: Symbol.for('DeleteUserService'),
  ResetPasswordService: Symbol.for('ResetPasswordService'),
  UpdatePasswordService: Symbol.for('UpdatePasswordService'),
  GetShouldUpdatePasswordService: Symbol.for('ShouldUpdatePasswordService'),
  // Machine
  CreateMachineService: Symbol.for('CreateMachineService'),
  UpdateMachineService: Symbol.for('UpdateMachineService'),
  UpdateStatusMachineService: Symbol.for('UpdateStatusMachineService'),
  GetMachineByIdService: Symbol.for('GetMachineByIdService'),
  GetMachineBySensorIdentifierService: Symbol.for(
    'GetMachineBySensorIdentifierService',
  ),
  GetMachinePagedService: Symbol.for('GetMachinePagedService'),
  GetAllMachineService: Symbol.for('GetAllMachineService'),
  DeleteMachineService: Symbol.for('DeleteMachineService'),
  VerifySensorService: Symbol.for('VerifySensorService'),

  // Sensor-Status
  CreateSensorStatusService: Symbol.for('CreateSensorStatusService'),
  UpdateSensorStatusService: Symbol.for('UpdateSensorStatusService'),
  GetSensorStatusByIdService: Symbol.for('GetSensorStatusByIdService'),
  GetSensorStatusIdService: Symbol.for('GetSensorStatusByMachineIdService'),
  GetLastSensorStatusByMachineIdService: Symbol.for(
    'GetLastSensorStatusByMachineIdService',
  ),
  GetSensorStatusPagedService: Symbol.for('GetSensorStatusPagedService'),
  DeleteSensorStatusService: Symbol.for('DeleteSensorStatusService'),

  // Machine-Velocity
  CreateMachineVelocityService: Symbol.for('CreateMachineVelocityService'),
  GetMachineVelocityByMachineIdService: Symbol.for(
    'GetMachineVelocityByMachineIdService',
  ),
  GetLastMachineVelocityByMachineIdService: Symbol.for(
    'GetLastMachineVelocityByMachineIdService',
  ),
  GetMachineVelocityPagedService: Symbol.for('GetMachineVelocityPagedService'),

  // Production-Order

  UpdateProductionOrderService: Symbol.for('UpdateProductionOrderService'),

  // Others
  ExceptionsService: Symbol.for('ExceptionsService'),
  EnvironmentConfigService: Symbol.for('EnvironmentConfigService'),
  BuilderService: Symbol.for('BuilderService'),
  ZodValidationService: Symbol.for('ZodValidationService'),
  DrizzleAsyncProvider: Symbol.for('DrizzleAsyncProvider'),
  LoginService: Symbol.for('LoginService'),
  RefreshTokenService: Symbol.for('RefreshTokenService'),
  VerifyUserService: Symbol.for('VerifyUserService'),
  GenerateSensorReadings: Symbol.for('GenerateSensorReadings'),
};
