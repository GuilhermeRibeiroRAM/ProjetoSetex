import { CreateSensorStatusDataModel } from '@/api/data-models/sensor-status/create.dm';
import { SensorStatusViewModel } from '@/api/view-models/sensor-status/sensor-status.vm';
import { ISensorStatus } from '@/business/model/sensor-status.interface';
import { MappingPair, Profile as MappingProfile } from '@dynamic-mapper/mapper';

export class SensorStatusMapper extends MappingProfile {
  static readonly CreateSensorStatusModelToISensorStatus = new MappingPair<
    CreateSensorStatusDataModel,
    ISensorStatus
  >();

  static readonly ISensorStatusToSensorStatusViewModel = new MappingPair<
    ISensorStatus,
    SensorStatusViewModel
  >();

  constructor() {
    super();

    this.createAutoMap(
      SensorStatusMapper.CreateSensorStatusModelToISensorStatus,
      {
        id: (opt) => opt.ignore(),
        machineId: (opt) => opt.ignore(),
        lastSensorCheck: (opt) => opt.ignore(),
        createdAt: (opt) => opt.ignore(),
        updatedAt: (opt) => opt.ignore(),
      },
    );

    this.createAutoMap(
      SensorStatusMapper.ISensorStatusToSensorStatusViewModel,
      {},
    );
  }
}
