
export interface ParamType {
  identifier: string;
  type: string | null;
}

export interface GraphNode {
  function: string;
  params: ParamType[];
  response_object: string;
  children: GraphNode[];
}

export interface DependencyResponse {
  dependencies: string[];
}

export interface ConfigurationType {
  flow: string;
  entities_to_mock: string[];
  is_db_mocked: boolean;
  db_config: {
    username: string;
    password: string;
  };
}
