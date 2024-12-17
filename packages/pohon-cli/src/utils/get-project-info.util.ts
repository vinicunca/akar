import type { Framework } from './framework.const';

export interface ProjectInfo {
  framework: Framework;
  typescript: boolean;
  tailwindConfigFile: null | string;
  tailwindCssFile: null | string;
  aliasPrefix: null | string;
}

export async function getProjectInfo(cwd: string): Promise<null | ProjectInfo> {

}
