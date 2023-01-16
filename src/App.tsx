import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/authorization/login';
import routes from './routes';
import Main from './pages/main';
import Board from './pages/board';
import WorkspaceDefault from './pages/workspace/default';
import WorkspaceDetail from './pages/workspace/detail';
import NotFound from './pages/notFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.MAIN} element={<Main />} />
        <Route path={routes.BOARD} element={<Board />} />
        <Route path={routes.WORKSPACEDEFAULT} element={<WorkspaceDefault />} />
        <Route path={routes.WORKSPACEDETAIL} element={<WorkspaceDetail />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
