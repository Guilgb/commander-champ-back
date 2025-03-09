import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionsEntity } from '../entities/permissions.entity';
import { IPermission, IPermissionUpdate } from '../types/IPermissions';


@Injectable()
export class DBPermissionsService {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>,
  ) { }

  async createPermission(createPermissionDto: IPermission): Promise<PermissionsEntity> {
    const permission = this.permissionsRepository.create(createPermissionDto);
    return await this.permissionsRepository.save(permission);
  }

  async findAllPermission(): Promise<PermissionsEntity[]> {
    return await this.permissionsRepository.find();
  }

  async findOnePermission(id: number): Promise<PermissionsEntity> {
    return await this.permissionsRepository.findOne({ where: { id } });
  }

  async updatePermission(updatePermissionDto: IPermissionUpdate): Promise<PermissionsEntity> {
    const { id, } = updatePermissionDto;
    const permission = await this.permissionsRepository.findOne({ where: { id } });

    if (!permission) {
      throw new Error('Permission not found');
    }

    await this.permissionsRepository.update({ id: id }, {
      ...updatePermissionDto,
      updated_at: new Date()
    });

    const updatedPermission = await this.permissionsRepository.findOne({ where: { id } });

    return updatedPermission;
  }

  async deletePermission(id: number): Promise<void> {
    await this.permissionsRepository.delete(id);
  }
}