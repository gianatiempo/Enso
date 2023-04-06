import { type Reducer, useCallback, useMemo, useReducer } from 'react'
import isEqual from 'react-fast-compare'

enum Kind {
  init,
  reset,
  setValue,
  setValues,
  deleteField,
  deleteFields,
}

type OptionalPropertyOf<T extends object> = Exclude<
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K
  }[keyof T],
  undefined
>

type TAction<T extends object> =
  | { type: Kind.init; initialValues: T; currentValues?: T }
  | { type: Kind.reset }
  | { [k in keyof T]: { type: Kind.setValue; field: k; value: T[k] } }[keyof T]
  | { type: Kind.setValues; values: Partial<T> | ((values: T) => T) }
  | { type: Kind.deleteField; field: OptionalPropertyOf<T> }
  | { type: Kind.deleteFields; fields: Array<OptionalPropertyOf<T>> }

type TReducerState<T> = {
  initialValues: T
  currentValues: T
}

function reducer<T extends object>(state: TReducerState<T>, action: TAction<T>): TReducerState<T> {
  switch (action.type) {
    case Kind.init:
      return {
        initialValues: { ...action.initialValues },
        currentValues: action.currentValues != null ? { ...action.currentValues } : { ...action.initialValues },
      }
    case Kind.reset:
      return {
        initialValues: state.initialValues,
        currentValues: state.initialValues,
      }
    case Kind.setValue:
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          [action.field as string]: action.value,
        },
      }
    case Kind.setValues: {
      const values = typeof action.values === 'function' ? action.values(state.currentValues) : action.values
      return {
        ...state,
        currentValues: {
          ...state.currentValues,
          ...values,
        },
      }
    }
    case Kind.deleteField: {
      const newValues = { ...state.currentValues }
      delete newValues[action.field]
      return {
        ...state,
        currentValues: newValues,
      }
    }
    case Kind.deleteFields: {
      const newValues = { ...state.currentValues }
      for (const field of action.fields) {
        delete newValues[field]
      }
      return {
        ...state,
        currentValues: newValues,
      }
    }
    default:
      return state
  }
}

export default function useForm<T extends object>(initialValues: T, currentValues?: T) {
  const [state, dispatch] = useReducer<Reducer<TReducerState<T>, TAction<T>>>(reducer, {
    initialValues: { ...initialValues },
    currentValues: currentValues != null ? { ...currentValues } : { ...initialValues },
  })

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    dispatch({ type: Kind.setValue, field, value } as TAction<T>)
  }, [])

  const setValues = useCallback((values: Partial<T> | ((values: T) => T)) => {
    dispatch({ type: Kind.setValues, values })
  }, [])

  const deleteField = useCallback((field: OptionalPropertyOf<T>) => {
    dispatch({ type: Kind.deleteField, field })
  }, [])

  const deleteFields = useCallback((fields: Array<OptionalPropertyOf<T>>) => {
    dispatch({ type: Kind.deleteFields, fields })
  }, [])

  const setInitialValues = useCallback((initialValues: T, currentValues?: T) => {
    dispatch({ type: Kind.init, initialValues, currentValues })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: Kind.reset })
  }, [])

  const { initialValues: iValues, currentValues: cValues } = state

  const isClean: boolean = useMemo(() => {
    return isEqual(iValues, cValues)
  }, [iValues, cValues])

  return {
    initialValues: iValues,
    currentValues: cValues,
    setInitialValues,
    setValue,
    setValues,
    deleteField,
    reset,
    deleteFields,
    isClean,
    isDirty: !isClean,
  }
}
