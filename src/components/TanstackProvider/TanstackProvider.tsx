import { ReactNode } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSnackbar } from "notistack";
import { ResponseError } from "../../utils/ResponseError";

function TanstackProvider({ children }: { children: ReactNode }) {
  const handleOnError = (error: Error) => {
    console.error("An error occurred:", error);
    if (error instanceof ResponseError) {
      // setErrorMessage(error.message);
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    } else {
      enqueueSnackbar("An unexpected error occurred. Please try again later.", {
        variant: "error",
      });
    }
  };

  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError: handleOnError }),
  });

  const { enqueueSnackbar } = useSnackbar();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export { TanstackProvider };
