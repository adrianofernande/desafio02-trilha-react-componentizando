import { Content } from './components/Content/Content';
import { SideBar } from './components/SideBar/SideBar';
import { GenreProvider } from './Hooks/useGenres';
import './styles/global.scss';

export function App() {

  return (
    <GenreProvider>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar />
      <Content />
    </div>
    </GenreProvider>
  )
}