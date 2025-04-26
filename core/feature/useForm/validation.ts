import { Ref } from 'vue'
import { FormRule } from '../../types/types'

export function createValidation<T extends object>(
  errors: Ref<Partial<Record<keyof T, string | null>>>
) {
  function validateField<K extends keyof T>(
    name: K,
    value: any,
    rules: FormRule
  ): boolean {
    // required rule
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.value[name] =
        typeof rules.required === 'string'
          ? rules.required
          : 'This field is required'
      return false
    }

    // minLength rule
    if (
      rules.minLength &&
      value &&
      value.toString().length < rules.minLength.value
    ) {
      errors.value[name] = rules.minLength.message
      return false
    }

    // maxLength rule
    if (
      rules.maxLength &&
      value &&
      value.toString().length < rules.maxLength.value
    ) {
      errors.value[name] = rules.maxLength.message
      return false
    }

    // min rule for number inputs
    if (
      rules.min &&
      value &&
      !isNaN(Number(value)) &&
      Number(value) < Number(rules.min.value)
    ) {
      errors.value[name] = rules.min.message
      return false
    }

    // max rule for number inputs
    if (
      rules.max &&
      value &&
      !isNaN(Number(value)) &&
      Number(value) > Number(rules.max.value)
    ) {
      errors.value[name] = rules.max.message
      return false
    }

    // pattern rule for regex validation
    if (
      rules.pattern &&
      value &&
      !new RegExp(rules.pattern.value.toString()).test(value.toString())
    ) {
      errors.value[name] = rules.pattern.message
      return false
    }

    return true
  }

  return {
    validateField
  }
}