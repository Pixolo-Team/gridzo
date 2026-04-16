export type UpdateStructureRequestData = {
  json_code: Record<string, unknown>;
  php_code?: string;
};

export type UpdateStructureResponseData = {
  structure_version_id: string;
  version: string;
  is_current: boolean;
};
