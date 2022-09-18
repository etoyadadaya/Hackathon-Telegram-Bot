export class UpdateUserDto {
  readonly first_name: string;
  readonly middle_name: string;
  readonly last_name: string;
  readonly canManageRoles: boolean;
  readonly canManagePasses: boolean;
  readonly canFindPasses: boolean;
}