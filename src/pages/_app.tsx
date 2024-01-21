import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "@c/kanban/AuthUserProvider";
import store from "@/core/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "@c/kanban/ThemeProvider";
import { ProjectsLayout } from "@c/kanban/ProjectsLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthUserProvider>
        <ThemeProvider>
          <ProjectsLayout>
            <Component {...pageProps} />
          </ProjectsLayout>
        </ThemeProvider>
      </AuthUserProvider>
    </Provider>
  );
}
