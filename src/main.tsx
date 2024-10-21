import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { theme } from "./features/styles/Theme.styled.ts";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./features/styles/Global.styled.ts";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./features/app/store.ts";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<App />
			</ThemeProvider>
		</BrowserRouter>
	</Provider>
);
