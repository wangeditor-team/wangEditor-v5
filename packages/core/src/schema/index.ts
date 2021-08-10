export interface ISchema {
  match: RegExp
  rules: {
    refresh: boolean
  }
}

type ISchemaRuleKey = keyof ISchema['rules']

export const SCHEMA_LIST: ISchema[] = []

export function registerSchema(schema: ISchema) {
  SCHEMA_LIST.push(schema)
}

export function getMatchValue(type: string, property: ISchemaRuleKey) {
  const schema = SCHEMA_LIST.find(schema => schema.match.test(type))
  if (!schema) return null
  return schema.rules[property]
}
