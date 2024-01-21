import { AuthUserProvider } from "@/components/kanban/AuthUserProvider";
import { ProjectsLayout } from "@/components/kanban/ProjectsLayout";
import store from "@/core/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";


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
