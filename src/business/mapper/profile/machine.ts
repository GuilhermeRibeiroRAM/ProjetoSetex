import { CreateMachineDataModel } from '@/api/data-models/machine/create-machine.dm';
import { MachineViewModel } from '@/api/view-models/machine/machine.vm';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import { IMachine } from '@/business/model/machine.interface';
import { MappingPair, Profile as MappingProfile } from '@dynamic-mapper/mapper';

export class MachineMapper extends MappingProfile {
  static readonly CreateMachineDataModelToIMachine = new MappingPair<
    CreateMachineDataModel,
    IMachine
  >();

  static readonly IMachineToMachineViewModel = new MappingPair<
    IMachine,
    MachineViewModel
  >();

  constructor() {
    super();

    this.createAutoMap(MachineMapper.CreateMachineDataModelToIMachine, {
      id: (opt) => opt.ignore(),
      createdAt: (opt) => opt.ignore(),
      updatedAt: (opt) => opt.ignore(),
      status: () => MachineStatusEnum.active,
      lastVelocity: (opt) => opt.ignore(),
      productionOrder: (opt) => opt.ignore(),
    });

    this.createAutoMap(MachineMapper.IMachineToMachineViewModel, {});
  }
}
