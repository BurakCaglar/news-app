/* Packages */
import { Route, Routes } from "react-router-dom";

/* Pages */
import { Home } from "../../pages/home";
import News from "../../pages/news/news";
import NotFound from "../../pages/NotFound/NotFound";
import NewsDetail from "../../pages/news/newsDetail/newsDetail";
import { Navbar } from "../../components/navbar/navbar";

/* Style */
import Styles from "./app.module.scss";

function App() {
  return (
    <div>
      <Layout>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:sourceName" element={<News />} />
          <Route
            path="/news/:sourceName/:sourceTitle"
            element={<NewsDetail />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

const Layout = ({ children }) => (
  <div className={Styles.mainContainer}>
    <div className={Styles.contentContainer}>{children}</div>
  </div>
);

export { App };
