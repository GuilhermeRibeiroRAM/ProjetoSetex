import { CreateSensorStatusDataModel } from '@/api/data-models/sensor-status/create.dm';
import { SensorStatusViewModel } from '@/api/view-models/sensor-status/sensor-status.vm';
import { Public } from '@/business/common/decorators/public';
import { TOKENS } from '@/business/di/tokens';
import { IPagedResult } from '@/business/dtos/common/paged-result';
import { mapper } from '@/business/mapper/mapper';
import { SensorStatusMapper } from '@/business/mapper/profile/sensor-status';
import CreateSensorStatus from '@/use-cases/sensor-status/create';
import GetSensorStatusByMachineId from '@/use-cases/sensor-status/get-by-machine-id';
import GetPagedSensorStatus from '@/use-cases/sensor-status/get-paged';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Sensor-Status')
@Controller('sensor-status')
export class SensorStatusController {
  constructor(
    @Inject(TOKENS.CreateSensorStatusService)
    private readonly createSensorStatusService: CreateSensorStatus,
    @Inject(TOKENS.GetSensorStatusPagedService)
    private readonly getSensorStatusPagedService: GetPagedSensorStatus,
    @Inject(TOKENS.GetSensorStatusByIdService)
    private readonly getSensorStatusIdService: GetSensorStatusByMachineId,
  ) {}

  @Public()
  @Post('/create/')
  @ApiBody({
    type: CreateSensorStatusDataModel,
  })
  async create(@Body() data: CreateSensorStatusDataModel): Promise<boolean> {
    const dataMapped = mapper.map(
      SensorStatusMapper.CreateSensorStatusModelToISensorStatus,
      data,
    );
    return await this.createSensorStatusService.execute(
      dataMapped,
      data.velocity,
    );
  }

  @Get('/paged/')
  async getPaged(
    @Query('currentPage') currentPage: number,
    @Query('pageSize') pageSize: number,
    @Query('sort') sort?: string,
    @Query('order') order?: string,
    @Query('search') search?: string,
  ): Promise<IPagedResult<SensorStatusViewModel>> {
    const result = await this.getSensorStatusPagedService.execute({
      currentPage,
      pageSize,
      sort,
      order,
      search,
    });

    const response = mapper.map(
      SensorStatusMapper.ISensorStatusToSensorStatusViewModel,
      result.result,
    );

    return {
      result: response,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    };
  }

  @Public()
  @Get('/get-by-machine-id/')
  async getByEmail(
    @Query('currentPage') currentPage: number,
    @Query('machineId') machineId: string,
    @Query('pageSize') pageSize: number,
    @Query('sort') sort?: string,
    @Query('order') order?: string,
  ): Promise<IPagedResult<SensorStatusViewModel>> {
    const result = await this.getSensorStatusIdService.execute(machineId, {
      currentPage,
      pageSize,
      sort,
      order,
    });

    const response = mapper.map(
      SensorStatusMapper.ISensorStatusToSensorStatusViewModel,
      result.result,
    );

    return {
      result: response,
      totalCount: result.totalCount,
      totalPages: result.totalPages,
    };
  }
}
