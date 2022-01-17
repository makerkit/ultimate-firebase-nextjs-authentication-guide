import { useCallback, useState } from "react";

type State<Data, ErrorType> =
  | {
      data: Data;
      loading: false;
      success: true;
      error: Maybe<ErrorType>;
    }
  | {
      data: undefined;
      loading: true;
      success: false;
      error: Maybe<ErrorType>;
    }
  | {
      data: undefined;
      loading: false;
      success: false;
      error: Maybe<ErrorType>;
    };

/**
 * @name useRequestState
 */
export function useRequestState<Data = unknown, ErrorType = unknown>() {
  const [state, setState] = useState<State<Data, ErrorType>>({
    loading: false,
    success: false,
    error: undefined,
    data: undefined,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState({
      loading,
      success: false,
      data: undefined,
      error: undefined,
    });
  }, []);

  const setData = useCallback((data: Data) => {
    setState({
      data,
      success: true,
      loading: false,
      error: undefined,
    });
  }, []);

  const setError = useCallback((error: ErrorType) => {
    setState({
      data: undefined,
      loading: false,
      success: false,
      error,
    });
  }, []);

  return {
    state,
    setState,
    setLoading,
    setData,
    setError,
  };
}
