import getConfig from './config';

export interface Role {
  console: boolean;
  iconColor: string;
  plusColor: string;
}

export async function getRole(name: string): Promise<Role> {
  const config = await getConfig();
  return config.roles[name] || config.roles.default;
}
