import getConfig from './config';

export interface Role {
  console: boolean;
  iconColor: number;
  plusColor: number;
  permissions: string[];
}

export async function getRole(
  name: string
): Promise<{ default: boolean; role: Role }> {
  const config = await getConfig();
  return (
    {
      default: name === 'default',
      role: {
        ...config.roles[name],
        // @ts-ignore
        iconColor: parseInt(config.roles[name].iconColor),
        // @ts-ignore
        plusColor: parseInt(config.roles[name].plusColor),
      },
    } || {
      default: true,
      role: config.roles.default,
    }
  );
}
