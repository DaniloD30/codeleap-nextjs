import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import CardContent from ".";
import { store } from "../../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import { Provider } from "react-redux";
import { useRouter } from 'next/router'


// mock useRouter
jest.mock('next/router', () => ({
    useRouter() {
      return ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn()
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null)
      });
    },
  }));
describe("CardContent", () => {
  it("renders a heading", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CardContent />
        </Provider>
      </QueryClientProvider>
    );
 
    const textTitle =  screen.getByText(/what's on your mind\?/i)
   
    expect(textTitle).toBeInTheDocument()
  });
});
