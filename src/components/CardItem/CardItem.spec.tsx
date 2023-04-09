import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import CardItem from ".";
import { store } from "../../redux/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import { Provider } from "react-redux";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));
describe("CardItem", () => {
  it("renders a heading", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <CardItem
            post={{
              id: 0,
              username: "teste",
              title: "teste 2",
              content: "ok",
              created_datetime: "2023-04-07T22:18:13.543000Z",
            }}
          />
        </Provider>
      </QueryClientProvider>
    );

    const textTitle = screen.getByText(/teste 2/i);

    expect(textTitle).toBeInTheDocument();
  });
});
