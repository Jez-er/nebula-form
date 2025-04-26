import { FormRule } from '../../types/types'

export function createRegister<T extends object>(
  values: T,
  errors: Partial<Record<keyof T, string | null>>,
  validateField: <K extends keyof T>(name: K, value: any, rules: FormRule) => boolean,
  fieldRules: Map<keyof T, FormRule>
) {
  function register<K extends keyof T>(name: K, rules?: FormRule) {
    if (rules) {
      fieldRules.set(name, rules)
    }
    
    return {
      name,
      value: (values as any)[name],
      onInput: (e: Event) => {
        const target = e.target as HTMLInputElement
        ;(values as T)[name] = target.value as any
        errors[name] = null

        if (rules) {
          validateField(name, target.value, rules)
        }
      },
      onBlur: (e: Event) => {
        const target = e.target as HTMLInputElement
        if (rules) {
          validateField(name, target.value, rules)
        }
      },
    }
  }

  return register
}