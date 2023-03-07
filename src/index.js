    //import ReactDOM from "react-dom";
    import { createRoot } from 'react-dom/client';
    import "semantic-ui-css/semantic.min.css";
    import App from "./App";

    const container = document.getElementById('root');
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<App tab="home" />);

    //ReactDOM.render(<App />, document.getElementById("root"));
    //root 來自 index.html，


