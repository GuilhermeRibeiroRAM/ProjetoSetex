import { CreateMachineDataModel } from '@/api/data-models/machine/create-machine.dm';
import { UpdateMachineDataModel } from '@/api/data-models/machine/update-machine.dm';
import { customResponse } from '@/api/utils/custom-response';
import { CustomResponseViewModel } from '@/api/view-models/common/custom-response';
import { MachineViewModel } from '@/api/view-models/machine/machine.vm';
import { Public } from '@/business/common/decorators/public';
import { TOKENS } from '@/business/di/tokens';
import { PagedQuery } from '@/business/dtos/common/paged-query';
import { MachineStatusEnum } from '@/business/enums/machine-status.enum';
import { mapper } from '@/business/mapper/mapper';
import { MachineMapper } from '@/business/mapper/profile/machine';
import CreateMachine from '@/use-cases/machine/create';
import DeleteMachine from '@/use-cases/machine/delete';
import GetMachineById from '@/use-cases/machine/get-by-id';
import GetMachineBySensorIdentifier from '@/use-cases/machine/get-by-sensor';
import GetPagedMachine from '@/use-cases/machine/get-paged';
import UpdateMachine from '@/use-cases/machine/update';
import UpdateStatusMachine from '@/use-cases/machine/update-status';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Machine')
@Controller('machine')
export class MachineController {
  constructor(
    @Inject(TOKENS.CreateMachineService)
    private readonly createMachineService: CreateMachine,
    @Inject(TOKENS.UpdateMachineService)
    private readonly updateMachineService: UpdateMachine,
    @Inject(TOKENS.UpdateStatusMachineService)
    private readonly updateStatusMachineService: UpdateStatusMachine,
    @Inject(TOKENS.DeleteMachineService)
    private readonly deleteMachineService: DeleteMachine,
    @Inject(TOKENS.GetMachineByIdService)
    private readonly getMachineByIdService: GetMachineById,
    @Inject(TOKENS.GetMachinePagedService)
    private readonly getMachinePagedService: GetPagedMachine,
    @Inject(TOKENS.GetMachineBySensorIdentifierService)
    private readonly getMachineBySensorCodeService: GetMachineBySensorIdentifier,
  ) {}

  @Public()
  @Post('/create/')
  @ApiBody({
    type: CreateMachineDataModel,
  })
  async create(
    @Body() data: CreateMachineDataModel,
  ): Promise<CustomResponseViewModel<string | null>> {
    const dataMapped = mapper.map(
      MachineMapper.CreateMachineDataModelToIMachine,
      data,
    );

    const response = await this.createMachineService.execute(dataMapped);

    return response;
  }

  @Public()
  @Put('/update/:id')
  @ApiBody({
    type: UpdateMachineDataModel,
  })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateMachineDataModel,
  ): Promise<CustomResponseViewModel<boolean | null>> {
    const response = await this.updateMachineService.execute(id, data);

    return response;
  }

  @Public()
  @Put('/enable/:id')
  async enable(@Param('id') id: string): Promise<boolean> {
    return await this.updateStatusMachineService.execute(
      id,
      MachineStatusEnum.active,
    );
  }

  @Public()
  @Put('/disable/:id')
  async disable(@Param('id') id: string): Promise<boolean> {
    return await this.updateStatusMachineService.execute(
      id,
      MachineStatusEnum.inactive,
    );
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<boolean> {
    return await this.deleteMachineService.execute(id);
  }

  @Public()
  @Get('/get-by-id/:id')
  async get(@Param('id') id: string): Promise<any> {
    const result = await this.getMachineByIdService.execute(id);

    const response = mapper.map(
      MachineMapper.IMachineToMachineViewModel,
      result,
    );

    return { data: { ...response } };
  }

  @Public()
  @Get('/paged/')
  async getPaged(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query('sort') sort?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
    @Query('columnsComparison') columnsComparison?: string,
    @Query('status') status?: MachineStatusEnum,
  ): Promise<PagedQuery<MachineViewModel>> {
    const result = await this.getMachinePagedService.execute({
      currentPage: Number(currentPage),
      pageSize: Number(pageSize),
      sort,
      order,
      search,
      status,
      columnsComparison: columnsComparison?.split(','),
    });

    const response = mapper.map(
      MachineMapper.IMachineToMachineViewModel,
      result.result,
    );

    return {
      data: {
        result: response,
        totalCount: result.totalCount,
        totalPages: result.totalPages,
      },
    };
  }

  @Public()
  @Get('/get-by-sensor/')
  async getBySensor(
    @Query('sensor') sensor: string,
  ): Promise<MachineViewModel> {
    const result = await this.getMachineBySensorCodeService.execute(sensor);

    const response = mapper.map(
      MachineMapper.IMachineToMachineViewModel,
      result,
    );

    return response;
  }
}
