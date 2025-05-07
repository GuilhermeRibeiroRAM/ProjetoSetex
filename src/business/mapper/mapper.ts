import { MachineMapper } from '@/business/mapper/profile/machine';
import { SensorStatusMapper } from '@/business/mapper/profile/sensor-status';
import { UserMapper } from '@/business/mapper/profile/user';
import { MapperConfiguration } from '@dynamic-mapper/mapper';

const config = new MapperConfiguration((cfg) => {
  cfg.addProfile(new UserMapper());
  cfg.addProfile(new MachineMapper());
  cfg.addProfile(new SensorStatusMapper());
});

export const mapper = config.createMapper();
